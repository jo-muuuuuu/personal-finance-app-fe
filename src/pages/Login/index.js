// import React, { useEffect } from "react";
// import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import {
//   LockOutlined,
//   UserOutlined,
//   GoogleOutlined,
//   GithubOutlined,
//   LinkedinOutlined,
// } from "@ant-design/icons";
// import { Card, Button, Checkbox, Form, Input, Flex, Divider } from "antd";

// import { useDispatch } from "react-redux";
// import { userLogin, userGoogleLogin } from "../../store/reducers/userInfoThunk";

// import PennyWaveFontBlue from "../../assets/imgs/penny-wave-font-blue.png";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const forgotPasswordNavigate = () => {
//     navigate("/forgot-password");
//   };

//   const registerNavigate = () => {
//     navigate("/register");
//   };

//   const onFinish = (values) => {
//     // console.log("Received values of form: ", values);
//     dispatch(userLogin(values, navigate));
//   };

//   // const googleLogin = useGoogleLogin({
//   //   onSuccess: (tokenResponse) => {
//   //     // console.log(tokenResponse);
//   //     dispatch(userGoogleLogin(tokenResponse, navigate));
//   //   },
//   //   onError: () => {
//   //     console.log("Login Failed");
//   //   },
//   // });

//   // useEffect(() => {
//   //   /* global google */
//   //   if (window.google) {
//   //     google.accounts.id.initialize({
//   //       client_id: process.env.GOOGLE_CLIENT_ID,
//   //       callback: (credentialResponse) => {
//   //         dispatch(userGoogleLogin(credentialResponse, navigate));
//   //       },
//   //     });
//   //   }
//   // }, [dispatch, navigate]);

//   // const handleGoogleLogin = () => {
//   //   /* global google */
//   //   google.accounts.id.prompt();
//   // };

//   return (
//     <div className="login-container">
//       <Card className="login-card" variant="borderless" style={{ width: 500 }}>
//         <div style={{ textAlign: "center" }}>
//           <img
//             src={PennyWaveFontBlue}
//             style={{ marginBottom: "1.5rem", height: "4rem" }}
//           />
//         </div>

//         <Form
//           className="login-form"
//           name="login"
//           initialValues={{ remember: true }}
//           style={{ maxWidth: 360 }}
//           onFinish={onFinish}
//         >
//           <Form.Item
//             name="email"
//             rules={[{ required: true, message: "Please input your E-mail!" }]}
//           >
//             <Input prefix={<UserOutlined />} placeholder="E-mail" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: "Please input your Password!" }]}
//           >
//             <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
//           </Form.Item>
//           <Form.Item>
//             <Flex justify="space-between" align="center">
//               <Form.Item name="remember" valuePropName="checked" noStyle>
//                 <Checkbox>Remember me</Checkbox>
//               </Form.Item>
//               <a onClick={forgotPasswordNavigate}>Forgot password</a>
//             </Flex>
//           </Form.Item>

//           <Form.Item>
//             <Button block type="primary" htmlType="submit">
//               Log in
//             </Button>
//             or <a onClick={registerNavigate}>Register now!</a>
//           </Form.Item>
//         </Form>
//         <Divider style={{ color: "#1677ff" }}>OTHER OPTIONS</Divider>

//         <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//           {/* <GoogleOutlined
//               onClick={handleGoogleLogin}
//               style={{ fontSize: "1.5rem", cursor: "pointer", color: "#1677ff" }}
//             /> */}
//           <GoogleLogin
//             onSuccess={(credentialResponse) => {
//               console.log(credentialResponse);
//               dispatch(userGoogleLogin(credentialResponse, navigate));
//             }}
//             onError={() => {
//               console.log("Login Failed");
//             }}
//           />
//           {/* <GoogleOutlined style={{ color: "#1677ff", fontSize: "1.5rem" }} /> */}
//         </GoogleOAuthProvider>
//         {/*
//           <GithubOutlined style={{ color: "#1677ff" }} />
//           <LinkedinOutlined style={{ color: "#1677ff" }} /> */}
//       </Card>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Button, Checkbox, Form, Input, Flex, Divider } from "antd";

import { useDispatch } from "react-redux";
import { userLogin } from "../../store/reducers/userInfoThunk";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "../../components/ThirdPartyLogin/GoogleLoginButton";
import GitHubLoginButton from "../../components/ThirdPartyLogin/GitHubLoginButton";

import PennyWaveFontBlue from "../../assets/imgs/penny-wave-font-blue.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const forgotPasswordNavigate = () => {
    navigate("/forgot-password");
  };

  const registerNavigate = () => {
    navigate("/register");
  };

  const onFinish = (values) => {
    dispatch(userLogin(values, navigate));
  };

  return (
    <div className="login-container">
      <Card className="login-card" variant="borderless" style={{ width: 500 }}>
        <div style={{ textAlign: "center" }}>
          <img
            src={PennyWaveFontBlue}
            style={{ marginBottom: "1.5rem", height: "4rem" }}
            alt="PennyWave"
          />
        </div>

        <Form
          className="login-form"
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your E-mail!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a onClick={forgotPasswordNavigate}>Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            or <a onClick={registerNavigate}>Register now!</a>
          </Form.Item>
        </Form>

        <Divider style={{ color: "#1677ff" }}>OTHER OPTIONS</Divider>

        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLoginButton />
          </GoogleOAuthProvider>

          <GitHubLoginButton />
        </div>
      </Card>
    </div>
  );
};

export default Login;
