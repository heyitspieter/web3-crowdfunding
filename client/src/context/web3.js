import { createContext, useContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { data as defaultData } from "data";

const Web3Context = createContext({
  address: "",
  contract: null,
  connectWallet: () => {},
  getCampaigns: async () => {},
  getDonations: async (pId) => {},
  getUserCampaigns: async () => {},
  donate: async (pId, amount) => {},
  createCampaign: async (campaign) => {},
});

export const useWeb3Context = () => useContext(Web3Context);

const Web3Provider = ({ children }) => {
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (campaign) => {
    try {
      const data = await createCampaign([
        address, //owner
        campaign.title,
        campaign.description,
        campaign.target,
        new Date(campaign.deadline).getTime(),
        campaign.imageUrl,
      ]);

      return data;
    } catch (error) {
      return error;
    }
  };

  const fetchCampaigns = async () => {
    try {
      const data = await contract.call("getCampaigns");

      const parsedData = data.map((campaign, index) => {
        return {
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountReceived: ethers.utils.formatEther(
            campaign.amountReceived.toString()
          ),
          imageUrl: campaign.imageUrl,
          pId: index,
        };
      });

      return [...parsedData, ...defaultData];
    } catch (error) {
      return error;
    }
  };

  const fetchUserCampaigns = async () => {
    try {
      const data = await fetchCampaigns();

      if (data.length && typeof data === "object") {
        const parsedData = data.filter(
          (campaign) => campaign.owner === address
        );

        return parsedData;
      }

      return [];
    } catch (error) {
      return error;
    }
  };

  const donate = async (pId, amount) => {
    try {
      const data = await contract.call("donateToCampaign", pId, {
        value: ethers.utils.parseEther(amount),
      });

      return data;
    } catch (error) {
      return error;
    }
  };

  const getDonations = async (pId) => {
    try {
      const donations = await contract.call("getDonators", pId);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }

      return parsedDonations;
    } catch (error) {
      return error;
    }
  };

  return (
    <Web3Context.Provider
      value={{
        address,
        contract,
        donate: donate,
        connectWallet: connect,
        getDonations: getDonations,
        getCampaigns: fetchCampaigns,
        createCampaign: publishCampaign,
        getUserCampaigns: fetchUserCampaigns,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
