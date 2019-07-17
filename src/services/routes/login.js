export default (request, errorHandler) => {
  const ROUTE = "login ";

  const accountLogin = async params => {
    try {
      const { accountData } = params;
      // post 参数分别为地址, 传参, 头
      const data = await request(ROUTE).post("", accountData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return data;
    } catch (error) {
      errorHandler(error);
    }
  };

  return { accountLogin };
};
