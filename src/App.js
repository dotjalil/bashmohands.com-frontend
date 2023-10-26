import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "./pages/profile";
import BaseLayout from "./app/layouts/baseLayout";
import NotFound from "./pages/404";
import HomePage, { homePageLoader } from "./pages/home";
import AccountPage from "./pages/account";
import AboutPage from "./pages/about";
import SessionsPage from "./pages/sessions";
import SessionPage from "./pages/session";
import SignupPage, { signupAction } from "./pages/signup";
import LoginPage, { loginFormAction } from "./pages/login";
import ProfileSettingsPage from "./pages/myProfile";
import AccountSettingsPage from "./pages/accountSettings";

import {
  checkAuthLoader,
  isAuthMineLoader,
  userAuthLoader,
} from "./app/model/auth";
import AccountLayout from "./app/layouts/accountLayout";
import { ConfigProvider } from "antd";
import ProfileLayout from "./app/layouts/profileLayout";

const router = createBrowserRouter([
  {
    // Home & General Pages because no auth needed
    path: "/",
    element: <BaseLayout />,
    errorElement: <NotFound />,
    loader: userAuthLoader,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },
      { path: "/about", element: <AboutPage /> },
      { path: "/signup", element: <SignupPage />, action: signupAction },
      { path: "/login", element: <LoginPage />, action: loginFormAction },
      {
        // Protected Pages & is related to user profile
        path: "/:handler/account",
        element: <AccountLayout />,
        errorElement: <NotFound />,
        loader: isAuthMineLoader,
        children: [
          {
            index: true,
            element: <AccountPage />,
          },
          { path: "/:handler/account/sessions", element: <SessionsPage /> },
          { path: "/:handler/account/session/:id", element: <SessionPage /> },
          {
            path: "/:handler/account/settings",
            element: <AccountSettingsPage />,
          },
          {
            path: "/:handler/account/profile",
            element: <ProfileSettingsPage />,
          },
        ],
      }, // End Protected Pages
      // {
      //   // Profile Page by Handler
      //   path: "/:handler",
      //   errorElement: <NotFound />,
      //   children: [{ index: true, element: <ProfilePage /> }],
      // },
    ],
  }, // End Home & General Pages
  {
    // public profile path
    path: "/:handler",
    element: <ProfileLayout />,
    errorElement: <NotFound />,
    loader: userAuthLoader,
    id: "profile",
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#DA005C",
          colorLink: "#DA005C",
          // Alias Token
          // colorBgContainer: "#f6ffed",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
