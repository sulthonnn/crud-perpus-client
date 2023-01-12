import Dashboard from "./pages/Dashboard/Dashboard";
import BookList from "./pages/Books/BooksList";
import AddBook from "./pages/Books/AddBook";
import UpdateBook from "./pages/Books/UpdateBook";
import MemberList from "./pages/Members/MembersList";
import AddMember from "./pages/Members/AddMember";
import UpdateMember from "./pages/Members/UpdateMember";
import UserList from "./pages/Users/UserList";
import AddUser from "./pages/Users/AddUser";
import UpdateUser from "./pages/Users/UpdateUser";
import CirculationList from "./pages/Circulation/CirculationBooks";
import UpdateCirculation from "./pages/Circulation/UpdateCirculation";
import AddCirculation from "./pages/Circulation/AddCirculation";
import Logs from "./pages/Log/Logs";

import Login from "./components/Login/index";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/book/:id" element={<UpdateBook />} />
          <Route path="/members" element={<MemberList />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/member/:id" element={<UpdateMember />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/user/:id" element={<UpdateUser />} />
          <Route path="/circulations" element={<CirculationList />} />
          <Route path="/circulation/:id" element={<UpdateCirculation />} />
          <Route path="/add-circulation" element={<AddCirculation />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/redirect" element={<Navigate to={"/add-member"} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
