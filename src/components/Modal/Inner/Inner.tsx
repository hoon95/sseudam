import { Box, Typography, Button } from "@mui/material";
import { Progress } from "./Progress";
import { useModalStore } from "@store/Store";
import { InnerStyle } from "./Inner.styled";
import testImg from "@assets/images/home/test.png";

export const Inner = () => {
  const {
    animal,
    quizStart,
    setQuizStart,
    currentQuestion,
    handleNextQuestion,
    qna,
    progress,
    finalResult,
    setFinalResult,
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
            setFinalResult(animal);
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
                onClick={() => handleNextQuestion(answer.weight)}
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
    return (
      <>
        <p>내 취향은...</p>
        <p>{finalResult}</p>
        <div>카카오톡으로 공유하기</div>
      </>
    );
  };

  return (
    <Box sx={InnerStyle}>
      {quizStart ? <Start /> : progress === 100 ? <End /> : <Qna />}
    </Box>
  );
};
