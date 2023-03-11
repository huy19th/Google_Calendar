import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Snackbar from "../src/components/ui/Snackbar";
import Backdrop from "./components/ui/Backdrop";
import { login, setUsers } from "./store/user.slice";
import { setEvents } from "./store/event.slice";
import UserService from "./services/user.service";
import EventService from "./services/event.service";

function App() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  let isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem("token")) {
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
                <Route path="/" element={<Home />} >
                  <Route index element={<Main />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
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
