import Home from "./pages/home/Home";
import Auth from "./pages/authLayout/AuthLayout";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Profile from "./pages/profile/ProfileLayout";
import ResetLayout from "./pages/resetLayout/ResetLayout";
import ActivateLayout from "./pages/activateLayout/ActivateLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import {
  userColumns,
  pitchCenterColumns,
  pitchColumns,
} from "./datatablesource";
import NewPitch from "./pages/newPitch/NewPitch";
import NewPitchCenter from "./pages/newPitchCenter/NewPitchCenter";
import PitchCenterInfo from "./pages/pitchCenterInfo/PitchCenterInfo";
import PitchInfo from "./pages/pitchInfo/PitchInfo";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="auth" element={<Auth />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="auth/reset-password/:token"
              exact
              element={<ResetLayout />}
            />
            <Route
              path="api/auth/activate/:activation_token"
              exact
              element={<ActivateLayout />}
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="pitchCenters">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={pitchCenterColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":pitchCenterid"
                element={
                  <ProtectedRoute>
                    <PitchCenterInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewPitchCenter />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="pitches">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={pitchColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":pitchId"
                element={
                  <ProtectedRoute>
                    <PitchInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewPitch />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
