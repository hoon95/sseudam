import { ChangeEvent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@apis/supabase";
import { useLocation } from "react-router-dom";
// import { petList } from "@apis/pet";
import { usePaginationStore } from "@store/store";
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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Pagination,
} from "@mui/material";

export interface PetType {
  desertion_no: number;
  filename: string;
  happen_dt: number;
  happen_place: string;
  kind_cd: string;
  color_cd: string;
  age: string;
  weight: string;
  notice_no: string;
  notice_sdt: number;
  notice_edt: number;
  popfile: string;
  process_state: string;
  sex_cd: string;
  neuter_yn: string;
  special_mark: string;
  care_nm: string;
  care_tel: string;
  care_addr: string;
  org_nm: string;
  charge_nm: string;
  officetel: string;
  notice_comment: string;
}

export const Search = () => {
  const location = useLocation();
  const { type, setType, page, setPage } = usePaginationStore();

  const handleType = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    const checked = event.target.checked;
    if (checked) {
      setType(type);
    }
  };

  const handlePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    //   petList();
  }, [location, page]);

  const { data, isLoading, error } = useQuery<PetType[]>({
    queryKey: ["petData", "list", type, page],
    queryFn: ({ queryKey }) => fetchData(queryKey[1], queryKey[2]),
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

  // const totalPage = Math.ceil(data.length / 5);

  const categoryPath = "/src/assets/images/search/category";
  const dogList = [
    { src: `${categoryPath}/dog1.png`, name: "골든 리트리버", value: "dog1" },
    { src: `${categoryPath}/dog2.png`, name: "그레이 하운드", value: "dog2" },
    { src: `${categoryPath}/dog3.png`, name: "그레이트 덴", value: "dog3" },
  ];

  return (
    <>
      <Banner>
        <p>반려동물 찾기(공고)</p>
      </Banner>
      <Container>
        <Filter>
          <h3>종류</h3>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value="dog"
                  checked={type === "dog" ? true : false}
                  onChange={(e) => handleType(e, "dog")}
                />
              }
              label="강아지"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="cat"
                  checked={type === "cat" ? true : false}
                  onChange={(e) => handleType(e, "cat")}
                />
              }
              label="고양이"
            />
          </FormGroup>
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
                <MenuItem value={item.value} key={index}>
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
                  <p>
                    공고날짜: {item.notice_sdt} - {item.notice_edt}
                  </p>
                  <p>품종: {item.kind_cd}</p>
                  <p>나이: {item.age}</p>
                  <p>성별: {item.sex_cd}</p>
                  {/* <p>유기번호: {item.desertion_no}</p> */}
                  {/* <p>접수일: {item.happen_dt}</p> */}
                  {/* <p>발견장소: {item.happen_place}</p> */}
                  {/* <p>색상: {item.color_cd}</p> */}
                  {/* <p>체중: {item.weight}</p> */}
                  {/* <p>공고번호: {item.notice_no}</p> */}
                  {/* <p>상태: {item.process_state}</p> */}
                  {/* <p>중성화여부: {item.neuter_yn}</p> */}
                  {/* <p>특징: {item.special_mark}</p> */}
                  {/* <p>보호소이름: {item.care_nm}</p> */}
                  {/* <p>보호소 전화번호: {item.care_tel}</p> */}
                  {/* <p>보호장소: {item.care_addr}</p> */}
                  {/* <p>관할기관: {item.org_nm}</p> */}
                  {/* <p>담당자: {item.charge_nm}</p> */}
                  {/* <p>담당자 연락처: {item.officetel}</p> */}
                  {/* <p>특이사항: {item.notice_comment}</p> */}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography sx={{ marginTop: "var(--gap)" }}></Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
      <Pagination
        count={5}
        onChange={handlePage}
        sx={{
          width: "20vw",
          margin: "auto",
          padding: "calc(var(--gap) * 3) 0",
        }}
      />
    </>
  );
};
