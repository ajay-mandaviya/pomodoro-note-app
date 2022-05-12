import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import { Archive, Home, Label, Login, Notes, Signup, Trash } from "./page";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <div className="app-wrapper">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/label" element={<Label />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
