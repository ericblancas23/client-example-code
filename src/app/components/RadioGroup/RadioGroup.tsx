export interface RadioGroupProps<T extends string> {
  /** Label for input. */
  label: string;

  /** Callback for when value is changed. */
  onChange: (value: T | undefined) => void;

  /** Options for user to choose from. */
  options: readonly T[];

  /** Value of input. */
  value: T | undefined;
}

export function RadioGroup<T extends string>({
  label,
  onChange,
  options,
  value,
}: RadioGroupProps<T>) {
  return (
    <div className="w-full mb-6">
      <label className={`uppercase text-xs text-[#525766] inter500`}>
        {label}
      </label>
      <div className="my-2 grid grid-cols-4 gap-3 ">
        {options.map((option, key) => (
          <div
            key={key}
            className={`
              cursor-pointer
              rounded-[3.875em]
              py-3
              px-4
              flex
              items-center
              justify-center
              border-[2px]
              hover:border-[#1041ED]
              ${
                option === value
                  ? " bg-[#E7ECFD] text-[#1041ED] border-[#1041ED] "
                  : " bg-white  border-[#C3C5CA] "
              }
            `}
            onClick={() => onChange(option)}
          >
            <label
              className={`cursor-pointer text-[#525766] inter400`}
              htmlFor={label}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
