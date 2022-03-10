import { UserTypeWithSelect } from "../store/usersReducer";
import { GetDeleteButton } from "./getDeleteButton";
import { GetCheckBox } from "./getCheckBox";
import { GetLearnMoreButton } from "./getLearnMoreButton";

type PropsType = {
  users: UserTypeWithSelect[];
};

export const GetTableData = (props: PropsType) => {
  const selectedUsers = props.users.filter((user) => user.checked === true);
  return props.users.map((user: UserTypeWithSelect) => {
    return {
      checkbox: (
        <GetCheckBox
          id={user.id}
          checked={user.checked}
          selectedUsers={selectedUsers}
        />
      ),
      id: user.id,
      learnMoreButton: <GetLearnMoreButton id={user.id} />,
      username: user.username,
      email: user.email,
      website: user.website,
      deleteButton: <GetDeleteButton id={user.id} />,
    };
  });
};
