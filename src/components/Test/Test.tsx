import Typewriter from "typewriter-effect";
import { ButtonModal } from "@components/Modal/Modal";
import { Container } from "./Test.styled";
import capture from "@assets/images/test/capture.png";

export const Test = () => {
  return (
    <Container>
      <h2 className="title">반려동물 취향 테스트</h2>
      <div className="desc">
        <div className="text">
          <p>나와 찰떡궁합은</p>
          <div className="typed">
            <Typewriter
              options={{
                wrapperClassName: "type",
                strings: ["말티즈", "푸들", "치와와", "시츄"],
                autoStart: true,
                loop: true,
              }}
            />
            <p>입니다</p>
          </div>
          <p className="subDesc">
            나만의 반려동물 취향을 확인하고 주변에 공유해보세요!
          </p>
        </div>
        <img src={capture} alt="취향 테스트 이미지" />
      </div>

      <ButtonModal />
    </Container>
  );
};
