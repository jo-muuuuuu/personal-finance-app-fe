import axiosInstance from "../../api";
import { setToken } from "../../utils";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setUserInfo } from "./userInfoSlice";

export const userLogin = (values, navigate) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/login`, values);

    if (response.status === 200) {
      const { userId, nickname, email, avatarURL, token } = response.data;
      setToken(token, 60);
      dispatch(setUserInfo({ userId, nickname, email, avatarURL }));

      antdSuccess("Login successful!");
      navigate("/");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);

      if (error.response.status === 401) {
        antdError("Invalid email or password");
      } else if (error.response.status === 500) {
        antdError("Server error, please try again later");
      }
    } else {
      antdError("An error occurred: " + error.message);
    }
  }
};

export const userRegister = (values, navigate) => async () => {
  try {
    const response = await axiosInstance.post("/register", values);

    if (response.status === 200) {
      antdSuccess("Success!");
      navigate("/login");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        antdError("Email already exists!");
      } else if (error.response.status === 500) {
        antdError("Server error, please try again later");
      }
    } else {
      antdError("Failed to register!");
    }
  }
};

export const userForgotPassword = (values, navigate) => async () => {
  try {
    const response = await axiosInstance.post(`/forgot-password`, values);

    if (response.status === 200) {
      antdSuccess("Please check your email for password reset link!");

      navigate("/login");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);

      if (error.response.status === 401) {
        antdError("Invalid email or password");
      } else if (error.response.status === 500) {
        antdError("Server error, please try again later");
      }
    } else {
      antdError("An error occurred: " + error.message);
    }
  }
};

export const userValidateResetToken = (token) => async () => {
  try {
    const response = await axiosInstance.get(`/validate-token`, {
      params: { token },
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Error validating token:", error);

    if (error.response && error.response.status === 500) {
      antdError("Server error, please try again later");
    } else {
      antdError("An error occurred: " + error.message);
    }
  }
};

export const userResetPassword = (token, values, navigate) => async () => {
  try {
    const response = await axiosInstance.post(`/reset-password`, {
      token,
      newPassword: values.password,
    });

    if (response.status === 200) {
      antdSuccess("Password reset successful!");
      navigate("/login");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);

      if (error.response.status === 401) {
        antdError("Invalid email or password");
      } else if (error.response.status === 500) {
        antdError("Server error, please try again later");
      }
    } else {
      antdError("An error occurred: " + error.message);
    }
  }
};

export const userGoogleLogin = (googleToken, navigate) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/google-login`, {
      access_token: googleToken.access_token,
    });

    if (response.status === 200) {
      const { userId, nickname, email, avatarURL, token } = response.data;
      setToken(token, 60);
      dispatch(setUserInfo({ userId, nickname, email, avatarURL }));

      antdSuccess("Login successful!");
      navigate("/");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      antdError("Google login failed, please try again.");
    }
  }
};

export const userGitHubLogin = (accessToken, navigate) => {
  return async (dispatch) => {
    // dispatch(userSlice.actions.setLoading(true));

    try {
      const response = await axiosInstance.post(
        `/github-login`,
        { access_token: accessToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("GitHub login response:", response.data);

      if (response.status === 200) {
        const { userId, nickname, email, avatarURL, token } = response.data;
        setToken(token, 60);
        dispatch(setUserInfo({ userId, nickname, email, avatarURL }));

        antdSuccess("Success!");
        navigate("/");
      }
    } catch (error) {
      console.error("GitHub login error:", error);

      let errorMessage = "GitHub login failed, please try again.";
      if (error.response) {
        errorMessage = error.response.data?.error || errorMessage;
      }

      antdError(errorMessage);
      // dispatch(userSlice.actions.setError(errorMessage));
    }
  };
};
