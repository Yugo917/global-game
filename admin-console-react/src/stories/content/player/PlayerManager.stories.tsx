import { Meta, StoryObj } from "@storybook/react";
import { PlayerManager } from "../../../app/application/content/players/PlayerManager";

const meta = {
  title: "App/Content/PlayerManager",
  component: PlayerManager,
  tags: [],
  argTypes: {
  }
} satisfies Meta<typeof PlayerManager>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <PlayerManager />
};
