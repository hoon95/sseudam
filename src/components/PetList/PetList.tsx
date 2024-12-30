// PetList.tsx
import { Card, CardContent, Typography } from "@mui/material";
import { List } from "./PetList.styled";

interface PetType {
  desertionNo: number;
  popfile: string;
  notice_sdt: string;
  notice_edt: string;
  kind_cd: string;
  sex_cd: string;
  calculated_age: string;
  calculated_weight: string;
  org_nm: string;
}

interface PetListProps {
  data: PetType[];
}
export const PetList = ({ data }: PetListProps) => {
  return (
    <List>
      {data.map((item) => (
        <Card key={item.desertionNo} variant="outlined" className="card">
          <img src={item.popfile} alt="유기동물 사진" />
          <CardContent>
            <Typography className="text">
              <p>
                공고날짜: {item.notice_sdt} - {item.notice_edt}
              </p>
              <p>품종: {item.kind_cd}</p>
              <p>나이: {item.calculated_age}세</p>
              <p>성별: {item.sex_cd}</p>
              <p>체중: {item.calculated_weight}kg</p>
              <p>지역: {item.org_nm}</p>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </List>
  );
};
