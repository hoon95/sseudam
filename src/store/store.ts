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
  animal: number;
  setAnimal: (animal: number) => void;
  setFinalResult: (result: string) => void;
  qna: QnA[];
  setOpen: (open: boolean) => void;
  handleNextQuestion: (selectedWeight: number) => void;
  finalResult: string;
  resetModal: () => void;
}

interface PaginationState {
  page: number;
  setPage: (page: number) => void;
}

interface FilterState {
  type: string;
  setType: (type: string) => void;
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
  animal: 0,
  setAnimal: (animal) => set({ animal }),
  setFinalResult: (result) => set({ finalResult: result }),
  qna: [
    {
      question: "나는 활동적이다",
      answers: [
        { text: "YES", weight: 1 },
        { text: "NO", weight: 0 },
      ],
    },
    {
      question: "2번 질문을 뭐라고할까요?",
      answers: [
        { text: "YES", weight: 1 },
        { text: "NO", weight: 0 },
      ],
    },
  ],
  setOpen: (open) => set({ open }),
  handleNextQuestion: (weight) =>
    set((state) => {
      const initialResult = state.animal;
      const updatedResult = initialResult + weight;

      return {
        currentQuestion: (state.currentQuestion + 1) % state.qna.length,
        progress: state.progress + 100 / state.qna.length,
        finalResult: updatedResult === 1 ? "강아지" : "고양이", // issue : 테스트 로직
      };
    }),
  finalResult: "",
  quizComplete: false,
  resetModal: () =>
    set({
      currentQuestion: 0,
      progress: 0,
      open: false,
      quizStart: true,
      animal: 0,
      finalResult: "",
    }),
}));

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
}));

export const useFilterStore = create<FilterState>((set) => ({
  type: "dog",
  setType: (type) => set({ type }),
}));
