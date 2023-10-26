import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProfilePage } from "./pages/profile";
import BaseLayout from "./app/layouts/baseLayout";
import NotFound from "./pages/404";
import HomePage, { homePageLoader } from "./pages/home";
import Account from "./pages/account";
import AboutPage from "./pages/about";
import AllSessions from "./pages/session/AllSessions";
import SingleSession from "./pages/session/SingleSession";
import SignupPage, { signupAction } from "./pages/signup";
import LoginPage, { loginFormAction } from "./pages/login";
import { checkAuthLoader, userAuthLoader } from "./app/model/auth";

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
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Account />, loader: checkAuthLoader },
          { path: "/:handler/account/sessions", element: <AllSessions /> },
          { path: "/:handler/account/session/:id", element: <SingleSession /> },
        ],
      }, // End Protected Pages
      {
        // Profile Page by Handler
        path: "/:handler",
        errorElement: <NotFound />,
        children: [{ index: true, element: <ProfilePage /> }],
      },
    ],
  }, // End Home & General Pages
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
