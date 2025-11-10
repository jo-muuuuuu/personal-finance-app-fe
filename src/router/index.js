import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layout";
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
import Landing from "../pages/Landing";
import Profile from "../pages/Profile";
import SavingPlanOverview from "../pages/SavingPlan/SavingPlanOverview";
import NewSavingPlan from "../pages/SavingPlan/NewSavingPlan";
import EditSavingPlan from "../pages/SavingPlan/EditSavingPlan";
import ViewSavingPlan from "../pages/SavingPlan/ViewSavingPlan";
import DepositList from "../components/DepositList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
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
      {
        path: "saving-plan",
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: <SavingPlanOverview /> },
          { path: "new", element: <NewSavingPlan /> },
          { path: "edit/:name", element: <EditSavingPlan /> },
          { path: "view/:id", element: <ViewSavingPlan /> },
          { path: "deposit/:id", element: <DepositList /> },
        ],
      },
      { path: "/profile", element: <Profile /> },
    ],
  },
  { path: "/landing", element: <Landing /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
]);

export default router;
