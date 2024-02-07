import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "./TextArea";

type TextAreaMeta = Meta<typeof TextArea>;
type Story = StoryObj<typeof TextArea>;

const Render: TextAreaMeta["render"] = (args) => {
  const [, updateArgs] = useArgs();
  return <TextArea {...args} onChange={(value) => updateArgs({ value })} />;
};

export default {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    value: "",
  },
  component: TextArea,
  render: Render,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=707-13614&t=t5JNlqC9wWTC1zFt-0",
    },
  },
  title: "webapp/components/TextArea",
} satisfies TextAreaMeta;

export const Defaults: Story = {};

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
