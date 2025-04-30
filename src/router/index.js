import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import AccountBookOverview from "../pages/AccountBook/AccountBookOverview";
import Transaction from "../pages/Transaction";
import ResetPassword from "../pages/ResetPassword";
import NewAccountBook from "../pages/AccountBook/NewAccountBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "account-book",
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: <AccountBookOverview /> },
          { path: "new", element: <NewAccountBook /> },
        ],
      },
      {
        path: "transactions",
        element: <Transaction />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
]);

export default router;
