import { Button } from "@alfalab/core-components/button";
import { Link } from "react-router-dom";
import * as style from "./style"

type PropsType = {
  id: number;
};

export const GetLearnMoreButton = (props: PropsType) => {
  return (
    <style.LinkWrapper to={`/users/${props.id}`}>
      <Button size={"xxs"} view="secondary">
        {"Learn more"}
      </Button>
    </style.LinkWrapper>
  );
};
