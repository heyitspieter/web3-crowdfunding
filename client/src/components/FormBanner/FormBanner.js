import { money } from "assets";

const FormBanner = () => {
  return (
    <div className="w-full flex items-center justify-start p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
      <img
        src={money}
        alt="money"
        className="w-[40px] h-[40px] object-contain"
      />
      <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
        You will get 100% of the raised amount
      </h4>
    </div>
  );
};

export default FormBanner;
