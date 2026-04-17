import { Route, Routes } from "react-router-dom";
import Home from "./pages/Landing/Home";
import Login from "./pages/Landing/Login";
import Register from "./pages/Landing/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMeThunk } from "./redux/features/auth/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import DashboardLayout from "./components/DashboardLayout";
import DashboardContent from "./UserDashboard/dashboard/components/DashboardContent";
import MyroadmapContent from "./UserDashboard/myRoadmaps/components/MyroadmapContent";
import CreateRoadmapContent from "./UserDashboard/createRoadmap/CreateRoadmapContent";
import ProgressContent from "./UserDashboard/progress/ProgressContent";
import SettingsContent from "./UserDashboard/settings/SettingsContent";
import RoadmapDetailContent from "./UserDashboard/roadmap/RoadmapDetailContent";
import GlobalLoader from "./components/GlobalLoader";
import DiscoveryContent from "./UserDashboard/discovery/DiscoveryContent";
import DiscoveryResults from "./UserDashboard/discovery/components/DiscoveryResults";
import PricingPage from "./pages/PricingPage";
import "react-toastify/dist/ReactToastify.css";

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
      <GlobalLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/features" element={<Features />} /> */}
        {/* <Route path="/pricing" element={<Pricing />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardContent />} />
            <Route path="my-roadmaps" element={<MyroadmapContent />} />
            <Route path="create-roadmap" element={<CreateRoadmapContent />} />
            <Route path="progress" element={<ProgressContent />} />
            <Route path="profile" element={<SettingsContent />} />
            <Route path="discovery" element={<DiscoveryContent />} />

            <Route
              path="roadmap/:roadmapId"
              element={<RoadmapDetailContent />}
            />

            <Route path="discovery/results" element={<DiscoveryResults />} />

            <Route path="pricing" element={<PricingPage />} />
          </Route>
        </Route>
      </Routes>

      {/* <Footer /> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </main>
  );
};

export default App;
