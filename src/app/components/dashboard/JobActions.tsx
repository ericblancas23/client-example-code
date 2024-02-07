import { DropdownMenu } from "../DropdownMenu/DropdownMenu.tsx";
import { DropdownMenuIcon } from "../DropdownMenu/DropdownMenuIcon.tsx";
import {
  faEllipsisVertical,
  faNoteSticky,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { DropdownMenuOption } from "../DropdownMenu/DropdownMenuOption.tsx";
import { Modal } from "../Modal";
import type { Id } from "@syelo/api";
import { deleteJob } from "@syelo/client-api";
import { useCurrentUser } from "../../../hooks/useCurrentUser.ts";

interface JobActionsProps {
  id: Id;
  modalTitle: string;
  notes: string;
  afterClick: () => void;
}
export function JobActions({
  id,
  modalTitle,
  notes,
  afterClick,
}: JobActionsProps) {
  const { authToken } = useCurrentUser();

  const onClickRemoveJob = async (
    e: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    e.preventDefault();

    await deleteJob(id, { token: authToken }).then(afterClick);
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
          message={"View Notes"}
          destructive={false}
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            void onClickViewNotes(e, id)
          }
        />
        <DropdownMenuOption
          faIcon={faTrash}
          message={"Remove Job"}
          destructive={true}
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            void onClickRemoveJob(e, id)
          }
        />
      </DropdownMenu>

      <Modal id={`js-notes-modal-${id}`} title={modalTitle}>
        <div className="flex flex-grow flex-auto rounded-3xl border py-4 px-6">
          <p className="inter400 text-[#64656F]">
            {notes ? notes : "There are no notes for this Job."}
          </p>
        </div>
      </Modal>
    </>
  );
}
