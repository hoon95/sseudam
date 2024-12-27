import { useState, ChangeEvent } from "react";
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
  Box,
  Slider,
} from "@mui/material";

import { Container } from "./Filter.styled";

const categoryPath = "/src/assets/images/search/category";
const dogList = [
  { src: `${categoryPath}/dog1.png`, name: "골든 리트리버", value: "dog1" },
  { src: `${categoryPath}/dog2.png`, name: "그레이 하운드", value: "dog2" },
  { src: `${categoryPath}/dog3.png`, name: "그레이트 덴", value: "dog3" },
];

export const Filter = () => {
  const { type, setType, gender, setGender, age, setAge, weight, setWeight } =
    useFilterStore();

  const handleType = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };
  const handleGender = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  // const handleAge = (
  //   event: React.SyntheticEvent | Event,
  //   newAge: number | number[],
  // ) => {
  //   setAge(newAge as number[]);
  // };
  // const handleWeight = (
  //   event: React.SyntheticEvent | Event,
  //   newWeight: number | number[],
  // ) => {
  //   setWeight(newWeight as number[]);
  // };

  const [tempAge, setTempAge] = useState<number[]>(age);
  const [tempWeight, setTempWeight] = useState<number[]>(weight);

  const handleAgeChange = (
    event: React.SyntheticEvent | Event,
    newAge: number | number[],
  ) => {
    setTempAge(newAge as number[]);
  };

  const handleWeightChange = (
    event: React.SyntheticEvent | Event,
    newWeight: number | number[],
  ) => {
    setTempWeight(newWeight as number[]);
  };

  const handleAgeCommitted = () => {
    setAge(tempAge);
  };

  const handleWeightCommitted = () => {
    setWeight(tempWeight);
  };

  return (
    <Container>
      <h3>필터링</h3>
      <FormControl>
        <p className="subtitle">종류</p>
        <RadioGroup value={type} onChange={handleType} defaultValue="dog" row>
          <FormControlLabel value="dog" control={<Radio />} label="강아지" />
          <FormControlLabel value="cat" control={<Radio />} label="고양이" />
        </RadioGroup>
      </FormControl>
      {type === "dog" && (
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
      )}
      <FormControl>
        <p className="subtitle">성별</p>
        <RadioGroup
          value={gender}
          onChange={handleGender}
          defaultValue="male"
          row
        >
          <FormControlLabel value="male" control={<Radio />} label="수컷" />
          <FormControlLabel value="female" control={<Radio />} label="암컷" />
          <FormControlLabel value="none" control={<Radio />} label="모름" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <div className="age">
          <p className="subtitle">연령</p>
          <p className="range">{`${age[0]}세 ~ ${age[1]}세`}</p>
        </div>
        <Box sx={{ width: 300 }}>
          <Slider
            getAriaLabel={() => "Age range"}
            value={tempAge}
            onChange={handleAgeChange}
            onChangeCommitted={handleAgeCommitted}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={1}
          />
        </Box>
      </FormControl>
      <FormControl>
        <div className="weight">
          <p className="subtitle">몸무게</p>
          <p className="range">{`${weight[0]}kg ~ ${weight[1]}kg`}</p>
        </div>
        <Box sx={{ width: 300 }}>
          <Slider
            getAriaLabel={() => "Weight range"}
            value={tempWeight}
            onChange={handleWeightChange}
            onChangeCommitted={handleWeightCommitted}
            valueLabelDisplay="auto"
            min={0}
            max={30}
            step={1}
          />
        </Box>
      </FormControl>
    </Container>
  );
};
