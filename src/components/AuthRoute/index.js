import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../../utils/index";
import { antdError } from "../../utils/antdMessage";

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    antdError("Session expired, please log in again.");
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export default AuthRoute;
