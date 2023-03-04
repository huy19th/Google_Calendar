import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Snackbar from "../src/components/ui/Snackbar";
import { useSelector } from "react-redux";

function App() {

  let isLoggedIn = useSelector(state => state.user.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {

    }
  })

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
                <Route path="/login" element={<Login />} />
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
