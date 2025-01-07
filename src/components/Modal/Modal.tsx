import { Inner } from "./Inner/Inner";
import { ShortsInnerStyle } from "./Inner/Inner.styled";
import { useModalStore, useShortsStore } from "@store/store";
import { Btn, VideoContainer, Camera, Wifi, Battery } from "./Modal.styled";
import { Modal, Button, Box } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery50Icon from "@mui/icons-material/Battery50";

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
        <>
          <Inner />
        </>
      </Modal>
    </Btn>
  );
};

interface ShortsType {
  videoId: string;
}

export const ShortsModal = ({ videoId }: ShortsType) => {
  const { openVideoId, setOpenVideoId } = useShortsStore();
  const closeModal = () =>
    setTimeout(() => {
      setOpenVideoId(null);
    }, 10);

  return (
    <Btn>
      <Modal
        open={openVideoId === videoId}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalContainer"
      >
        <Box sx={ShortsInnerStyle}>
          <VideoContainer>
            <Camera />
            <WifiIcon sx={Wifi} />
            <Battery50Icon sx={Battery} />
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?feature=shorts&autoplay=1&showinfo=0`}
              title="YouTube Shorts"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </VideoContainer>
        </Box>
      </Modal>
    </Btn>
  );
};
