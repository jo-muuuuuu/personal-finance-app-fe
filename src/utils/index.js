const setToken = (token, expireMins) => {
  const expireTime = new Date().getTime() + expireMins * 60 * 1000;
  const tokenData = { token, expireTime };

  localStorage.setItem("token", JSON.stringify(tokenData));
};

const getToken = () => {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  if (!tokenData) return null;

  const currentTime = new Date().getTime();
  if (currentTime > tokenData.expireTime) {
    localStorage.removeItem("token");
    return null;
  }

  return tokenData.token;
};

export { setToken, getToken };
