import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { List, EmptyList } from "./PetList.styled";
import { Link } from "react-router-dom";
import { memo } from "react";
import avatar from "@assets/images/dist/avatar.webp";
import placeholder from "@assets/images/dist/placeholder.webp";

interface PetType {
  desertion_no: number;
  popfile: string;
  notice_sdt: string;
  notice_edt: string;
  upKindNm: string;
  sex_cd: string;
  calculated_age: string;
  calculated_weight: string;
  org_nm: string;
}

interface PetListProps {
  data: PetType[];
}
export const PetList = memo(({ data }: PetListProps) => {
  return (
    <List>
      {data.length > 0 ? (
        data.map((item) => (
          <Card variant="outlined" className="card" key={item.desertion_no}>
            <Link to={`./detail/${item.desertion_no}`}>
              {/* <img src={item.popfile || placeholder} alt="유기동물 사진" /> */}
              <img
                src={item.popfile}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = placeholder;
                }}
                alt="유기동물 사진"
              />
              <CardContent>
                <Typography className="text">
                  <p>
                    공고날짜: {item.notice_sdt} - {item.notice_edt}
                  </p>
                  <p>품종: {item.upKindNm}</p>
                  <p>나이: {item.calculated_age}세</p>
                  <p>
                    성별:{" "}
                    {item.sex_cd === "M"
                      ? "수컷"
                      : item.sex_cd === "F"
                        ? "암컷"
                        : "알 수 없음"}
                  </p>
                  <p>체중: {item.calculated_weight}kg</p>
                  <p>지역: {item.org_nm}</p>
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))
      ) : (
        <EmptyList>
          <Avatar
            src={avatar}
            alt="검색 결과가 없습니다"
            sx={{ width: "30%", height: "50%" }}
          />
          <p>검색 결과가 없습니다 &#x1F622;</p>
        </EmptyList>
      )}
    </List>
  );
});
