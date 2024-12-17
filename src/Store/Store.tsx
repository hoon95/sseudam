import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userLogin: boolean;
  profile: string | null;
  username: string | null;
  recentSns: string | null;
  setUserData: (
    userLogin: boolean,
    profile: string | null,
    username: string | null,
  ) => void;
  setRecentSns: (recentSns: string | undefined) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userLogin: false,
      profile: null,
      username: null,
      recentSns: null,
      setUserData: (userLogin, profile, username) =>
        set(() => ({
          userLogin,
          profile,
          username,
        })),
      setRecentSns: (recentSns) => set(() => ({ recentSns })),
    }),
    {
      name: "recent-sns-storage",
      partialize: (state) => ({
        recentSns: state.recentSns,
      }),
    },
  ),
);
