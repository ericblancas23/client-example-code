import {
  faCheck,
  faCloudArrowUp,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { DOMAttributes, InputHTMLAttributes } from "react";
import { useCallback, useRef, useState } from "react";

import type { ButtonProps } from "../Button/Button";
import { Button } from "../Button/Button";
import { ButtonStyle } from "../Button/types";

interface DragAndDropProps {
  deleting?: boolean;
  label: string;
  loading?: boolean;
  placeholder: string;
  value: File | null;
  setValue: (file: File | null) => void;
}

type RequiredDivAttrs = Required<DOMAttributes<HTMLDivElement>>;

export function DragAndDrop({
  deleting = false,
  label,
  loading = false,
  placeholder,
  value,
  setValue,
}: DragAndDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback<RequiredDivAttrs["onDragEnter"]>((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback<RequiredDivAttrs["onDragLeave"]>((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback<RequiredDivAttrs["onDragOver"]>((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback<RequiredDivAttrs["onDrop"]>(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      setValue(file);
    },
    [setValue]
  );

  const handleInputChange = useCallback<
    Required<InputHTMLAttributes<HTMLInputElement>>["onChange"]
  >(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue(file);
      }
    },
    [setValue]
  );

  const handleDivClick = useCallback<RequiredDivAttrs["onClick"]>((e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const onDiscardClick = useCallback<Required<ButtonProps>["onClick"]>(
    (e) => {
      e.stopPropagation();
      setValue(null);
    },
    [setValue]
  );

  const bgClass = isDragging ? "bg-gray-100" : "bg-white";
  const borderClass = value ? "border-0" : "border-2";

  return (
    <div className="pb-5">
      <label className={`flex text-[#525766] text-xs uppercase pb-2 inter500`}>
        {label}
      </label>

      {loading && (
        <div>
          <div
            className={`
              border-dashed ${borderClass} border-[#1041ED] rounded-3xl
              px-4 py-10 text-center ${bgClass}
            `}
          >
            <div className="text-gray-400 mb-2 w-full flex space-between items-center">
              <div className="w-full flex-1 flex justify-start items-center">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="text-xl mr-2"
                  spin
                />
                {value?.name}
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        style={{ display: loading ? "none" : "block" }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          className={`border-dashed ${borderClass} border-[#1041ED] rounded-3xl
          px-4 py-10 text-center ${bgClass}`}
          onClick={handleDivClick}
          role={"button"}
        >
          {value ? (
            <div className="text-gray-400 mb-2 w-full flex space-between items-center">
              <div className="w-full flex-1 flex justify-start items-center">
                <FontAwesomeIcon icon={faCheck} className="text-xl mr-2" />
                {value.name}
              </div>
              <Button
                loading={deleting}
                style={ButtonStyle.TERTIARY}
                onClick={onDiscardClick}
              >
                Discard
              </Button>
            </div>
          ) : (
            <div className="text-gray-400">
              <FontAwesomeIcon icon={faCloudArrowUp} className="text-xl mr-2" />
              {placeholder}
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
