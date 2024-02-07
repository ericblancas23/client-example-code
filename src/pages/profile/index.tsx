import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Avatar } from "../../app/components/Avatar";
import { AnchorButton } from "../../app/components/Button/AnchorButton";
import { Button } from "../../app/components/Button/Button";
import { ButtonStyle } from "../../app/components/Button/types";
import { Input } from "../../app/components/Input/Input";
import { NavPage } from "../../app/components/NavPage/NavPage";
import { Head } from "../../app/components/Head/Head";
import { useBool } from "../../hooks/useBool";
import { isValidEmail, isValidUrl } from "../../app/helpers/format-helpers";
import { updateUser } from "@syelo/client-api/src/users";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { UserPatch } from "@syelo/api";
import type { Error } from "@syelo/api";

export default function Profile() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { authToken, currentUser, initials, setCurrentUser, isAdmin } =
    useCurrentUser();
  const {
    setFalse: stopLoading,
    setTrue: startLoading,
    value: loading,
  } = useBool(false);
  const [email, setEmail] = useState(currentUser.email);
  const [emailError, setEmailError] = useState("");
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [linkedInUrl, setLinkedInUrl] = useState(currentUser.linkedInUrl);
  const [linkedInUrlError, setLinkedInUrlError] = useState("");

  const setEmailValidator = (val: string) => {
    setEmail(val);

    if (!isValidEmail(val)) {
      setEmailError("Email is not a valid email format");
    } else {
      setEmailError("");
    }
  };
  const setLinkedInUrlValidator = (val: string) => {
    setLinkedInUrl(val);

    if (isValidUrl(val)) {
      setLinkedInUrlError("");
    } else {
      setLinkedInUrlError("LinkedIn profile is not a valid URL");
    }
  };

  const onSaveClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // TODO: it would be nice for the inputs to signal that they are not valid
    if (linkedInUrlError || emailError || !fullName || fullName.length === 0) {
      return;
    }

    startLoading();

    const controller = new AbortController();

    const user: UserPatch = {
      fullName,
      email,
      linkedInUrl,
    };

    updateUser(currentUser.id, user, {
      token: authToken,
      signal: controller.signal,
    })
      .then(() => {
        setCurrentUser(Object.assign(currentUser, user));
        navigate("/portal/dashboard");
      })
      .catch((error: Error) => {
        if (controller.signal.aborted) {
          return;
        }
        switch (error.code) {
          case "DuplicateEmail":
            setEmailError(error.message || "Email taken");
            break;
          case "Forbidden":
            setEmailError(error.message || "You can't update your email.");
            break;
          default:
            console.log(error);
        }
      })
      .finally(stopLoading);
  };

  return (
    <>
      <Head title="Profile" />
      <NavPage
        breadcrumbs={[{ label: "Profile" }]}
        footer={
          <>
            <AnchorButton to="/portal/dashboard" style={ButtonStyle.SECONDARY}>
              Back
            </AnchorButton>
            <Button loading={loading} onClick={onSaveClick}>
              Save settings
            </Button>
          </>
        }
      >
        <div className="m-auto max-w-full p-6 w-[636px]">
          <Avatar initials={initials()} />
          <Input
            className="mt-11"
            disabled={loading}
            label="Full Name"
            placeholder="Type your name"
            value={fullName}
            onChange={setFullName}
            required={true}
          />
          <Input
            action={
              <Link to="/portal/profile/change-password">
                <span
                  className={`cursor-pointer text-[#1041ED] text-xs uppercase inter600`}
                >
                  <FontAwesomeIcon className="mr-0.5" icon={faKey} size="xs" />
                  Change password
                </span>
              </Link>
            }
            className="mb-0"
            disabled={loading || !isAdmin()}
            error={emailError}
            label="Email"
            placeholder="Type your email"
            onChange={setEmailValidator}
            required={true}
            value={email}
          />
          <Input
            disabled={loading}
            error={linkedInUrlError}
            jsHandle="js-linkedin-url"
            label="LinkedIn profile"
            onChange={setLinkedInUrlValidator}
            placeholder="Type your LinkedIn profile"
            value={linkedInUrl}
            required={true}
          />
        </div>
      </NavPage>
    </>
  );
}
