import type { Meta, StoryObj } from "@storybook/react";

import { DragAndDrop } from "./DragAndDrop";

type DragAndDropMeta = Meta<typeof DragAndDrop>;
type Story = StoryObj<typeof DragAndDrop>;

export default {
  component: DragAndDrop,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=579-9552&t=E0kWqa1g40EcWdKr-0",
    },
  },
  title: "webapp/components/DragAndDrop",
} satisfies DragAndDropMeta;

export const Defaults: Story = {};
