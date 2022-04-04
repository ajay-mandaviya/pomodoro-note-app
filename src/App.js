import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components";
import { Home, Login, Signup } from "./page";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
