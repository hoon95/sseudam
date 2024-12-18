import { Container } from "./Daily.styled";
import catImage from "@assets/images/home/cat.png";

interface DailyProps {
  "data-aos"?: string;
}

export const Daily = (props: DailyProps) => {
  return (
    <Container {...props}>
      <div className="text">
        <p className="title">Daily Life</p>
        <p className="desc">반려동물과 함께하는 일상생활을 공유하세요</p>
      </div>
      <img src={catImage} alt="" />
    </Container>
  );
};
