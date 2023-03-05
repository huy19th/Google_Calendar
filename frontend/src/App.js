import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import Snackbar from "../src/components/ui/Snackbar";
import Backdrop from "./components/ui/Backdrop";
import { login } from "./store/user.slice";
import UserService from "./services/user.service";

function App() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  let isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem("token")) {
      UserService.getUserInfo()
        .then(res => {
          dispatch(login(res.data));
        })
        .catch(err => {
          console.log(err.response.statusText);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);


  return (
    <div>
      <BrowserRouter>
        <Routes>
          {
            isLoggedIn ?
              <>
                <Route path="/home" element={<h1>Home</h1>} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
              :
              <>
                <Route path="/login" element={loading ? <Backdrop /> : <Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
          }

        </Routes>
      </BrowserRouter>
      <Snackbar />
    </div>
  );
}

export default App;
