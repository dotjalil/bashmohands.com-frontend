// lazily load components, which means they are loaded only when they are needed.
import { lazy } from "react";

// defining routing behavior.
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./home";
import ProfilePage from "./profile";

// const HomePage = lazy(() => import("./home"));
// const ProfilePage = lazy(() => import("./profile"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:profileUsername" element={<ProfilePage />} />
      {/* <Navigate to="/" /> */}
    </Routes>
  );
};
