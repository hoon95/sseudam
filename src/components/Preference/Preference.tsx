import Typewriter from "typewriter-effect";
import { ButtonModal } from "@components/Modal/Modal";
import { Container, Thumbnail, Cursor, Prefer } from "./Preference.styled";
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
          <p className="myPrefer">내 취향은..</p>
          <div className="cursor">
            <Typewriter
              options={{
                strings: ["말티즈", "푸들", "포메라니안", "치와와", "시츄"],
                autoStart: true,
                loop: true,
              }}
            />
            <p>입니다</p>
          </div>

          <p>나만의 반려동물 취향을 확인하고 주변에 공유해보세요!</p>
        </Cursor>
        <ButtonModal />
      </Prefer>
    </Container>
  );
};
