import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./Footer";

type FooterMeta = Meta<typeof Footer>;
type Story = StoryObj<typeof Footer>;

export default {
  args: {
    children: "Footer goes here",
  },
  component: Footer,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=579-9552&t=E0kWqa1g40EcWdKr-0",
    },
  },
  title: "webapp/components/Footer",
} satisfies FooterMeta;

export const Defaults: Story = {};
