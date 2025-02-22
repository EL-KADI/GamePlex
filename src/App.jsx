import { initFlowbite } from "flowbite";
import "./App.css";
import { useEffect, useState } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthProtected from "./Components/AuthProtected/AuthProtected";
import Register from "./Components/Register/Register";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Notfound from "./Components/Notfound/Notfound";
import { Details } from "./Components/Details/Details";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [forgotPasswordVisited, setForgotPasswordVisited] = useState(false);
  const [resetCodeVerified, setResetCodeVerified] = useState(false);

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "game/:id",
          element: (
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <AuthProtected>
              <Register />
            </AuthProtected>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtected>
              <Login />
            </AuthProtected>
          ),
        },
        {
          path: "forget-password",
          element: (
            <AuthProtected>
              <ForgetPassword
                setForgotPasswordVisited={setForgotPasswordVisited}
              />
            </AuthProtected>
          ),
        },
        {
          path: "reset-code",
          element: (
            <AuthProtected>
              {forgotPasswordVisited ? (
                <ResetCode setResetCodeVerified={setResetCodeVerified} />
              ) : (
                <Notfound />
              )}
            </AuthProtected>
          ),
        },
        {
          path: "reset-password",
          element: (
            <AuthProtected>
              <ResetPassword />
            </AuthProtected>
          ),
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
