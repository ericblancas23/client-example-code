import { useNavigate } from "react-router-dom";
import { signOutUser } from "@syelo/client-api/src/authentication/api";
import { useCurrentUser } from "../../../hooks/useCurrentUser.ts";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu.tsx";
import { DropdownMenuOption } from "../DropdownMenu/DropdownMenuOption.tsx";

export function ProfileButton() {
  const navigate = useNavigate();
  const { authToken, logout, initials } = useCurrentUser();
  const onClickSignOut = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    signOutUser(String(authToken)) // args are guaranteed in this context but typescript doesn't know
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // process the logout regardless
        logout();
        navigate("/sign-in");
      });
  };

  const onClickProfile = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    navigate("/portal/profile");
  };

  return (
    <DropdownMenu
      dropdownMenuIcon={
        <button className="js-avatar h-10 w-10 bg-white border border-[#C3C5CA] text-[#525766] text-center cursor-pointer rounded-full uppercase ml-4">
          {initials()}
        </button>
      }
    >
      <DropdownMenuOption
        faIcon={faUser}
        message="Profile"
        destructive={false}
        onClick={onClickProfile}
      />
      <DropdownMenuOption
        faIcon={faArrowRightFromBracket}
        message={"Sign Out"}
        destructive={true}
        onClick={onClickSignOut}
      />
    </DropdownMenu>
  );
}
