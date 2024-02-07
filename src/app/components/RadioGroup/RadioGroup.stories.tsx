import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroup } from "./RadioGroup";

type RadioGroupMeta = Meta<typeof RadioGroup>;
type Story = StoryObj<typeof RadioGroup>;

const Render: RadioGroupMeta["render"] = (args) => {
  const [, updateArgs] = useArgs();
  return <RadioGroup {...args} onChange={(value) => updateArgs({ value })} />;
};

export default {
  args: {
    label: "Label",
    options: ["Option 1", "Option 2"],
    value: "",
  },
  component: RadioGroup,
  render: Render,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=707-13443&t=t5JNlqC9wWTC1zFt-0",
    },
  },
  title: "webapp/components/RadioGroup",
} satisfies RadioGroupMeta;

export const Defaults: Story = {};
