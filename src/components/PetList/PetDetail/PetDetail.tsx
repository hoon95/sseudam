import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchDetail } from "@apis/supabase";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { blue, pink } from "@mui/material/colors";
import { Detail } from "./PetDetail.styled";

export const PetDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["detail", id],
    queryFn: ({ queryKey }) => fetchDetail(queryKey[1]),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  console.log(data);
  const item = data[0];
  return (
    <Detail>
      <img src={item.popfile} alt="" />
      <div className="title">
        <p className="kind">{item.kind}</p>
        <p className="sex">
          {item.sex_cd === "M" ? (
            <MaleIcon sx={{ color: blue[700] }} />
          ) : (
            <FemaleIcon sx={{ color: pink[700] }} />
          )}
        </p>
        <p className="age">{item.calculated_age}세</p>
        <p>&nbsp;/&nbsp;</p>
        <p className="weight">{item.calculated_weight}kg</p>
      </div>
    </Detail>
  );
};
