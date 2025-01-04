import { useEffect } from "react";
import { Progress } from "./Progress";
import { useModalStore, useShareStore } from "@store/store";
import { InnerResult, InnerStyle, KakaoInner } from "./Inner.styled";
import { KakaoIcon } from "@components/Login/Login.styled";
import testImg from "@assets/images/home/test.png";
import { Box, Typography, Button, Avatar } from "@mui/material";

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
          나에게 맞는 반려동물을 AI가 추천해줄게요!
        </Typography>
        <img src={testImg} alt="취향 테스트 이미지" />
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
    const petBreed = { name: "", type: "", src: "" };

    if (finalResult <= 3) {
      petBreed.type = "고양이";
      petBreed.src =
        "https://dlwqrjdqoenwacpxpjiy.supabase.co/storage/v1/object/sign/kakao-share-images/cat.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvY2F0LnBuZyIsImlhdCI6MTczNTgwOTU5NCwiZXhwIjoxODkzNDg5NTk0fQ.N5fSSSx9LTcjNrO7Ijae6o716Vr5Mo7A7k0QSmV6ymU&t=2025-01-02T09%3A19%3A43.547Z";
    } else if (finalResult === 4) {
      petBreed.type = "포메라니안";
      petBreed.src =
        "https://dlwqrjdqoenwacpxpjiy.supabase.co/storage/v1/object/sign/kakao-share-images/pomeranian.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvcG9tZXJhbmlhbi5wbmciLCJpYXQiOjE3MzU4MDk2MjIsImV4cCI6MTg5MzQ4OTYyMn0.HNJuadoSJHJ50uwtaAZm0EBH91YSKlQBSkaF7hVFVIk&t=2025-01-02T09%3A20%3A11.708Z";
    } else if (finalResult === 5) {
      petBreed.type = "말티즈";
      petBreed.src =
        "https://dlwqrjdqoenwacpxpjiy.supabase.co/storage/v1/object/sign/kakao-share-images/maltese.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvbWFsdGVzZS5wbmciLCJpYXQiOjE3MzU4MDc4OTksImV4cCI6MTc2NzM0Mzg5OX0.WkfB2b61S5Bza_7zWFQZa8142CdCRiJbRCX43MAD24E&t=2025-01-02T08%3A51%3A27.978Z";
    } else if (finalResult === 6) {
      petBreed.type = "푸들";
      petBreed.src =
        "https://dlwqrjdqoenwacpxpjiy.supabase.co/storage/v1/object/sign/kakao-share-images/poodle.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvcG9vZGxlLnBuZyIsImlhdCI6MTczNTgwOTY2NywiZXhwIjoxODkzNDg5NjY3fQ.H5yq8YYayUTlfXuaWGWHb4J6sE66IGgGE7ncwe3BLbA&t=2025-01-02T09%3A20%3A56.049Z";
    } else if (finalResult === 7) {
      petBreed.type = "비글";
      petBreed.src =
        "https://dlwqrjdqoenwacpxpjiy.supabase.co/storage/v1/object/sign/kakao-share-images/beagle.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvYmVhZ2xlLnBuZyIsImlhdCI6MTczNTgwOTcwNSwiZXhwIjoxODkzNDg5NzA1fQ.qE0GueVDeqsbvvlHR-4M_hLiKZG-ctFPty2CgS6kKHs&t=2025-01-02T09%3A21%3A34.348Z";
    } else if (finalResult === 8) {
      petBreed.type = "골든 리트리버";
      petBreed.src =
        "https://dlwqrjdqoenwacpxpjiy.supabase.co/storage/v1/object/sign/kakao-share-images/retriever.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrYWthby1zaGFyZS1pbWFnZXMvcmV0cmlldmVyLnBuZyIsImlhdCI6MTczNTgwOTcxOSwiZXhwIjoxODkzNDg5NzE5fQ.iLFFh1QqSnC61eoWzxsBdt-pgO5B6ZlmQKwC9NfU3v8&t=2025-01-02T09%3A21%3A47.913Z";
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

          console.log(petBreed.src);

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
      }, []);

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
