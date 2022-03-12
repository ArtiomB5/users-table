import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { API, UserType } from "../API";
import { RemoveUserByID } from "../tools/removeUserByID";
import { SelectOneUser } from "../tools/selectOneUser";

interface UsersTableState {
  loading: boolean;
  users: UserTypeWithSelect[];
  pages: number | null;
  currentPage: number;
  pageSize: number;
}

const initialState = {
  loading: false,
  users: [] as UserTypeWithSelect[],
  pages: null,
  currentPage: 1,
  pageSize: 5,
} as UsersTableState;

const usersTableSlice = createSlice({
  name: "usersTable",
  initialState,
  reducers: {
    setUsers(state, action: { payload: UserType[] }) {
      const usersWithSelect = SelectOneUser({ users: action.payload });
      state.users = usersWithSelect;
    },
    setLoading(state, action: { payload: boolean }) {
      state.loading = action.payload;
    },
    deleteUser(state, action: { payload: number }) {
      let usersArrWithRemoverUser = [] as UserTypeWithSelect[];
      if (
        state.users.filter((u) => u.checked === true).length === 1 &&
        state.users.filter((u) => u.id)[0].id === action.payload
      ) {
        usersArrWithRemoverUser = SelectOneUser({
          users: RemoveUserByID({ users: state.users, userID: action.payload }),
        });
      } else {
        usersArrWithRemoverUser = RemoveUserByID({
          users: state.users,
          userID: action.payload,
        });
      }
      state.users = usersArrWithRemoverUser;
    },
    checkUser(
      state,
      action: { payload: { id: number; checkboxStatus: boolean } }
    ) {
      let checkedUsers = state.users.map((user: UserTypeWithSelect) => {
        if (user.id === action.payload.id) {
          return { ...user, checked: action.payload.checkboxStatus };
        } else {
          return user;
        }
      });
      state.users = checkedUsers;
    },
    sortByID(state) {
      const usersDeepCopy = state.users.map((user) => {
        return {
          ...user,
          address: { ...user.address, geo: { ...user.address.geo } },
          company: { ...user.company },
        };
      });
      const sortedUsers = usersDeepCopy.sort((a, b) => {
        return a.id - b.id ? -1 : 1;
      });
      state.users = sortedUsers;
    },
    setPagesCount(state, action: { payload: number }) {
      state.pages = Math.ceil(action.payload / state.pageSize);
    },
    setCurrentPage(state, action: { payload: number }) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action: { payload: number }) {
      state.pageSize = action.payload;
    },
  },
});

export const {
  setUsers,
  setLoading,
  deleteUser,
  checkUser,
  sortByID,
  setPagesCount,
  setCurrentPage,
  setPageSize,
} = usersTableSlice.actions;

export const usersReducer = usersTableSlice.reducer;

//thunks
export const fetchUsers = () => {
  return (dispatch: Dispatch<ThunkDispatch>) => {
    API.getUsers().then((resp) => {
      dispatch(setUsers(resp.data));
      dispatch(setPagesCount(resp.data.length));
      dispatch(setLoading(false));
    });
  };
};

//types
export type UserTypeWithSelect = UserType & {
  checked: boolean;
};

export type StateType = {
  loading: boolean;
  users: UserTypeWithSelect[];
  pages: number | null;
  currentPage: number;
  pageSize: number;
};

type ActionType =
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof deleteUser>
  | ReturnType<typeof checkUser>
  | ReturnType<typeof sortByID>
  | ReturnType<typeof setPagesCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setPageSize>;

type ThunkDispatch = ActionType;
