import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/react";

import { PasswordInput } from "./PasswordInput";

type PasswordInputMeta = Meta<typeof PasswordInput>;
type Story = StoryObj<typeof PasswordInput>;

const Render: PasswordInputMeta["render"] = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <PasswordInput {...args} onChange={(value) => updateArgs({ value })} />
  );
};

export default {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    value: "",
  },
  component: PasswordInput,
  render: Render,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=617-18781&t=E0kWqa1g40EcWdKr-0",
    },
  },
  title: "webapp/components/PasswordInput",
} satisfies PasswordInputMeta;

export const Defaults: Story = {};

export const WithoutResetLink: Story = {
  args: {
    allowToReset: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const LengthInvalid: Story = {
  args: {
    error: "Invalid",
    lengthError: true,
    passwordHintVisible: true,
    value: "A1!",
  },
};

export const NumberMissing: Story = {
  args: {
    error: "Invalid",
    numberError: true,
    passwordHintVisible: true,
    value: "Password!",
  },
};

export const UppercaseMissing: Story = {
  args: {
    error: "Invalid",
    passwordHintVisible: true,
    uppercaseError: true,
    value: "password1!",
  },
};

export const SpecialCharacterMissing: Story = {
  args: {
    error: "Invalid",
    passwordHintVisible: true,
    specialCharacterError: true,
    value: "Password1",
  },
};
