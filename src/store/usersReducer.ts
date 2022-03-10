import { Dispatch } from "redux";
import { API, UserType } from "../API";
import { RemoveUserByID } from "../tools/removeUserByID";
import { SelectOneUser } from "../tools/selectOneUser";

const initialState = {
  loading: false,
  users: [] as UserTypeWithSelect[],
  pages: null,
  currentPage: 1,
  pageSize: 5,
};

export const usersReducer = (
  state: StateType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case "SET_USERS":
      const usersWithSelect = SelectOneUser({ users: action.payload });
      return { ...state, users: usersWithSelect };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "DELETE_USER":
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
      return { ...state, users: usersArrWithRemoverUser };
    case "CHECK_USER":
      let checkedUsers = state.users.map((user: UserTypeWithSelect) => {
        if (user.id === action.payload.id) {
          return { ...user, checked: action.payload.checkboxStatus };
        } else {
          return user;
        }
      });
      return { ...state, users: checkedUsers };
    case "SORT_BY_ID":
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
      return { ...state, users: sortedUsers };
    case "SET_PAGES_COUNT":
      return { ...state, pages: Math.ceil(action.payload / state.pageSize) };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    default:
      return state;
  }
};

//actions
export const SetUsers = (payload: UserType[]) => {
  return { type: "SET_USERS", payload } as const;
};
export const SetLoading = (payload: boolean) => {
  return { type: "SET_LOADING", payload } as const;
};
export const DeleteUser = (payload: number) => {
  return { type: "DELETE_USER", payload } as const;
};
export const CheckUser = (payload: { id: number; checkboxStatus: boolean }) => {
  return { type: "CHECK_USER", payload } as const;
};
export const SortByID = () => {
  return { type: "SORT_BY_ID" } as const;
};
export const SetPagesCount = (payload: number) => {
  return { type: "SET_PAGES_COUNT", payload } as const;
};
export const SetCurrentPage = (payload: number) => {
  return { type: "SET_CURRENT_PAGE", payload: payload } as const;
};
export const SetPageSize = (payload: number) => {
  return { type: "SET_PAGE_SIZE", payload: payload } as const;
};

//thunks
export const fetchUsers = () => {
  return (dispatch: Dispatch<ThunkDispatch>) => {
    API.getUsers().then((resp) => {
      dispatch(SetUsers(resp.data));
      dispatch(SetPagesCount(resp.data.length));
      dispatch(SetLoading(false));
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
  | ReturnType<typeof SetUsers>
  | ReturnType<typeof SetLoading>
  | ReturnType<typeof DeleteUser>
  | ReturnType<typeof CheckUser>
  | ReturnType<typeof SortByID>
  | ReturnType<typeof SetPagesCount>
  | ReturnType<typeof SetCurrentPage>
  | ReturnType<typeof SetPageSize>;
type ThunkDispatch = ActionType;
