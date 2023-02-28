import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Snackbar from "../src/components/ui/Snackbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Snackbar />
    </div>
  );
}

export default App;
