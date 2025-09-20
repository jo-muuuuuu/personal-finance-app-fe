import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/index";

const AuthRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export default AuthRoute;
