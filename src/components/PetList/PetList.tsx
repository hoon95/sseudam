// PetList.tsx
import { Card, CardContent, Typography } from "@mui/material";
import { List } from "./PetList.styled";

interface PetType {
  desertionNo: number;
  popfile: string;
  notice_sdt: string;
  notice_edt: string;
  kind_cd: string;
  age: string;
  sex_cd: string;
  weight: string;
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
              <p>나이: {item.age}</p>
              <p>성별: {item.sex_cd}</p>
              <p>체중: {item.weight}</p>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </List>
  );
};
