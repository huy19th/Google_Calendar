import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Events from "./pages/Events";
import Users from "./pages/Users";
import Snackbar from "./components/ui/Snackbar";
import Backdrop from "./components/ui/Backdrop";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login, setUsers } from "./store/user.slice";
import { setEvents } from "./store/event.slice";
import UserService from "./services/user.service";
import EventService from "./services/event.service";
import cookies from "./configs/cookies";

function App() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn && cookies.get("refreshToken")) {
      async function getData() {
        try {
          let user = (await UserService.getUserInfo()).data;
          dispatch(login(user));
          setLoading(false);
          let users = (await UserService.getUserList()).data;
          dispatch(setUsers(users));
          let events = (await EventService.getEvents()).data;
          dispatch(setEvents(events));
        }
        catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
      getData();
    }
    else setLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {
            isLoggedIn ?
              <>
                <Route path="/" element={<Main />} >
                  <Route index element={<Events />} />
                  <Route path="/users" element={<Users />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </>
              :
              <>
                <Route path="/login" element={loading ? <Backdrop /> : <Login />} />
                <Route path="*" element={loading ? <Backdrop /> : <Navigate to="/login" />} />
              </>
          }
        </Routes>
      </BrowserRouter>
      <Snackbar />
    </div >
  );
}

export default App;
