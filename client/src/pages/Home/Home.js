import { useState, useEffect } from "react";
import { useWeb3Context } from "context/web3";
import CampaignFeed from "components/CampaignFeed/CampaignFeed";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { contract, getCampaigns } = useWeb3Context();

  useEffect(() => {
    const onGetCampaigns = async () => {
      try {
        const allCampaigns = await getCampaigns();
        setCampaigns(allCampaigns);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    if (contract) {
      onGetCampaigns();
    }
  }, [getCampaigns, contract]);

  return (
    <CampaignFeed
      data={campaigns}
      isLoading={isLoading}
      title="All Campaigns"
    />
  );
};

export default Home;
