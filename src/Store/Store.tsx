import { create } from "zustand";

interface UserState {
  user: string | null;
  profile: string | null;
  username: string | null;
  recent: string | null;
  setUserData: (
    user: string | null,
    profile: string | null,
    username: string | null,
    recent: string | null,
  ) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  username: null,
  recent: null,
  setUserData: (user, profile, username, recent) =>
    set(() => ({
      user,
      profile,
      username,
      recent,
    })),
}));
