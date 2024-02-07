import type { User } from "@syelo/api";

export const calculateUserInitials = (user: User) => {
  const splitName = user.fullName
    .replace(/[^a-zA-Z ]+/g, "")
    .trim()
    .split(" ");

  if (splitName.length === 1) {
    return splitName[0][0];
  }

  const allInitials = splitName.reduce((previousValue, currentValue) => {
    return (previousValue || "") + currentValue[0];
  });

  return allInitials[0] + allInitials[allInitials.length - 1];
};
