import React, { useRef, useState, useEffect } from "react";
import { Button, Card, Divider } from "antd";

import CropAvatar from "./CropAvatar";

import { useSelector, useDispatch } from "react-redux";
import { fetchAccountBooksCount } from "../../store/reducers/accountBookThunk";
import { fetchTransactionsCount } from "../../store/reducers/transactionThunk";
import { fetchSavingsPlansCount } from "../../store/reducers/savingsPlanThunk";
import { fetchDepositsCount } from "../../store/reducers/depositThunk";
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
  const defaultAvatar = require("../../assets/imgs/penny-wave-logo.png");

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(
    avatarURL ? `${process.env.REACT_APP_API_URL}${avatarURL}` : defaultAvatar
  );
  const [objectUrl, setObjectUrl] = useState(null);

  const [cropModalVisible, setCropModalVisible] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);

  const [accountBookCount, setAccountBookCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [savingsPlanCount, setSavingsPlanCount] = useState(0);
  const [depositCount, setDepositCount] = useState(0);

  useEffect(() => {
    setAccountBookCount(dispatch(fetchAccountBooksCount()));
    setTransactionCount(dispatch(fetchTransactionsCount()));
    setSavingsPlanCount(dispatch(fetchSavingsPlansCount()));
    setDepositCount(dispatch(fetchDepositsCount()));
  }, [dispatch]);

  const uploadAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      antdError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      antdError("Image size should be less than 5MB");
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setOriginalImage(localUrl);
    setCropModalVisible(true);

    event.target.value = "";
  };

  const handleCropComplete = async (croppedImageBlob) => {
    try {
      const croppedImageUrl = URL.createObjectURL(croppedImageBlob);
      setPreview(croppedImageUrl);
      setObjectUrl(croppedImageUrl);

      const formData = new FormData();
      formData.append("image", croppedImageBlob);

      const res = await axiosInstance.post(
        "/upload-avatar",
        formData
        // {        headers: { email },      }
      );

      const { avatarURL } = res.data;
      setPreview(`${process.env.REACT_APP_API_URL}${avatarURL}`);

      dispatch(updateUserAvatar(avatarURL));
      antdSuccess("Avatar uploaded successfully!");

      setCropModalVisible(false);
      if (originalImage) {
        URL.revokeObjectURL(originalImage);
        setOriginalImage(null);
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      antdError("Failed to upload avatar. Please try again.");
    }
  };

  const handleCropCancel = () => {
    setCropModalVisible(false);
    if (originalImage) {
      URL.revokeObjectURL(originalImage);
      setOriginalImage(null);
    }
  };

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      if (originalImage) {
        URL.revokeObjectURL(originalImage);
      }
    };
  }, [objectUrl, originalImage]);

  return (
    <>
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

          <p>
            <span className="profile-log-info-title"># of savings plans</span>
            <span className="profile-log-info-detail">{savingsPlanCount}</span>
          </p>

          <p>
            <span className="profile-log-info-title"># of deposits</span>
            <span className="profile-log-info-detail">{depositCount}</span>
          </p>
        </div>
      </Card>

      <CropAvatar
        visible={cropModalVisible}
        originalImage={originalImage}
        onCancel={handleCropCancel}
        onCropComplete={handleCropComplete}
      />
    </>
  );
};

export default UserInfoCard;
