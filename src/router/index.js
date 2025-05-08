import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import AccountBookOverview from "../pages/AccountBook/AccountBookOverview";
import NewAccountBook from "../pages/AccountBook/NewAccountBook";
import EditAccountBook from "../pages/AccountBook/EditAccountBook";
import TransactionOverview from "../pages/Transaction/TransactionOverview";
import NewTransaction from "../pages/Transaction/NewTransaction";
import EditTransaction from "../pages/Transaction/EditTransaction";
import ViewTransaction from "../pages/Transaction/ViewTransaction";
import ViewAccountBook from "../pages/AccountBook/ViewAccountBook";

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
          { path: "edit/:name", element: <EditAccountBook /> },
          { path: "view/:id", element: <ViewAccountBook /> },
        ],
      },
      {
        path: "transactions",
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: <TransactionOverview /> },
          { path: "new", element: <NewTransaction /> },
          { path: "edit/:id", element: <EditTransaction /> },
          { path: "view/:id", element: <ViewTransaction /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
]);

export default router;
