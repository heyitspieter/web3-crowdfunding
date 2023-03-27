const FormElement = ({
  value,
  labelName,
  placeholder,
  inputType,
  isTextArea,
  onChangeHandler,
}) => {
  return (
    <label className="flex-1 flex w-full flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          rows={10}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
          className="py-[15px] sm:px-[25px] px-[15px] border-[1px] text-[14px] outline-none border-[#3a3a43] bg-transparent font-epilogue text-white placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        ></textarea>
      ) : (
        <input
          required
          step="0.1"
          value={value}
          type={inputType}
          placeholder={placeholder}
          onChange={onChangeHandler}
          className="py-[15px] sm:px-[25px] px-[15px] border-[1px] text-[14px] outline-none border-[#3a3a43] bg-transparent font-epilogue text-white placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormElement;
