import axios from "axios";
import get from "lodash/get";
import loginRoute from "./routes/login";

const { API_BASE_URL } = process.env;

const request = route => {
  return axios.create({
    baseURL: `${API_BASE_URL}${route}`, // 请求后台基本路径
    withCredentials: true // 跨域请求是否提供凭据信息(cookie等),默认是 false
  });
};

const errorHandler = error => {
  const status = get(error, "response.status");
  const data = get(error, "response.data");

  switch (status) {
    case 500:
      throw {
        message: data.message,
        type: "Unknown Server Error",
        code: status
      };
    case 404:
      throw {
        message: data.message,
        type: "Not Found",
        code: status
      };
    case 401:
      throw {
        message: data.message,
        type: "Session Expired",
        code: status
      };
    case 400:
      throw {
        message: data.message,
        type: "Valdation Error",
        code: status
      };
    default:
      throw {
        message: "對不起，我們伺服器錯誤。",
        type: "Unknown Error",
        code: status
      };
  }
};

const login = loginRoute(request, errorHandler);

export { login };
