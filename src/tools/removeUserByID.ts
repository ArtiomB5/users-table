import { UserTypeWithSelect } from "../store/usersReducer";

export type PropsType = {
  users: UserTypeWithSelect[];
  userID: number;
};

export const RemoveUserByID = (props: PropsType) => {
  return props.users.filter((user: UserTypeWithSelect) => {
    if (user.id !== props.userID) {
      return user;
    }
  })
};
