export const InnerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "25vw",
  p: 4,
  borderRadius: "var(--gap)",
  boxShadow: "5px 5px 3px #666",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  img: {
    width: "100%",
    objectFit: "cover",
  },

  "& .answer": {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "calc(var(--gap) * 0.5)",
  },

  "& .answerBtn": {
    width: "45%",
    marginBottom: "0.5rem",
  },
};
