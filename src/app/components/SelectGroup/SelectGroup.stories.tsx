import type { Meta, StoryObj } from "@storybook/react";

import { SelectGroup } from "./SelectGroup";
import type { LocationsResponse } from "@syelo/api";
import type { UseQueryResult } from "react-query";

type SelectGroupMeta = Meta<typeof SelectGroup>;
type Story = StoryObj<typeof SelectGroup>;

export default {
  args: {
    query: {
      data: {
        data: [
          {
            createdAt: 1696342157093,
            id: "477ea6a4-62d7-45cb-8b29-9123b31e7af5",
            updatedAt: 1696342157093,
            name: "San Jose",
          },
          {
            createdAt: 1696342157093,
            id: "12783d87-3d31-4367-8b25-d121a2db9661",
            updatedAt: 1696342157093,
            name: "Seattle",
          },
          {
            createdAt: 1696342157093,
            id: "fc86d345-fb4e-40e5-b4a7-695759d64d5e",
            updatedAt: 1696342157093,
            name: "Washington",
          },
        ],
        page: {
          limit: 100,
          offset: 0,
          total: 3,
        },
      },
    } as UseQueryResult<LocationsResponse>,
    label: "Label",
    modalTitle: "Modal title",
    active: true,
    toggleActive: () => {},
    selectIds: () => {},
  },
  component: SelectGroup,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/6bVjy1HAy4m6rw9lJLRLrM/HireMatic?node-id=579-12727&t=E0kWqa1g40EcWdKr-0",
    },
  },
  title: "webapp/components/SelectGroup",
} satisfies SelectGroupMeta;

export const Defaults: Story = {};
