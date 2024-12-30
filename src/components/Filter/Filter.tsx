import { useState, ChangeEvent, useEffect } from "react";
import { fetchLocation } from "@apis/supabase";
import { useFilterStore, useLocationStore } from "@store/store";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Slider,
  SelectChangeEvent,
} from "@mui/material";

import { Container } from "./Filter.styled";

export const Filter = () => {
  const { type, setType, gender, setGender, age, setAge, weight, setWeight } =
    useFilterStore();

  const handleType = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };
  const handleGender = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

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

  const {
    region,
    setRegion,
    city,
    setCity,
    selectedRegion,
    setSelectedRegion,
    selectedCity,
    setSelectedCity,
  } = useLocationStore();

  useEffect(() => {
    const getLocation = async () => {
      const regionData = await fetchLocation("*", "location");
      setRegion(regionData);
    };
    getLocation();
  }, [setRegion]);

  const handleRegion = async (event: SelectChangeEvent<string>) => {
    const eventRegion = event.target.value;
    const cityData = await fetchLocation("*", "location", eventRegion);
    setCity(cityData);
    setSelectedRegion(eventRegion);
  };

  const handleCity = async (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value);
  };

  interface RegionType {
    region: string;
    uprcd: string;
  }

  return (
    <Container>
      <h3>필터링</h3>
      <FormControl>
        <InputLabel id="region">시/도</InputLabel>
        <Select
          labelId="center"
          id="demo-simple-select"
          label="center"
          value={selectedRegion}
          onChange={handleRegion}
        >
          <MenuItem value="">
            <em>전체</em>
          </MenuItem>
          {region.map((item: RegionType) => (
            <MenuItem value={item.region} key={item.uprcd}>
              {item.region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="city">시/군/구</InputLabel>
        <Select
          labelId="center"
          id="demo-simple-select"
          label="center"
          value={selectedCity}
          onChange={handleCity}
        >
          <MenuItem value="">
            <em>전체</em>
          </MenuItem>
          {city.map((item) => (
            <MenuItem value={item.city} key={item.orgcd}>
              {item.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <p className="subtitle">종류</p>
        <RadioGroup value={type} onChange={handleType} defaultValue="dog" row>
          <FormControlLabel value="dog" control={<Radio />} label="강아지" />
          <FormControlLabel value="cat" control={<Radio />} label="고양이" />
        </RadioGroup>
      </FormControl>
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
