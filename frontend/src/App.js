import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Users from "./pages/Users";
import Snackbar from "./components/ui/Snackbar";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route index element={<Main />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <Snackbar />
    </div >
  );
}

export default App;
