import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

type ButtonMeta = Meta<typeof Button>;
type Story = StoryObj<typeof Button>;

export default {
  args: {
    children: "Button",
  },
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=579-8971&t=7L8sKMXOJLnPcPkg-0",
    },
  },
  title: "webapp/components/Button",
} satisfies ButtonMeta;

export const Defaults: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Filled: Story = { args: { fill: true } };
export const Loading: Story = { args: { loading: true } };
