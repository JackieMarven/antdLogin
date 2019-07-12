import React from "react";
import classNames from "classnames";
import { Button, Form } from "antd";
import "./index.less";

const FormItem = Form.Item;

const LoginSubmit = ({ className, ...rest }) => {
  const clsString = classNames("submit", className);
  return (
    <FormItem>
      <Button
        size="large"
        className={clsString}
        type="primary"
        htmlType="submit"
        {...rest}
      ></Button>
    </FormItem>
  );
};

export default LoginSubmit;
