import { useEffect } from "react";
import * as style from "./style";
import { fetchUsers, SetLoading } from "./store/usersReducer";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Table } from "./components/Table";
import { UserPage } from "./components/UserPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SetLoading(true));
    dispatch(fetchUsers());
    dispatch(SetLoading(false));
  }, [dispatch]);
  return (
    <style.AppWrapper>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/users/:id" element={<UserPage/>} />
      </Routes>
    </style.AppWrapper>
  );
}

export default App;
