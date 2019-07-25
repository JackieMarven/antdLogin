export default (request, errorHandler) => {
  const ROUTE = "user";

  const accountLogin = async params => {
    try {
      // post 参数分别为地址, 传参, 头
      const data = await request(ROUTE).post("/login", params);
      console.log(111111);
      if (data) {
        return "ok";
      }
      return data;
    } catch (error) {
      errorHandler(error);
    }
  };

  return { accountLogin };
};
