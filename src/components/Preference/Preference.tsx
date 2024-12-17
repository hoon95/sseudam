import Typewriter from "typewriter-effect";
import { Container, Thumbnail, Cursor, Prefer } from "./Preference.styled";
import { Button } from "@mui/material";
import thumbnail from "@assets/images/home/thumbnail.png";

export const Preference = () => {
  return (
    <Container>
      <Thumbnail>
        <img src={thumbnail} alt="이미지입니당" />
      </Thumbnail>
      <Prefer>
        <p className="intro">취향저격</p>
        <Cursor>
          <p className="myPrefer">내 취향은</p>
          <div className="cursor">
            <Typewriter
              options={{
                strings: [
                  "웰시코기",
                  "포메라니안",
                  "닥스훈트",
                  "말티즈",
                  "사모예드",
                ],
                autoStart: true,
                loop: true,
              }}
            />
            <p>입니다</p>
          </div>

          <p>나에게 맞는 반려동물을 AI가 추천해줄게요</p>
        </Cursor>
        <Button className="startBtn">시작하기</Button>
      </Prefer>
    </Container>
  );
};
