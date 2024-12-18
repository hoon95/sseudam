import { Modal, Button } from "@mui/material";
import { Inner } from "./Inner/Inner";
import { useModalStore } from "@store/Store";
import { Btn } from "./Modal.styled";

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
