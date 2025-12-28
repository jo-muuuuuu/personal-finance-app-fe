import React from "react";
import { GithubOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userGitHubLogin } from "../../store/reducers/userInfoThunk";
import { Button } from "antd";

import "./index.css";

const GitHubLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGitHubLogin = () => {
    // Popup Window
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&scope=user:email&redirect_uri=${encodeURIComponent(
      process.env.REACT_APP_GITHUB_REDIRECT_URI
    )}`;

    const popup = window.open(
      githubAuthUrl,
      "github_auth",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Handle Message from Popup Window
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "github_auth_success" && event.data.access_token) {
        dispatch(userGitHubLogin(event.data.access_token, navigate));

        window.removeEventListener("message", handleMessage);

        if (popup) {
          popup.close();
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Check if Popup window is Closed
    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        window.removeEventListener("message", handleMessage);
      }
    }, 500);
  };

  return (
    <Button type="primary" onClick={handleGitHubLogin} className="third-party-login-btn">
      GitHub
      <GithubOutlined className="third-party-login-btn-icon" />
    </Button>
  );
};

export default GitHubLoginButton;
