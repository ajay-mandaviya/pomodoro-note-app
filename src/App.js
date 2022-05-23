import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import { useAuth, useNotes } from "./context";
import {
  Archive,
  Home,
  Label,
  Login,
  Notes,
  PrivateRoute,
  Signup,
  Trash,
} from "./page";
import { archivesNotesApi, getUserTranshNotes } from "./services";
import { getUserNotes } from "./services/notes";

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
        {!token ? (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </>
        ) : (
          <>
            <Navbar />
            <div className="app-wrapper">
              <Sidebar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Notes />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/archive"
                  element={
                    <PrivateRoute>
                      <Archive />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/trash"
                  element={
                    <PrivateRoute>
                      <Trash />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/label"
                  element={
                    <PrivateRoute>
                      <Label />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
