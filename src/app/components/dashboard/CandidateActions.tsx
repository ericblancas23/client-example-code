import {
  faEllipsisVertical,
  faDownload,
  faNoteSticky,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import type { Id } from "@syelo/api";
import { deleteCandidate } from "@syelo/client-api";
import axios from "axios";
import fileDownload from "js-file-download";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu.tsx";
import { DropdownMenuIcon } from "../DropdownMenu/DropdownMenuIcon.tsx";
import { DropdownMenuOption } from "../DropdownMenu/DropdownMenuOption.tsx";
import { Modal } from "../Modal";
import { useCurrentUser } from "../../../hooks/useCurrentUser.ts";

interface CandidateActionsProps {
  id: Id;
  modalTitle: string;
  notes: string;
  resumeId?: Id;
  afterClick: () => void;
}
export function CandidateActions({
  id,
  modalTitle,
  notes,
  resumeId,
  afterClick,
}: CandidateActionsProps) {
  const { authToken, isAdmin } = useCurrentUser();

  const onClickRemoveCandidate = async (
    e: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    e.preventDefault();

    await deleteCandidate(id, { token: authToken }).then(afterClick);
  };

  const onClickViewNotes = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();

    const elem = document.querySelector(`#js-notes-modal-${id}`);
    elem && elem.classList.toggle("hidden");
  };

  return (
    <>
      <DropdownMenu
        dropdownMenuIcon={
          <DropdownMenuIcon faIcon={faEllipsisVertical} size={"small"} />
        }
      >
        <DropdownMenuOption
          faIcon={faNoteSticky}
          message={"View Recommendations"}
          destructive={false}
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            void onClickViewNotes(e, id)
          }
        />
        {resumeId && (
          <DropdownMenuOption
            faIcon={faDownload}
            message={"Download Resume"}
            destructive={false}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();

              const baseUrl = String(import.meta.env.VITE_SERVER_BASE_URL);
              axios
                .get(`${baseUrl}/v1/resumes/${resumeId}/download`, {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                  responseType: "blob",
                })
                .then((resp) => {
                  const disp: string =
                    (resp.headers["content-disposition"] as
                      | string
                      | undefined) || "";
                  const filename = disp
                    .replace('attachment; filename="', "")
                    .replace('"', "");
                  fileDownload(resp.data as Blob, filename);
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          />
        )}
        {isAdmin() && (
          <DropdownMenuOption
            faIcon={faTrash}
            message={"Remove Candidate"}
            destructive={true}
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              void onClickRemoveCandidate(e, id)
            }
          />
        )}
      </DropdownMenu>

      <Modal id={`js-notes-modal-${id}`} title={modalTitle}>
        <div className="flex flex-grow flex-auto rounded-3xl border py-4 px-6">
          <p className="inter400 text-[#64656F]">
            {notes
              ? notes
              : "There are no current recommendations for this Candidate."}
          </p>
        </div>
      </Modal>
    </>
  );
}
