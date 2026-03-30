import { Route, Routes } from "react-router-dom";
import Home from "./pages/Landing/Home";
import Pricing from "./pages/Landing/Pricing";
import Login from "./pages/Landing/Login";
import Register from "./pages/Landing/Register";
import Dashboard from "./pages/Dashboard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMeThunk } from "./redux/features/auth/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import DashboardLayout from "./components/DashboardLayout";
import DashboardContent from "./UserDashboard/dashboard/components/DashboardContent";

const App = () => {
  const dispath = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispath(getMeThunk());
    } else {
      console.log("No token found");
    }
  }, []);
  return (
    <main className="min-h-screen bg-[#0E0F14]">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/features" element={<Features />} /> */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardContent />} />
          </Route>
        </Route>
      </Routes>

      {/* <Footer /> */}
      <ToastContainer />
    </main>
  );
};

export default App;
