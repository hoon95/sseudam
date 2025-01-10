import { Link } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FooterLink, SnsIcon } from "./Footer.styled";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        padding: "var(--gap) 0",
        marginTop: "calc(var(--gap) * 5)",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          color="var(--light)"
          variant="h3"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "var(--gap)",
          }}
        >
          쓰담
          <FooterLink>
            <Link to="/search">반려동물 찾기</Link>
            <Link to="/share">일상 공유</Link>
            <Link to="/test">취향 테스트</Link>
          </FooterLink>
          <SnsIcon>
            <YouTubeIcon />
            <FacebookIcon />
            <XIcon />
            <InstagramIcon />
            <LinkedInIcon />
          </SnsIcon>
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: "center" }}
          color="var(--light)"
        >
          {`Copyright ${new Date().getFullYear()}. hoon. All rights reserved.`}
        </Typography>
      </Container>
    </Box>
  );
};
