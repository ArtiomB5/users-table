import { UserTypeWithSelect } from "../store/usersReducer";

type PropsType = {
  id: number;
  newStatus: boolean;
  selectedUsers: UserTypeWithSelect[];
};

export const CheckCheckBox = (props: PropsType) => {

  if (
    props.selectedUsers.length === 1 &&
    props.selectedUsers[0].id === props.id &&
    props.selectedUsers[0].checked &&
    props.newStatus === false
  ) {
      return false
  } else {
      return true
  }
};
