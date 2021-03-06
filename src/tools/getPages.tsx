import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/usersReducer";
import { Pagination } from "@alfalab/core-components/pagination";

type PropsType = {
  currentPage: number;
  pages: number;
};

export const GetPages = (props: PropsType) => {
  const handlePageChange = (pageIndex: number) =>
    dispatch(setCurrentPage(pageIndex + 1));
  const dispatch = useDispatch();

  return (
    <>
      <Pagination
        currentPageIndex={props.currentPage - 1}
        pagesCount={props.pages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
