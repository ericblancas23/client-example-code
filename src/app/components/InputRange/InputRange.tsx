import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface InputRangeProps {
  /** Label for input range. */
  label: string;

  /** Callback for when range changes. Argument is array containing minimum value followed by maximum value). */
  onChange: (range: [number | undefined, number | undefined]) => void;

  /** Value range for input (array containing minimum value followed by maximum value). */
  value: [number | undefined, number | undefined];
}

function format(num: number | undefined) {
  return num?.toLocaleString() || "";
}

function parse(str: string) {
  return parseInt(str.replace(",", "")) || undefined;
}

export function InputRange({ label, onChange, value }: InputRangeProps) {
  return (
    <div className="w-full mb-6">
      <label className={`uppercase text-xs text-[#525766] inter500 `}>
        {label}
      </label>
      <div className="my-2 flex">
        <input
          className={`
            text-center
            bg-white
            border-[#C3C5CA]
            border-[1px]
            px-4
            py-3
            shadow-sm
            focus:ring-[#1041ED]
              focus:bg-[#E7ECFD]
            block
            w-full
            rounded-[3.875em]
            text-[#525766]
          `}
          type="text"
          name={label}
          id={label}
          placeholder={"From"}
          value={format(value[0])}
          onChange={(e) => onChange([parse(e.target.value), value[1]])}
        />

        <FontAwesomeIcon
          icon={faMinus}
          color="#525766"
          className="mx-4 my-auto"
        />

        <input
          className={`
            text-center
            bg-white
            border-[#C3C5CA]
            border-[1px]
            px-4
            py-3
            shadow-sm
            focus:ring-[#1041ED]
              focus:bg-[#E7ECFD]
            block
            w-full
            rounded-[3.875em]
            text-[#525766]
          `}
          type="text"
          name={label}
          id={label}
          placeholder={"To"}
          value={format(value[1])}
          onChange={(e) => onChange([value[0], parse(e.target.value)])}
        />
      </div>
    </div>
  );
}
