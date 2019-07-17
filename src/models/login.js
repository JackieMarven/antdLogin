import { login as loginService } from "../services/coreApi";

export default {
  namepace: "login",
  state: {
    status: undefined
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.log(1111, payload);
      // 调用接口， payload 传递数据
      const response = yield call(loginService.accountLogin, payload);
      console.log(response);
      yield put({
        type: "changeLoginStatus",
        payload: response
      });
      if (response === "ok") {
        yield put("/");
      }
    }
  }
};
