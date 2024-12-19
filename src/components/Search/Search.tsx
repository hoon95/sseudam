import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@apis/post";
import { PetType } from "../../store/interface"; // ??
import { Banner, Filter, Container } from "./Search.styled";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";

export const Search = () => {
  const { data, isLoading, error } = useQuery<PetType[]>({
    queryKey: ["petData", "list"],
    queryFn: ({ queryKey }) => fetchData(queryKey[1]),
  });

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>Error..</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  const categoryPath = "/src/assets/images/search/category";
  const dogList = [
    { src: `${categoryPath}/dog1.png`, name: "골든 리트리버" },
    { src: `${categoryPath}/dog2.png`, name: "그레이 하운드" },
    { src: `${categoryPath}/dog3.png`, name: "그레이트 덴" },
  ];
  return (
    <>
      <Banner>
        <p>반려동물 찾기(공고)</p>
      </Banner>
      <Container>
        <Filter>
          <h3>종류</h3>
          <div className="category">
            <input type="checkbox" id="dog" />
            <label htmlFor="dog">강아지</label>
            <input type="checkbox" id="cat" />
            <label htmlFor="cat">고양이</label>
          </div>
          <FormControl>
            <InputLabel id="dogType">견종</InputLabel>
            <Select
              labelId="center"
              id="demo-simple-select"
              label="center"
              className="dogType"
            >
              <MenuItem value="" disabled>
                <em>견종을 선택하세요</em>
              </MenuItem>
              {dogList.map((item, index) => (
                <MenuItem value={`dog${index}`} key={index}>
                  <Avatar
                    src={item.src}
                    alt={`dog${index}`}
                    sx={{ marginRight: "calc(var(--gap) * 0.5)" }}
                  />
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Filter>
        <div className="list">
          {data.map((item, index) => (
            <Card key={index} variant="outlined" className="card">
              <img src={item.filename} alt="유기동물 사진" />
              <CardContent>
                <Typography className="text">
                  {/* <p>유기번호: {item.desertion_no}</p> */}
                  {/* <p>접수일: {item.happen_dt}</p> */}
                  {/* <p>발견장소: {item.happen_place}</p> */}
                  <p>품종: {item.kind_cd}</p>
                  {/* <p>색상: {item.color_cd}</p> */}
                  <p>나이: {item.age}</p>
                  {/* <p>체중: {item.weight}</p> */}
                  {/* <p>공고번호: {item.notice_no}</p> */}
                  {/* <p>
                공고날짜: {item.notice_sdt} - {item.notice_edt}
              </p> */}
                  {/* <p>상태: {item.process_state}</p> */}
                  <p>성별: {item.sex_cd}</p>
                  {/* <p>중성화여부: {item.neuter_yn}</p> */}
                  <p>특징: {item.special_mark}</p>
                  {/* <p>보호소이름: {item.care_nm}</p> */}
                  {/* <p>보호소 전화번호: {item.care_tel}</p> */}
                  {/* <p>보호장소: {item.care_addr}</p> */}
                  {/* <p>관할기관: {item.org_nm}</p> */}
                  {/* <p>담당자: {item.charge_nm}</p> */}
                  {/* <p>담당자 연락처: {item.officetel}</p> */}
                  <p>특이사항: {item.notice_comment}</p>
                </Typography>
              </CardContent>
              <CardContent>
                <Typography sx={{ marginTop: "var(--gap)" }}></Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};
