import { ChangeEvent } from "react";
import { useFilterStore } from "@store/store";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Container } from "./Filter.styled";

const categoryPath = "/src/assets/images/search/category";
const dogList = [
  { src: `${categoryPath}/dog1.png`, name: "골든 리트리버", value: "dog1" },
  { src: `${categoryPath}/dog2.png`, name: "그레이 하운드", value: "dog2" },
  { src: `${categoryPath}/dog3.png`, name: "그레이트 덴", value: "dog3" },
];

export const Filter = () => {
  const { type, setType } = useFilterStore();
  const handleType = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  return (
    <Container>
      <h3>종류</h3>
      <FormControl>
        <RadioGroup value={type} onChange={handleType} row>
          <FormControlLabel value="dog" control={<Radio />} label="강아지" />
          <FormControlLabel value="cat" control={<Radio />} label="고양이" />
        </RadioGroup>
      </FormControl>
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
    </Container>
  );
};
