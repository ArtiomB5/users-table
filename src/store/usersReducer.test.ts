import { UserType } from "../API";
import * as usersReducer from "./usersReducer";
import { UserTypeWithSelect } from "./usersReducer";

let initialState = {}  as usersReducer.StateType;
let users = [] as UserType[];

beforeEach(() => {
  initialState = {
    loading: false,
    users: [] as UserTypeWithSelect[],
    pages: null,
    currentPage: 1,
    pageSize: 5,
  };
  users = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
  ];
});

test("Should create SET_USERS action", () => {
  expect(usersReducer.setUsers(users)).toEqual({
    type: "usersTable/setUsers",
    payload: users,
  });
});

test("Should create SET_LOADING action", () => {
  expect(usersReducer.setLoading(true)).toEqual({
    type: "usersTable/setLoading",
    payload: true,
  });
});

test("Should create DELETE_USER action", () => {
  expect(usersReducer.deleteUser(1)).toEqual({
    type: "usersTable/deleteUser",
    payload: 1,
  });
});

test("Should create CHECK_USER action", () => {
  const payload = { id: 1, checkboxStatus: true };
  expect(usersReducer.checkUser(payload)).toEqual({
    type: "usersTable/checkUser",
    payload: payload,
  });
});

test("Should create SORT_BY_ID action", () => {
  expect(usersReducer.sortByID()).toEqual({
    type: "usersTable/sortByID",
  });
});

test("Should create SET_PAGES_COUNT action", () => {
  expect(usersReducer.setPagesCount(2)).toEqual({
    type: "usersTable/setPagesCount",
    payload: 2,
  });
});

test("Should create SET_CURRENT_PAGE action", () => {
  expect(usersReducer.setCurrentPage(2)).toEqual({
    type: "usersTable/setCurrentPage",
    payload: 2,
  });
});

test("Should create SET_PAGE_SIZE action", () => {
  expect(usersReducer.setPageSize(2)).toEqual({
    type: "usersTable/setPageSize",
    payload: 2,
  });
});

test("Should set users", () => {
  const action = usersReducer.setUsers(users);
  let usersWithSelect = users.map((user, id) => {
    if (id === 0) {
      return { ...user, checked: true };
    } else {
      return { ...user, checked: false };
    }
  });
  expect(usersReducer.usersReducer(initialState, action)).toEqual({
    loading: false,
    users: usersWithSelect,
    pages: null,
    currentPage: 1,
    pageSize: 5,
  });
});

test("Should set loading", () => {
    const action = usersReducer.setLoading(true);
    expect(usersReducer.usersReducer(initialState, action)).toEqual({
      loading: true,
      users: [] as UserTypeWithSelect[],
      pages: null,
      currentPage: 1,
      pageSize: 5,
    });
  });

  test("Should delete user with ID=1", () => {
    const setUsersAction = usersReducer.setUsers(users);
    const state = usersReducer.usersReducer(initialState, setUsersAction);
    const deleteUsersAction = usersReducer.deleteUser(1);
    expect(usersReducer.usersReducer(state, deleteUsersAction)).toEqual({
      loading: false,
      users: [{
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771",
          geo: {
            lat: "-43.9509",
            lng: "-34.4618",
          },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
          name: "Deckow-Crist",
          catchPhrase: "Proactive didactic contingency",
          bs: "synergize scalable supply-chains",
        },
        checked: true
      },],
      pages: null,
      currentPage: 1,
      pageSize: 5,
    });
  });

  test("Should check user selection with ID=1", () => {
    const setUsersAction = usersReducer.setUsers(users);
    const state = usersReducer.usersReducer(initialState, setUsersAction);
    const selectUserAction = usersReducer.checkUser({ id: 1, checkboxStatus: true });
    let usersWithSelect = users.map((user, id) => {
        if (id === 0) {
          return { ...user, checked: true };
        } else {
          return { ...user, checked: false };
        }
      });
    expect(usersReducer.usersReducer(state, selectUserAction)).toEqual({
      loading: false,
      users: usersWithSelect,
      pages: null,
      currentPage: 1,
      pageSize: 5,
    });
  });

  test("Should sort users by ID", () => {
    const setUsersAction = usersReducer.setUsers(users);
    const state = usersReducer.usersReducer(initialState, setUsersAction);
    const sortUsersAction = usersReducer.sortByID();
    const usersWithSelect = users.map((user, id) => {
        if (id === 0) {
          return { ...user, checked: true };
        } else {
          return { ...user, checked: false };
        }
      });
      const usersDeepCopy = usersWithSelect.map((user) => {
        return {
          ...user,
          address: { ...user.address, geo: { ...user.address.geo } },
          company: { ...user.company },
        };
      });
      const sortedUsers = usersDeepCopy.sort((a, b) => {
        return a.id - b.id ? -1 : 1;
      });
    expect(usersReducer.usersReducer(state, sortUsersAction)).toEqual({
      loading: false,
      users: sortedUsers,
      pages: null,
      currentPage: 1,
      pageSize: 5,
    });
  });

  test("Should set pages count", () => {
    const action = usersReducer.setPagesCount(5);
    expect(usersReducer.usersReducer(initialState, action)).toEqual({
        loading: false,
        users: [] as UserTypeWithSelect[],
        pages: 1,
        currentPage: 1,
        pageSize: 5,
    });
  });

  test("Should set current page number equal 1", () => {
    const action = usersReducer.setCurrentPage(2);
    expect(usersReducer.usersReducer(initialState, action)).toEqual({
        loading: false,
        users: [] as UserTypeWithSelect[],
        pages: null,
        currentPage: 2,
        pageSize: 5,
    });
  });

  test("Should set page size", () => {
    const action = usersReducer.setPageSize(15);
    expect(usersReducer.usersReducer(initialState, action)).toEqual({
        loading: false,
        users: [] as UserTypeWithSelect[],
        pages: null,
        currentPage: 1,
        pageSize: 15,
    });
  });