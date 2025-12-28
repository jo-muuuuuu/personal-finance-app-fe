// Frontend: GitHubCallback.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography } from "antd";
import { antdError } from "../../utils/antdMessage";
import axiosInstance from "../../api";

const { Text } = Typography;

const GitHubCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        const error = params.get("error");

        if (error) {
          antdError(`GitHub authorization failed: ${error}`);
          navigate("/login");
          return;
        }

        if (!code) {
          antdError("Authorization code not found.");
          navigate("/login");
          return;
        }

        // Exchange code for access token via backend (avoid CORS issues)
        const tokenResponse = await axiosInstance.post("/github/exchange-token", {
          code,
          redirect_uri: process.env.REACT_APP_GITHUB_REDIRECT_URI,
        });

        const { access_token } = tokenResponse.data;

        if (!access_token) {
          antdError("Failed to obtain GitHub access token.");
          navigate("/login");
          return;
        }

        // Send access token to parent window
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            {
              type: "github_auth_success",
              access_token,
            },
            window.location.origin
          );
        }

        // Close popup after message is sent
        setTimeout(() => {
          window.close();
        }, 100);
      } catch (err) {
        console.error("GitHub callback error:", err);
        antdError(err.response?.data?.error || "GitHub login failed. Please try again.");
        navigate("/login");
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Text type="secondary">Completing GitHub authentication...</Text>
    </div>
  );
};

export default GitHubCallback;
