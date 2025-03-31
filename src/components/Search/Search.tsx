// import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// import { useInView } from "react-intersection-observer";
import { fetchData } from "@apis/supabase";
import {
  // usePaginationStore,
  useFilterStore,
  useLocationStore,
} from "@store/store";
import { Banner, Container } from "./Search.styled";
import { Filter } from "@components/Filter/Filter";
import { PetList } from "@components/PetList/PetList";
import { Skeleton, Avatar } from "@mui/material";
import { List, EmptyList } from "../PetList/PetList.styled";
import avatar from "@assets/images/dist/avatar.webp";

export const Search = () => {
  // const { page, setPage } = usePaginationStore();
  const { type, setType, gender, age, weight } = useFilterStore();
  const { selectedRegion, selectedCity } = useLocationStore();
  // const { ref, inView } = useInView();

  const { status, data, error } = useQuery({
    queryKey: [
      "petData",
      "list",
      type,
      gender,
      age,
      weight,
      selectedRegion,
      selectedCity,
    ],
    queryFn: ({ queryKey }) =>
      fetchData(
        queryKey[1],
        queryKey[2],
        queryKey[3],
        queryKey[4],
        queryKey[5],
        queryKey[6],
        queryKey[7],
      ),
  });

  // const itemsPerPage = 20;

  // const paginatedData = useMemo(() => {
  //   if (status !== "success" || !data) return [];
  //   return data.slice(0, page * itemsPerPage);
  // }, [data, page, status]);

  return (
    <>
      <Banner>
        <p>반려동물 찾기(공고)</p>
      </Banner>
      <Container>
        <Filter type={type} setType={setType} />

        {status === "pending" || error || !data ? (
          <List>
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <Skeleton
                  variant="rectangular"
                  className="card"
                  height={"60%"}
                />
                <Skeleton
                  variant="rectangular"
                  className="card"
                  height={"60%"}
                />
              </div>
            ))}
          </List>
        ) : // ) : paginatedData.length === 0 ? (
        data.length === 0 ? (
          <EmptyList>
            <Avatar
              src={avatar}
              alt="검색 결과 없음"
              sx={{ width: "30%", height: "50%" }}
            />
            <p>검색 결과가 없습니다 😢</p>
          </EmptyList>
        ) : (
          <>
            <PetList
              // data={paginatedData}
              data={data}
              type={type}
              age={age}
              weight={weight}
            />
          </>
        )}
      </Container>
    </>
  );
};
