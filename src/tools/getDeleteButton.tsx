import { Button } from "@alfalab/core-components/button";
import { useDispatch } from "react-redux";
import { DeleteUser } from "../store/usersReducer";

type PropsType = {
  id: number;
};

export const GetDeleteButton = (props: PropsType) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(DeleteUser(props.id));
  };
  return (
    <Button size={"xxs"} view="secondary" onClick={clickHandler}>
      {'X'}
    </Button>
  );
};
