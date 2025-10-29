import React, { useRef, useState, useEffect } from "react";
import { Button, Card, Divider } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { updateUserAvatar } from "../../store/reducers/userInfoSlice";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import axiosInstance from "../../api";
import "./index.css";

const UserInfoCard = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.userInfo.userEmail);
  const nickname = useSelector((state) => state.userInfo.userNickname);
  const avatarURL = useSelector((state) => state.userInfo.userAvatarURL);

  // default avatar url
  const defaultAvatar = require("../../assets/imgs/kira.jpeg");

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(
    avatarURL ? `${process.env.REACT_APP_API_URL}${avatarURL}` : defaultAvatar
  );
  const [objectUrl, setObjectUrl] = useState(null);

  const accountBookCount = useSelector(
    (state) => state.accountBook.accountBookList.length
  );
  const transactionCount = useSelector(
    (state) => state.transaction.transactionList.length
  );

  const uploadAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setObjectUrl(localUrl);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosInstance.post("/upload-avatar", formData, {
        headers: { email },
      });

      const { avatarURL } = res.data;
      setPreview(`${process.env.REACT_APP_API_URL}${avatarURL}`);

      dispatch(updateUserAvatar(avatarURL));
      antdSuccess("Avatar uploaded successfully!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      antdError("Failed to upload avatar. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  return (
    <Card className="profile-card" variant="borderless">
      <div className="profile-user-info">
        <img src={preview} alt="user avatar" />

        <div className="profile-user-name">
          <p>{nickname}</p>
          <Button type="primary" className="blue-button" onClick={uploadAvatarClick}>
            Upload Avatar
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <Divider />

      <div className="profile-log-info">
        <p>
          <span className="profile-log-info-title">Email</span>
          <span className="profile-log-info-detail">{email}</span>
        </p>

        <p>
          <span className="profile-log-info-title"># of account books</span>
          <span className="profile-log-info-detail">{accountBookCount}</span>
        </p>

        <p>
          <span className="profile-log-info-title"># of transactions</span>
          <span className="profile-log-info-detail">{transactionCount}</span>
        </p>
      </div>
    </Card>
  );
};

export default UserInfoCard;
