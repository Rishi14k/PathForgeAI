
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import {useDispatch} from "react-redux"
import { useEffect } from "react";
import { getMeThunk } from "./redux/features/auth/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const dispath = useDispatch();
  const token = localStorage.getItem("token")
  useEffect(()=>{
    if(token){
      dispath(getMeThunk())
    }else{
      console.log("No token found")
    }
  },[])
  return (
    <main className="min-h-screen bg-[#0E0F14]">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/features" element={<Features />} /> */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      </Routes>

      {/* <Footer /> */}
      <ToastContainer />
    </main>
  );
};

export default App;
