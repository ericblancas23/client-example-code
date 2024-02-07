import type { User } from "@syelo/api";
import { useCallback, useState } from "react";
import { calculateUserInitials } from "../app/helpers/user-helpers.ts";

export const useCurrentUser = () => {
  // Use the session storage to populate initial state for page refresh
  const getSessionAuthToken = (): string | undefined =>
    sessionStorage.getItem("authToken") || undefined;
  const getSessionCurrentUser = (): User => {
    const currentUserString = sessionStorage.getItem("currentUser");

    return (currentUserString ? JSON.parse(currentUserString) : {}) as User;
  };

  const [user, setUser] = useState(getSessionCurrentUser());
  const [token, setToken] = useState(getSessionAuthToken());

  const setAuthToken = useCallback(
    (authToken: string) => {
      sessionStorage.setItem("authToken", authToken);
      setToken(authToken);
    },
    [token, user]
  );

  const setCurrentUser = useCallback(
    (currentUser: User) => {
      sessionStorage.setItem(
        "currentUser",
        currentUser ? JSON.stringify(currentUser) : ""
      );
      setUser(user);
    },
    [user]
  );

  const logout = () => {
    setAuthToken("");
    setCurrentUser({} as User);
  };
  const login = (token: string, user: User) => {
    setAuthToken(token);
    setCurrentUser(user);
  };

  const initials = (): string => (user ? calculateUserInitials(user) : "");

  return {
    authToken: token,
    setAuthToken: setAuthToken,
    currentUser: user,
    setCurrentUser: setCurrentUser,
    logout: logout,
    login: login,
    isAdmin: () => user.admin,
    initials: initials,
  };
};
