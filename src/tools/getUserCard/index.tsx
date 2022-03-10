import * as style from "./style";
import { Typography } from "@alfalab/core-components/typography";

type PropsType = {
  users: {
    checkbox: JSX.Element;
    id: number;
    learnMoreButton: JSX.Element;
    username: string;
    email: string;
    website: string;
    deleteButton: JSX.Element;
  }[];
};

export const GetUserCard = (props: PropsType) => {
  return (
    <>
      {props.users.map((user) => {
        return (
          <style.UserCard>
            <Typography.TitleResponsive
              view={"medium"}
              key={user.email}
              tag="div"
            >
              {user.username}
            </Typography.TitleResponsive>
            <Typography.TitleResponsive
              view={"small"}
              key={user.email}
              tag="div"
            >
              {user.email}
            </Typography.TitleResponsive>
            <Typography.TitleResponsive
              view={"xsmall"}
              key={user.email}
              tag="div"
            >
              ID: {user.id}
            </Typography.TitleResponsive>
            <Typography.TitleResponsive
              view={"xsmall"}
              key={user.email}
              tag="div"
            >
              {user.website}
            </Typography.TitleResponsive>
            <style.ButtonsRow>
              <div>{user.checkbox} Select User</div>
              <div>{user.learnMoreButton}</div>
              <div>{user.deleteButton}</div>
            </style.ButtonsRow>
          </style.UserCard>
        );
      })}
    </>
  );
};
