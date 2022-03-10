import { useParams } from "react-router-dom";

export const UserPage = () => {
  let { id } = useParams();
  return <div>{id}</div>;
};
