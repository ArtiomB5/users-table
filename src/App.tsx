import { useEffect } from "react";
import * as style from "./style";
import { fetchUsers, setLoading } from "./store/usersReducer";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Table } from "./components/Table";
import { UserPage } from "./components/UserPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchUsers());
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
