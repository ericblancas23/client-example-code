import { calculateUserInitials } from "./user-helpers.ts";
import { describe, expect, test } from "vitest";
import type { User } from "@syelo/api";

describe("calculateUserInitials", () => {
  const subject = (user: User) => calculateUserInitials(user);

  describe("when the user has just a first name", () => {
    const user = { fullName: "Josh" } as User;
    test("returns the first initial", () => {
      expect(subject(user)).toBe("J");
    });
  });

  describe("when the user has a first name and last name", () => {
    const user = { fullName: "Josh Wolfe" } as User;
    test("returns the first initial and last initial", () => {
      expect(subject(user)).toBe("JW");
    });
  });

  describe("when the user has a first name, middle name and last name", () => {
    const user = { fullName: "Josh Lee Wolfe" } as User;
    test("returns the initials less the middle initial", () => {
      expect(subject(user)).toBe("JW");
    });
  });

  describe("when the user has a first name and last name with extra spaces", () => {
    const user = { fullName: " Josh  Wolfe " } as User;
    test("returns the initials and ignores spaces", () => {
      expect(subject(user)).toBe("JW");
    });
  });

  describe("when the user has a number", () => {
    const user = { fullName: "Josh Wolfe 2" } as User;
    test("returns the initials and ignores the numbers", () => {
      expect(subject(user)).toBe("JW");
    });
  });

  describe("when the user has a jr", () => {
    const user = { fullName: "Josh Wolfe Jr." } as User;
    test("treats the jr as a name", () => {
      // this just keeps things simple for this less common edge case
      expect(subject(user)).toBe("JJ");
    });
  });
});
