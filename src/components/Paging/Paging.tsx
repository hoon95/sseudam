import { Pagination } from "@mui/material";

interface PagingProps {
  totalPages: number;
  currentPage: number;
  onChangePage: (value: number) => void;
}

export const Paging = ({
  totalPages,
  currentPage,
  onChangePage,
}: PagingProps) => {
  return (
    <Pagination
      showFirstButton
      showLastButton
      count={totalPages}
      page={currentPage}
      onChange={(event, value) => onChangePage(value)}
      sx={{
        width: "20vw",
        margin: "auto",
        padding: "calc(var(--gap) * 3) 0",
      }}
    />
  );
};
