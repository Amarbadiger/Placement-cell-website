import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import HeroPage from "./pages/HeroPage";
import Notification from "./pages/Notification";
import GetAllUser from "./pages/admin/GetAllUser";
import GetAllRecruiter from "./pages/admin/GetAllRecruiter";
import GetAllStudents from "./pages/admin/GetAllStudents";
import DashBoard from "./pages/admin/DashBoard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CreatePost from "./pages/Post/CreatePost";
import UpdatePost from "./pages/Post/UpdatePost";
import HomePostDetails from "./pages/HomePostDetails";

function App() {
  const loading = useSelector((state) => state.alerts.loading);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Homepost/:id"
              element={
                <ProtectedRoute>
                  <HomePostDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/edit-profile/:id"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/create-post/:id"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/update-post/:id"
              element={
                <ProtectedRoute>
                  <UpdatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <GetAllUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <ProtectedRoute>
                  <GetAllStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/recruiter"
              element={
                <ProtectedRoute>
                  <GetAllRecruiter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/Login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/Hero"
              element={
                <PublicRoute>
                  <HeroPage />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
