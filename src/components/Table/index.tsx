import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column, useTable } from "react-table";
import { AppRootStateType } from "../../store";
import { setPagesCount, UserTypeWithSelect } from "../../store/usersReducer";
import { GetPages } from "../../tools/getPages";
import { GetTableData } from "../../tools/getTableData";
import { SortByID } from "../../tools/sortByID";
import { Loader } from "@alfalab/core-components/loader";
import * as style from "./style";
import { GetUserCard } from "../../tools/getUserCard";
import { Typography } from "@alfalab/core-components/typography";

export const Table = () => {
  const loading = useSelector<AppRootStateType, boolean>(
    (state) => state.users.loading
  );
  const users = useSelector<AppRootStateType, UserTypeWithSelect[]>(
    (state) => state.users.users
  );
  const pages = useSelector<AppRootStateType, number>(
    (state) => state.users.pages as number
  );
  const currentPage = useSelector<AppRootStateType, number>(
    (state) => state.users.currentPage
  );
  const pageSize = useSelector<AppRootStateType, number>(
    (state) => state.users.pageSize
  );
  const usersForPage = users.filter((user, id) => {
    if (
      id + 1 > (currentPage - 1) * pageSize &&
      id + 1 <= currentPage * pageSize
    ) {
      return user;
    }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPagesCount(users.length));
  }, [users, dispatch]);

  const data = React.useMemo(
    () => GetTableData({ users: usersForPage }),
    [usersForPage]
  );

  const columns: Array<
    Column<{
      checkbox: JSX.Element;
      id: number;
      learnMoreButton: JSX.Element;
      username: string;
      email: string;
      website: string;
      deleteButton: JSX.Element;
    }>
  > = React.useMemo(
    () => [
      {
        Header: "Users Select",
        accessor: "checkbox",
      },
      {
        Header: <SortByID />,
        accessor: "id",
      },
      {
        Header: "",
        accessor: "learnMoreButton",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "E-mail",
        accessor: "email",
      },
      {
        Header: "Website",
        accessor: "website",
      },
      {
        Header: "",
        accessor: "deleteButton",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography.TitleResponsive
            view={"medium"}
            key={"Users List"}
            tag="div"
          >
            {"Users"}
          </Typography.TitleResponsive>
          <style.Table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <style.Header {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </style.Header>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <style.Row {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <style.Cell {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </style.Cell>
                      );
                    })}
                  </style.Row>
                );
              })}
            </tbody>
          </style.Table>
          <style.CardsWrapper>
            <GetUserCard users={data} />
          </style.CardsWrapper>
          <GetPages currentPage={currentPage} pages={pages} />
        </>
      )}
    </>
  );
};
