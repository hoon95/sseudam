import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { MemoryRouter } from "react-router-dom";
import { useUserStore } from "@store/store";

const meta: Meta<typeof Header> = {
  title: "Common/Header",
  component: Header,
  decorators: [
    (Story) => {
      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  render: () => {
    useUserStore.setState({
      userLogin: false,
      profile: null,
      username: "",
      setUserData: () => {},
      setRecentSns: () => {},
    });

    return <Header />;
  },
};

export const LoggedIn: Story = {
  render: () => {
    useUserStore.setState({
      userLogin: true,
      profile: null,
      username: "test",
      setUserData: () => {},
      setRecentSns: () => {},
    });

    return <Header />;
  },
};
