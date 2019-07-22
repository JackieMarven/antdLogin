export default (request, errorHandler) => {
  const ROUTE = "login ";

  const accountLogin = async params => {
    try {
      // post 参数分别为地址, 传参, 头
      const data = await request(ROUTE).post("", params);
      console.log("data:::::", data);
      return data;
    } catch (error) {
      errorHandler(error);
    }
  };

  return { accountLogin };
};
