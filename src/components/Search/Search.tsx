import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@apis/supabase";
import {
  usePaginationStore,
  useFilterStore,
  useLocationStore,
} from "@store/store";
import { Banner, Container, PagingLeft } from "./Search.styled";
import { Filter } from "@components/Filter/Filter";
import { PetList } from "@components/PetList/PetList";
import { Paging } from "@components/Paging/Paging";
import { Skeleton } from "@mui/material";
import { List } from "../PetList/PetList.styled";
import { useMemo } from "react";

export const Search = () => {
  const { page, setPage } = usePaginationStore();
  const { type, setType, gender, age, weight } = useFilterStore();
  const { selectedRegion, selectedCity } = useLocationStore();

  // List 조회
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

  // Pagination
  const itemsPerPage = 20;
  // let totalPages = 0;
  // let startIndex = 0;
  // let paginatedData = [];

  // if (status === "success") {
  //   totalPages = Math.ceil(data.length / itemsPerPage);
  //   startIndex = (page - 1) * itemsPerPage;
  //   paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
  // }

  const totalPages = useMemo(() => {
    return status === "success" && data
      ? Math.ceil(data.length / itemsPerPage)
      : 0;
  }, [data, status]);

  const paginatedData = useMemo(() => {
    if (status !== "success" || !data) return [];
    const start = (page - 1) * itemsPerPage;
    const result = data.slice(start, start + itemsPerPage);
    return result;
  }, [data, page, status]);

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
              <>
                <Skeleton
                  key={index}
                  variant="rectangular"
                  className="card"
                  height={"60%"}
                />
                <Skeleton
                  variant="rectangular"
                  className="card"
                  height={"60%"}
                />
              </>
            ))}
          </List>
        ) : (
          <PetList data={paginatedData} type={type} age={age} weight={weight} />
        )}
      </Container>
      <PagingLeft>
        <div className="inner"></div>
        <Paging
          totalPages={totalPages}
          currentPage={page}
          onChangePage={setPage}
        />
      </PagingLeft>
    </>
  );
};
