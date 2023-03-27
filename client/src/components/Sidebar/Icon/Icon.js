import { isNavItem } from "utils";

const Icon = ({ styles, src, name, disabled, isActive, clickHandler }) => {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive === name ? "bg-[#2c2f32]" : ""
      } flex justify-center items-center ${
        !disabled ? "cursor-pointer" : " "
      } ${styles}`}
      onClick={clickHandler}
    >
      {!isActive ? (
        <img src={src} alt="logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={src}
          alt="logo"
          className={`w-1/2 h-1/2 ${
            !isNavItem({ name }, isActive) ? "grayscale" : ""
          }`}
        />
      )}
    </div>
  );
};

export default Icon;
