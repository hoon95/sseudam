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
  setFinalResult: (result: number) => void;
  qna: QnA[];
  setOpen: (open: boolean) => void;
  handleNextQuestion: (selectedWeight: number) => void;
  finalResult: number;
  resetModal: () => void;
}

interface PaginationState {
  page: number;
  setPage: (page: number) => void;
}

interface FilterState {
  type: string;
  setType: (type: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  age: number[];
  setAge: (age: number[]) => void;
  weight: number[];
  setWeight: (weigth: number[]) => void;
}

interface locationState {
  region: string[];
  setRegion: (region: string[]) => void;
  city: string[];
  setCity: (city: string[]) => void;
  selectedRegion?: string;
  setSelectedRegion: (selectedRegion?: string) => void;
  selectedCity?: string;
  setSelectedCity: (selectedCity?: string) => void;
}

interface shareState {
  keyword: string;
  setKeyword: (shorts: string) => void;
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
      question: `1. 주말에 특별한 계획이 없습니다. 당신은 어떻게 시간을 보내고 싶나요?`,
      answers: [
        {
          text: `아침 일찍 일어나 산책이나 운동을 하며 시간을 보낼 것 같아요. 활기차게 하루를 시작하는게 좋아요!`,
          weight: 1,
        },
        {
          text: `늦잠을 자고 집에서 책을 읽거나 영화를 보면서 조용히 보내는 게 좋아요!`,
          weight: 0,
        },
      ],
    },
    {
      question: `2. 당신의 친구가 말하길, '너는 참 활동적인 사람같아!' 라고 했습니다. 이에 대해 어떻게 반응하시겠어요?`,
      answers: [
        {
          text: `맞아요! 저는 항상 새로운 활동이나 운동을 즐기는 편이에요. \n 가만히 있는 걸 싫어해요.`,
          weight: 1,
        },
        {
          text: `음... 꼭 그렇진 않아요. 저는 차분한 걸 더 좋아하거든요. \n 활동적인 건 제 스타일이 아니에요.`,
          weight: 0,
        },
      ],
    },
    {
      question: `3. 반려동물을 키우게 되었어요. 털 관리와 청소가 필요하다는 말을 들었을 때 당신의 첫 반응은?`,
      answers: [
        {
          text: `아무 문제 없어요! 반려동물도 가족이니까 신경 쓰는 게 당연하죠.`,
          weight: 1,
        },
        {
          text: `음... 털 관리가 너무 자주 필요한 건 좀 부담스러울 것 같아요.`,
          weight: 0,
        },
      ],
    },
    {
      question: `4. 강아지를 키우려면 매일 산책이 필요하다고 해요. 당신은 매일 산책할 자신이 있나요?`,
      answers: [
        {
          text: `물론이죠! 저는 산책하는 걸 좋아하고 강아지랑 함께 걷는 건 정말 즐거울 것 같아요.`,
          weight: 1,
        },
        {
          text: `매일은 좀 어려울 것 같아요. 제 일정이 꽤 바쁘거든요.`,
          weight: 0,
        },
      ],
    },
    {
      question: `5. 반려동물과의 유대감을 형성하는 데 있어, 당신은 어떤 방식이 더 좋다고 생각하나요?`,
      answers: [
        {
          text: `항상 함께 놀고 시간을 보내면서 강한 유대감을 만들고 싶어요.`,
          weight: 1,
        },
        {
          text: `적당한 거리감을 유지하며 조용히 동행하는 관계도 괜찮을 것 같아요.`,
          weight: 0,
        },
      ],
    },
    {
      question: `6. 당신이 살고 있는 집은 어떤 환경인가요?`,
      answers: [
        {
          text: `넓은 마당이 있는 집이에요. 또는 반려동물이 뛰어놀 수 있는 공간이 충분해요.`,
          weight: 1,
        },
        {
          text: `아파트나 작은 공간이에요. 넓은 마당은 없지만, 실내에서 함께 시간을 보낼 수 있어요.`,
          weight: 0,
        },
      ],
    },
    {
      question: `7. 강아지나 고양이가 짖거나 야옹거리는 소리를 자주 낼 때, 당신은 어떻게 느낄 것 같나요?`,
      answers: [
        {
          text: `괜찮아요! 반려동물이 감정을 표현하는 방식이니까요.`,
          weight: 1,
        },
        {
          text: `좀 조용했으면 좋겠어요. 소음에는 민감한 편이거든요.`,
          weight: 0,
        },
      ],
    },
    {
      question: `8. 반려동물이 독립적으로 지낼 수 있으면 좋을까요, 아니면 항상 주인 곁에 있기를 원하시나요?`,
      answers: [
        {
          text: `항상 곁에 있어주고 제 곁을 떠나지 않으면 좋겠어요. 함께 있는 게 중요해요.`,
          weight: 1,
        },
        {
          text: `독립적으로 지낼 수 있다면 더 좋을 것 같아요. 제가 없을 때도 잘 지냈으면 해요.`,
          weight: 0,
        },
      ],
    },
  ],
  setOpen: (open) => set({ open }),
  handleNextQuestion: (weight) =>
    set((state) => {
      state.animal += weight;

      return {
        currentQuestion: (state.currentQuestion + 1) % state.qna.length,
        progress: state.progress + 100 / state.qna.length,
        finalResult: state.animal,
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
      animal: 0,
      finalResult: 0,
    }),
}));

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
}));

export const useFilterStore = create<FilterState>((set) => ({
  type: "dog",
  setType: (type) => set({ type }),
  gender: "all",
  setGender: (gender) => set({ gender }),
  age: [0, 10],
  setAge: (ageRange) => set({ age: ageRange }),
  weight: [0, 30],
  setWeight: (weightRange) => set({ weight: weightRange }),
}));

export const useLocationStore = create<locationState>((set) => ({
  region: [],
  setRegion: (regionList) => set({ region: regionList }),
  city: [],
  setCity: (cityList) => set({ city: cityList }),
  selectedRegion: "",
  setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
  selectedCity: "",
  setSelectedCity: (selectedCity) => set({ selectedCity }),
}));

export const useShareStore = create<shareState>((set) => ({
  keyword: "강아지",
  setKeyword: (type) => set({ keyword: type }),
}));
