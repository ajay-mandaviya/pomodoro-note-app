import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import { useAuth, useNotes } from "./context";
import { Archive, Home, Label, Login, Notes, Signup, Trash } from "./page";
import { archivesNotesApi, getUserTranshNotes } from "./services";
import { getUserNotes } from "./services/notes";
import Mockman from "mockman-js";
function App() {
  const {
    authUser: { token },
  } = useAuth();
  const { dispatchNote } = useNotes();

  useEffect(() => {
    if (token) {
      getUserNotes(token, dispatchNote);
      getUserTranshNotes(token, dispatchNote);
      archivesNotesApi(token, dispatchNote);
    }
  }, [token]);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="app">
        <Navbar />
        <div className="app-wrapper">
          <Sidebar />
          <Routes>
            <Route path="/mockman" element={<Mockman />} />
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
