import { useQuery } from "@tanstack/react-query";
import { Container } from "./Daily.styled";
import { fetchPetData } from "@apis/post";

interface DailyProps {
  "data-aos"?: string;
}

export const Daily = (props: DailyProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["petData"],
    queryFn: fetchPetData,
  });
  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (error) {
    return <p>Error..</p>;
  }

  console.log(data);

  return (
    <Container {...props}>
      <div className="text">
        <p className="title">Daily Life</p>
        <p className="desc">반려동물과 함께하는 일상생활을 공유하세요</p>
      </div>
    </Container>
  );
};
