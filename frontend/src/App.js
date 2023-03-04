import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Redirect from "./pages/Redirect";
import Snackbar from "../src/components/ui/Snackbar";
import { useSelector } from "react-redux";

function App() {

  let isLoggedIn = useSelector(state => state.user.isLoggedIn);
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {
            isLoggedIn ?
            <Route path="/home" element={<h1>Home</h1>} />
            :
            <Route path="*" element={<Redirect />} />
          }
          
        </Routes>
      </BrowserRouter>
      <Snackbar />
    </div>
  );
}

export default App;
