import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@apis/supabase";
import { usePaginationStore, useFilterStore } from "@store/store";
import { Banner, Container } from "./Search.styled";
import { Filter } from "@components/Filter/Filter";
import { PetList } from "@components/PetList/PetList";
import { Paging } from "@components/Paging/Paging";
import { useEffect } from "react";
// import { fetchPetData } from "@apis/pet";

export const Search = () => {
  const { page, setPage } = usePaginationStore();
  const { type, setType, gender, age, weight } = useFilterStore();

  useEffect(() => {
    // window.scrollTo(0, 0);
    // fetchPetData();
  }, [page]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["petData", "list", type, gender, age, weight],
    queryFn: ({ queryKey }) =>
      fetchData(
        queryKey[1],
        queryKey[2],
        queryKey[3],
        queryKey[4],
        queryKey[5],
      ),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!data) return <p>No data available</p>;

  // Pagination
  const itemsPerPage = 20;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Banner>
        <p>반려동물 찾기(공고)</p>
      </Banner>
      <Container>
        <Filter type={type} setType={setType} />
        <PetList data={paginatedData} type={type} age={age} weight={weight} />
      </Container>
      <Paging
        totalPages={totalPages}
        currentPage={page}
        onChangePage={setPage}
      />
    </>
  );
};
