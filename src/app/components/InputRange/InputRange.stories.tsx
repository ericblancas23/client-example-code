import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/react";

import { InputRange } from "./InputRange";

type InputRangeMeta = Meta<typeof InputRange>;
type Story = StoryObj<typeof InputRange>;

const Render: InputRangeMeta["render"] = (args) => {
  const [, updateArgs] = useArgs();
  return <InputRange {...args} onChange={(value) => updateArgs({ value })} />;
};

export default {
  args: {
    label: "Label",
    value: [0, 0],
  },
  component: InputRange,
  render: Render,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=707-13614&t=E0kWqa1g40EcWdKr-0",
    },
  },
  title: "webapp/components/InputRange",
} satisfies InputRangeMeta;

export const Defaults: Story = {};
