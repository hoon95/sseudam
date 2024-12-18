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

interface QnA {
  question: string;
  answers: { text: string; weight: number }[];
}

interface ModalState {
  open: boolean;
  currentQuestion: number;
  progress: number;
  quizStart: boolean;
  setQuizStart: (start: boolean) => void;
  age: number;
  setAge: (age: number) => void;
  setFinalResult: (result: number) => void;
  qna: QnA[];
  setOpen: (open: boolean) => void;
  handleNextQuestion: (selectedWeight: number) => void;
  finalResult: number;
  resetModal: () => void;
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

export const useModalProgress = () => useModalStore((state) => state.progress);

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  currentQuestion: 0,
  progress: 0,
  quizStart: true,
  setQuizStart: (start) => set({ quizStart: start }),
  age: 0,
  setAge: (age) => set({ age }),
  setFinalResult: (result) => set({ finalResult: result }),
  qna: [
    {
      question: "하루에 얼마나 걷나요?",
      answers: [
        { text: "10분 미만", weight: 2 },
        { text: "10분 이상 ~ 30분 미만", weight: 0 },
        { text: "30분 이상 ~ 1시간 미만", weight: -2 },
        { text: "1시간 이상", weight: -4 },
      ],
    },
    {
      question: "일주일에 얼마나 숨차는 운동을 하나요?",
      answers: [
        { text: "0회", weight: 3 },
        { text: "주 1 ~ 2회", weight: 1 },
        { text: "주 3 ~ 4회", weight: -2 },
        { text: "주 5회 이상", weight: -3 },
      ],
    },
    {
      question: "하루에 얼마나 많은 물을 마시나요?",
      answers: [
        { text: "500ml 미만", weight: 3 },
        { text: "500ml ~ 1L", weight: 0 },
        { text: "1L ~ 2L", weight: -2 },
        { text: "2L 이상", weight: -4 },
      ],
    },
  ],
  setOpen: (open) => set({ open }),
  handleNextQuestion: (weight) =>
    set((state) => {
      const initialResult = state.age;
      const updatedResult = initialResult + weight;
      const clampedResult = Math.max(
        initialResult - 10,
        Math.min(updatedResult, initialResult + 10),
      );

      return {
        currentQuestion: (state.currentQuestion + 1) % state.qna.length,
        progress: state.progress + 100 / state.qna.length,
        finalResult: clampedResult,
      };
    }),
  finalResult: 0,
  quizComplete: false,
  resetModal: () =>
    set({
      currentQuestion: 0,
      progress: 0,
      open: false,
      quizStart: true,
      age: 0,
      finalResult: 0,
    }),
}));
