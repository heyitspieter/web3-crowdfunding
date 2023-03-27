import { ethers } from "ethers";
import { useState } from "react";
import { checkImageUrl } from "utils";
import Button from "components/UI/Button";
import Loader from "components/UI/Loader";
import { useWeb3Context } from "context/web3";
import { useNavigate } from "react-router-dom";
import FormElement from "components/UI/Form/FormElement";
import FormBanner from "components/FormBanner/FormBanner";

const NewCampaign = () => {
  const navigate = useNavigate();

  const web3 = useWeb3Context;

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    imageUrl: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const elChangeHandler = (e, key) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    checkImageUrl(form.imageUrl, async (isUrl) => {
      if (isUrl) {
        setIsLoading(true);

        await web3.createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });

        setIsLoading(false);
        navigate("/");
      } else {
        alert("Image needs to be a valid url");
        setIsLoading(false);
        setForm({ ...form, imageUrl: "" });
      }
    });
  };

  return (
    <div className="bg-[#1c1c23] flex flex-col justify-center items-center rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex items-center justify-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-bold font-epilogue sm:tex-[25px] text-[18px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={submitFormHandler}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormElement
            inputType="text"
            value={form.name}
            placeholder="John Doe"
            labelName="Your Name *"
            onChangeHandler={(e) => elChangeHandler(e, "name")}
          />
          <FormElement
            inputType="text"
            value={form.title}
            labelName="Campaign Title *"
            placeholder="Give your Campaign a title"
            onChangeHandler={(e) => elChangeHandler(e, "title")}
          />
        </div>
        <FormElement
          isTextArea
          labelName="Story *"
          value={form.description}
          placeholder="Write your story"
          onChangeHandler={(e) => elChangeHandler(e, "description")}
        />
        <FormBanner />
        <div className="flex flex-wrap gap-[40px]">
          <FormElement
            inputType="number"
            value={form.target}
            placeholder="Eth 0.50"
            labelName="Amount to Raise *"
            onChangeHandler={(e) => elChangeHandler(e, "target")}
          />
          <FormElement
            inputType="date"
            value={form.deadline}
            labelName="End Date *"
            placeholder="End Date"
            onChangeHandler={(e) => elChangeHandler(e, "deadline")}
          />
          <FormElement
            inputType="url"
            value={form.image}
            labelName="Campaign Image *"
            placeholder="Choose an image for you campaign"
            onChangeHandler={(e) => elChangeHandler(e, "imageUrl")}
          />
        </div>
        <div className="flex justify-start items-center mt-[10px]">
          <Button
            btnType="submit"
            title="Submit new Campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default NewCampaign;
