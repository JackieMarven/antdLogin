import { login as loginService } from "../services/coreApi";
import { withRouter } from "next/router";

const model = {
  namespace: "login",
  state: {
    status: undefined
  },
  effects: {
    *login({ payload = {} }, { call, put }) {
      try {
        // 调用接口, payload 传递数据
        const response = yield call(loginService.accountLogin, payload);
        // 解决这个问题
        // yield put({
        //   status: "changeLoginStatus",
        //   payload: response
        // });
        if (response === "ok") {
          yield put(withRouter.push("/"));
        }
      } catch (error) {
        console.log("error::::", error);
      }
    }
  }
};

const slectors = {
  getStatus: state => state[model.namepace].status
};

export default { model, slectors };
