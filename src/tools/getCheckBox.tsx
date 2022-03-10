import React from "react";
import { useDispatch } from "react-redux";
import {
  CheckUser,
  UserTypeWithSelect,
} from "../store/usersReducer";
import { Checkbox } from "@alfalab/core-components/checkbox";
import { CheckCheckBox } from "./checkCheckBox";
import { Toast } from "@alfalab/core-components/toast";

type PropsType = {
  id: number;
  checked: boolean;
  selectedUsers: UserTypeWithSelect[];
};

export const GetCheckBox = (props: PropsType) => {
  const [fixedToastOpen, setFixedToastOpen] = React.useState(false);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (
      CheckCheckBox({
        id: props.id,
        newStatus: !props.checked,
        selectedUsers: props.selectedUsers,
      })
    ) {
      dispatch(CheckUser({ id: props.id, checkboxStatus: !props.checked }));
    } else {
      setFixedToastOpen(true);
    }
  };
  return (
    <>
      <Checkbox onChange={clickHandler} checked={props.checked} />
      <Toast
        open={fixedToastOpen}
        badge="attention"
        title="At least one user must be selected!"
        hasCloser={true}
        block={true}
        onClose={() => {
          setFixedToastOpen(false);
        }}
        autoCloseDelay={3000}
      />
    </>
  );
};
