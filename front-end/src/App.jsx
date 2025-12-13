import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Protected Route */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/home" />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/home" />}
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
