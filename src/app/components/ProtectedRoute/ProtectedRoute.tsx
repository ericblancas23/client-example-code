import { useEffect, type ReactNode } from "react";
import SignIn from "../../../pages/sign-in";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { addErrorHandler } from "@syelo/client-api/src/utils";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  /** Layout content. */
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authToken, logout } = useCurrentUser();
  const navigator = useNavigate();
  useEffect(() => {
    addErrorHandler(401, () => {
      logout();
      navigator("/");
    });
  }, []);
  return authToken ? children : <SignIn />;
}
