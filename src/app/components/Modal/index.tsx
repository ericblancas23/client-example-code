import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Modal({ id, title, children }: ModalProps) {
  return (
    <div
      id={id}
      className={`hidden fixed inset-0 bg-[#898D9A] flex justify-center items-center z-20`}
    >
      <div className="w-1/2 bg-white h-[600px] text-black border border-[#DADBDE] rounded-3xl p-10 flex flex-col">
        <div className="flex h-10 items-center justify-center mb-6">
          <div className="grow">
            <header className="inter700 text-[24px] text-[#525766]">
              {title}
            </header>
          </div>
          <div className="flex-none w-10">
            <div
              className="js-close-modal flex bg-white items-center justify-end"
              onClick={(e) => {
                e.preventDefault();

                const elem = document.querySelector(`#${id}`);
                elem && elem.classList.toggle("hidden");
              }}
            >
              <FontAwesomeIcon
                icon={faXmark}
                size="lg"
                aria-label="Close Modal"
              />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
