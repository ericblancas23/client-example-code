import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

type HeaderMeta = Meta<typeof Header>;
type Story = StoryObj<typeof Header>;

export default {
  component: Header,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=579-9552&t=E0kWqa1g40EcWdKr-0",
    },
  },
  title: "webapp/components/Header",
} satisfies HeaderMeta;

export const Defaults: Story = {};
