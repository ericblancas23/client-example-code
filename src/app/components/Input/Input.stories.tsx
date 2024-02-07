import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

type InputMeta = Meta<typeof Input>;
type Story = StoryObj<typeof Input>;

const Render: InputMeta["render"] = (args) => {
  const [, updateArgs] = useArgs();
  return <Input {...args} onChange={(value) => updateArgs({ value })} />;
};

export default {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    value: "",
  },
  component: Input,
  render: Render,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=579-12727&t=E0kWqa1g40EcWdKr-0",
    },
  },
  title: "webapp/components/Input",
} satisfies InputMeta;

export const Defaults: Story = {};

export const Action: Story = {
  args: {
    action: (
      <a
        className={`cursor-pointer text-[#1041ED] text-xs uppercase`}
        href={window.location.href}
      >
        Click Me!
      </a>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Erred: Story = {
  args: {
    error: "Invalid",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};
