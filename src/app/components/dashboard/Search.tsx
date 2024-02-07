import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchProps {
  value: string;
  setValue: (value: string) => void;
}

export default function Search({ value, setValue }: SearchProps) {
  return (
    <div className="mb-4 bg-white px-4 py-3 flex items-center rounded-[3.875em]">
      <FontAwesomeIcon icon={faSearch} color="#525766" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent border-none outline-none w-full ml-2 text-[#525766]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
