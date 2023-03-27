import { useState, useEffect } from "react";
import { useWeb3Context } from "context/web3";
import CampaignFeed from "components/CampaignFeed/CampaignFeed";

const Profile = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { contract, getUserCampaigns } = useWeb3Context();

  useEffect(() => {
    const onGetCampaigns = async () => {
      try {
        const allCampaigns = await getUserCampaigns();
        setCampaigns(allCampaigns);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    if (contract) {
      onGetCampaigns();
    }
  }, [getUserCampaigns, contract]);

  return (
    <CampaignFeed title="My Campaigns" data={campaigns} isLoading={isLoading} />
  );
};

export default Profile;
