import { Box, Typography, Button } from "@mui/material";
import { Progress } from "./Progress";
import { useModalStore } from "@store/Store";
import { InnerStyle } from "./Inner.styled";

export const Inner = () => {
  const {
    age,
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
        <Button
          variant="contained"
          onClick={() => {
            setQuizStart(false);
            setFinalResult(age);
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
        <Box sx={{ mt: 2 }}>
          {qna[currentQuestion]?.answers.map((answer, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleNextQuestion(answer.weight)}
              className="answerBtn"
            >
              {answer.text}
            </Button>
          ))}
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
      </>
    );
  };

  return (
    <Box sx={InnerStyle}>
      {quizStart ? <Start /> : progress === 100 ? <End /> : <Qna />}
    </Box>
  );
};
