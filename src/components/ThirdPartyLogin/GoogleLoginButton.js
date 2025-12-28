import React from "react";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userGoogleLogin } from "../../store/reducers/userInfoThunk";
import "./index.css";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // console.log("Google login success:", tokenResponse);
      dispatch(userGoogleLogin(tokenResponse, navigate));
    },
    onError: () => {
      console.log("Google login failed");
    },
  });

  return (
    <Button
      type="primary"
      onClick={() => googleLogin()}
      className="third-party-login-btn"
    >
      Google
      <GoogleOutlined className="third-party-login-btn-icon" />
    </Button>
  );
};

export default GoogleLoginButton;
