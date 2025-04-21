import { message } from "antd";

let messageApi = null;

const initMessage = () => {
  const [api, contextHolder] = message.useMessage();
  messageApi = api;
  return contextHolder;
};

const antdSuccess = (msg) => {
  messageApi?.open({
    type: "success",
    content: msg,
  });
};

const antdError = (msg) => {
  messageApi?.open({
    type: "error",
    content: msg,
  });
};

const antdwarning = (msg) => {
  messageApi?.open({
    type: "warning",
    content: msg,
  });
};

export { initMessage, antdSuccess, antdError, antdwarning };
