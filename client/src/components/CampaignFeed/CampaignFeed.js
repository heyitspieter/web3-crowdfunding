import { loader } from "assets";
import { useNavigate } from "react-router-dom";
import FundCard from "components/FundCard/FundCard";

const CampaignFeed = ({ isLoading, title, data }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({data.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && data.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            No campaigns available to display
          </p>
        )}

        {!isLoading &&
          data.length > 0 &&
          data.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              clickHandler={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default CampaignFeed;
