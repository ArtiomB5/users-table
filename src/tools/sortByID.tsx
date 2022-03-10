import { useDispatch } from "react-redux";
import { SortByID as SortByIDAC } from "../store/usersReducer";
import { Link } from "@alfalab/core-components/link";

export const SortByID = () => {
  const dispatch = useDispatch();

  return (
    <Link
      view="default"
      rel="noopener"
      target="_blank"
      onClick={() => dispatch(SortByIDAC())}
    >
      ID
    </Link>
  );
};
