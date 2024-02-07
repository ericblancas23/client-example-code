import type { Meta, StoryObj } from "@storybook/react";

import { AnchorButton } from "./AnchorButton";

type AnchorButtonMeta = Meta<typeof AnchorButton>;
type Story = StoryObj<typeof AnchorButton>;

export default {
  args: {
    children: "Button",
    to: "#",
  },
  component: AnchorButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=579-8971&t=7L8sKMXOJLnPcPkg-0",
    },
  },
  title: "webapp/components/AnchorButton",
} satisfies AnchorButtonMeta;

export const Defaults: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Filled: Story = { args: { fill: true } };
export const Loading: Story = { args: { loading: true } };
