import { useEffect } from "react";
import { Progress } from "./Progress";
import { useModalStore, useShareStore } from "@store/store";
import {
  InnerResult,
  InnerStyle,
  KakaoInner,
  Personality,
} from "./Inner.styled";
import { KakaoIcon } from "@components/Login/Login.styled";
import banner from "@assets/images/dist/banner.webp";
import { Box, Typography, Button, Avatar, LinearProgress } from "@mui/material";

export const Inner = () => {
  const {
    quizStart,
    setQuizStart,
    currentQuestion,
    handleNextQuestion,
    qna,
    progress,
    finalResult,
  } = useModalStore();

  const Start = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--gap)",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          나만의 반려동물 취향을 확인하고 주변에 공유해보세요!
        </Typography>
        <img src={banner} alt="취향 테스트 이미지" />
        <Button
          sx={{ color: "var(--light)" }}
          variant="contained"
          onClick={() => {
            setQuizStart(false);
          }}
        >
          START
        </Button>
      </Box>
    );
  };
  const Qna = () => {
    return (
      <>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {qna[currentQuestion]?.question}
        </Typography>
        <Box sx={{ mt: 2 }} className="answer">
          {qna[currentQuestion]?.answers.map(
            (answer: { text: string; weight: number }, index: number) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => {
                  handleNextQuestion(answer.weight);
                }}
                className="answerBtn"
              >
                {answer.text}
              </Button>
            ),
          )}
        </Box>
        <Progress />
      </>
    );
  };

  const End = () => {
    const { setKeyword } = useShareStore();

    const petBreed = {
      name: "",
      type: "",
      src: "",
      desc: "",
      personality: { independence: 0, loyalty: 0, sociability: 0 },
    };
    const url =
      "https://dlwqrjdqoenwacpxpjiy.supabase.co/storage/v1/object/sign/kakao-share-images";

    if (finalResult <= 3) {
      petBreed.type = "고양이";
      petBreed.src = `${url}/cat.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvY2F0LnBuZyIsImlhdCI6MTczNTgwOTU5NCwiZXhwIjoxODkzNDg5NTk0fQ.N5fSSSx9LTcjNrO7Ijae6o716Vr5Mo7A7k0QSmV6ymU&t=2025-01-02T09%3A19%3A43.547Z`;
      petBreed.desc =
        "고양이는 조용하고 독립적인 성격입니다. 낯선 환경을 주저하는 경향이 있지만, 주인의 곁에서 차분한 시간을 보내는 걸 좋아합니다.";
      petBreed.personality = {
        independence: 90,
        loyalty: 40,
        sociability: 50,
      };
    } else if (finalResult === 4) {
      petBreed.type = "포메라니안";
      petBreed.src = `${url}/pomeranian.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvcG9tZXJhbmlhbi5wbmciLCJpYXQiOjE3MzU4MDk2MjIsImV4cCI6MTg5MzQ4OTYyMn0.HNJuadoSJHJ50uwtaAZm0EBH91YSKlQBSkaF7hVFVIk&t=2025-01-02T09%3A20%3A11.708Z"`;
      petBreed.desc =
        "포메라니안은 활발하고 호기심이 많은 성격을 가지고 있습니다. 주인과의 상호작용을 즐기며 에너지가 넘칩니다.";
      petBreed.personality = {
        independence: 30,
        loyalty: 70,
        sociability: 80,
      };
    } else if (finalResult === 5) {
      petBreed.type = "말티즈";
      petBreed.src = `${url}/maltese.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvbWFsdGVzZS5wbmciLCJpYXQiOjE3MzU4MDc4OTksImV4cCI6MTc2NzM0Mzg5OX0.WkfB2b61S5Bza_7zWFQZa8142CdCRiJbRCX43MAD24E&t=2025-01-02T08%3A51%3A27.978Z`;
      petBreed.desc =
        "말티즈는 애정이 많고 붙임성이 좋은 성격입니다. 주인의 관심을 받는 것을 좋아하며 애교가 많습니다.";
      petBreed.personality = {
        independence: 40,
        loyalty: 80,
        sociability: 60,
      };
    } else if (finalResult === 6) {
      petBreed.type = "푸들";
      petBreed.src = `${url}/poodle.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvcG9vZGxlLnBuZyIsImlhdCI6MTczNTgwOTY2NywiZXhwIjoxODkzNDg5NjY3fQ.H5yq8YYayUTlfXuaWGWHb4J6sE66IGgGE7ncwe3BLbA&t=2025-01-02T09%3A20%3A56.049Z`;
      petBreed.desc =
        "푸들은 영리하고 활동적인 성격을 가지고 있습니다. 다양한 활동을 즐기며 학습 능력이 뛰어납니다.";
      petBreed.personality = {
        independence: 50,
        loyalty: 70,
        sociability: 80,
      };
    } else if (finalResult === 7) {
      petBreed.type = "비글";
      petBreed.src = `${url}/beagle.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvYmVhZ2xlLnBuZyIsImlhdCI6MTczNTgwOTcwNSwiZXhwIjoxODkzNDg5NzA1fQ.qE0GueVDeqsbvvlHR-4M_hLiKZG-ctFPty2CgS6kKHs&t=2025-01-02T09%3A21%3A34.348Z`;
      petBreed.desc =
        "비글은 에너지가 넘치고 탐험을 좋아하는 성격입니다. 주인과의 모험을 즐기며 끈기와 활력이 특징입니다.";
      petBreed.personality = {
        independence: 60,
        loyalty: 60,
        sociability: 80,
      };
    } else if (finalResult === 8) {
      petBreed.type = "골든 리트리버";
      petBreed.src = `${url}/retriever.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvcmV0cmlldmVyLnBuZyIsImlhdCI6MTczNTgwOTcxOSwiZXhwIjoxODkzNDg5NzE5fQ.iLFFh1QqSnC61eoWzxsBdt-pgO5B6ZlmQKwC9NfU3v8&t=2025-01-02T09%3A21%3A47.913Z`;
      petBreed.desc =
        "골든 리트리버는 친근하고 상냥한 성격입니다. 모든 사람과 잘 어울리며 충성심이 강합니다.";
      petBreed.personality = {
        independence: 40,
        loyalty: 90,
        sociability: 80,
      };
    }

    useEffect(() => {
      setKeyword(petBreed.type);
    }, [petBreed.type, setKeyword]);

    const KakaoShare = () => {
      // 카카오톡 공유하기
      useEffect(() => {
        if (window.Kakao) {
          const kakao = window.Kakao;
          if (!kakao.isInitialized()) {
            kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
          }

          kakao.Share.createDefaultButton({
            container: "#kakaotalk-sharing-btn",
            objectType: "feed",
            content: {
              title: `당신의 취향은? ${petBreed.type}!`,
              description: "#반려동물 #유기동물 #쓰담 #입양",
              imageUrl: petBreed.src,
              link: {
                mobileWebUrl: "https://developers.kakao.com",
                webUrl: "https://developers.kakao.com",
              },
            },
          });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [finalResult]);

      return (
        <a id="kakaotalk-sharing-btn" href="#">
          <KakaoInner>
            <KakaoIcon />
            카카오톡 공유하기
          </KakaoInner>
        </a>
      );
    };

    return (
      <InnerResult>
        <p>나와 가장 잘 맞는 반려동물은...</p>
        <Avatar
          src={petBreed.src}
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: "200px",
            maxHeight: "200px",
          }}
        />
        <p>{petBreed.type}</p>
        <p>{petBreed.desc}</p>
        <Personality>
          <li>
            <p>독립성</p>
            <LinearProgress
              variant="determinate"
              value={petBreed.personality.independence}
              className="progress"
            />
          </li>
          <li>
            <p>충성심</p>
            <LinearProgress
              variant="determinate"
              value={petBreed.personality.loyalty}
              className="progress"
            />
          </li>
          <li>
            <p>사교성</p>
            <LinearProgress
              variant="determinate"
              value={petBreed.personality.sociability}
              className="progress"
            />
          </li>
        </Personality>
        <KakaoShare />
      </InnerResult>
    );
  };

  return (
    <Box sx={InnerStyle}>
      {quizStart ? <Start /> : progress === 100 ? <End /> : <Qna />}
    </Box>
  );
};
