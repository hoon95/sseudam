import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import dogImage from "@assets/images/home/dog.png";
import catImage from "@assets/images/home/cat.png";
import { Container, Kind } from "./Find.styled";

interface FindProps {
  "data-aos"?: string;
}

export const Find = (props: FindProps) => {
  return (
    <Container {...props}>
      <div className="text">
        <p className="title">Find your pet</p>
        <p className="desc">
          10,000개 이상의 보호소&네트워크에서 반려동물을 찾아보세요
        </p>
      </div>
      <Kind>
        <Link to="./search?type=dog" className="dog">
          <Avatar src={dogImage} className="avatar" />
          <p>강아지</p>
        </Link>
        <Link to="./search?type=cat" className="cat">
          <Avatar src={catImage} className="avatar" />
          <p>고양이</p>
        </Link>
      </Kind>
    </Container>
  );
};
