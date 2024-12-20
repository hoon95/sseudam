import { Box, LinearProgress } from "@mui/material";
import { useModalProgress } from "@store/store";

export const Progress = () => {
  const progress = useModalProgress();

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};
