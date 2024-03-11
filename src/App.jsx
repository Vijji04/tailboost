import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/Firebase";
function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
      setIsLoading(false); // Set isLoading to false after the initial state is resolved
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    // Render a loading spinner or a message while the user state is being initialized
    return (
      <div class="flex items-center justify-center h-screen">
        <div class="relative">
          <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  console.log("Current user:", user); // Log user state for debugging

  return (
    <BrowserRouter>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* UserDashboard route (protected) */}
        <Route
          path="/userdashboard"
          element={
            <PrivateRoute user={user}>
              <UserDashboard user={user} />
            </PrivateRoute>
          }
        />

        {/* Root route (redirect based on user state) */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/userdashboard" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// PrivateRoute component to handle authentication
const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/login" replace />;
};

export default App;
