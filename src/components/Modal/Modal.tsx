import { Modal, Button, Box, Typography } from "@mui/material";
import { Inner } from "./Inner/Inner";
import { InnerStyle } from "./Inner/Inner.styled";
import { useModalStore } from "@store/store";
import { Btn } from "./Modal.styled";
import { useState } from "react";

export const ButtonModal = () => {
  const { open, setOpen, resetModal } = useModalStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => resetModal();

  return (
    <Btn>
      <Button onClick={handleOpen} variant="contained">
        시작하기
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalContainer"
      >
        <Inner />
      </Modal>
    </Btn>
  );
};

export const ShortsModal = ({ videoId, img, title }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Btn>
      <Button onClick={handleOpen}>click</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalContainer"
      >
        <Box sx={InnerStyle}>
          <iframe src={`https://www.youtube.com/embed/${videoId}`}></iframe>
          <Typography>{title}</Typography>
        </Box>
      </Modal>
    </Btn>
  );
};
