import { UserType } from "../API";
import { UserTypeWithSelect } from "../store/usersReducer";

export type PropsType = {
  users: UserType[] | UserTypeWithSelect[];
};

export const SelectOneUser = (props: PropsType) => {
  return props.users.map((user, id) => {
    if (id === 0) {
      return { ...user, checked: true };
    } else {
      return { ...user, checked: false };
    }
  });
};
