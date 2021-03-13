import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Alert,
  AutoComplete,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Typography
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { loginByEmail } from "../lib/firebaseHelper";
import { domains } from "../utils/common";

const spinIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const Login = () => {
  const { Text } = Typography;
  const history = useHistory();
  //get current user
  const { currentUser, loadingAuth } = useContext(AuthContext);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    //check if user already logged
    if (!loadingAuth) {
      currentUser ? history.push("/dashboard") : history.push("/login");
    }
  }, [currentUser, loadingAuth]);

  const onFinish = userData => {
    setLoading(true);
    loginByEmail(userData.email, userData.password)
      .then(() => history.push("/dashboard"))
      .catch(error => {
        setLoading(false);
        console.log(error.message);
        setError(error.message);
      });
  };

  const onEmailChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(domains.map(domain => `${value}${"@" + domain}`));
    }
  };

  const emailOptions = autoCompleteResult.map(email => ({
    label: email,
    value: email
  }));

  //removing error alert from backend when input has been on change
  const onInputChange = () => {
    if (error.length > 0) {
      setError("");
    }
  };
  if (loadingAuth)
    return (
      <Spin className="lazyContent" tip="Loading..." indicator={spinIcon} />
    );
  return (
    <Row justify="center" align="top">
      <Col sm={12} md={12} lg={12} xl={8}>
        <div className="card-form ">
          <Card title="Log In" bordered={false}>
            <Space direction="vertical">
              <Text strong>Use email and pass below to login:</Text>
              <Text mark>Email: cse135grader@ucsd.edu</Text>
              <Text mark>Pass: winter2021hw5</Text>
            </Space>
            <Divider />
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                hasFeedback
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your email!"
                  }
                ]}
              >
                <AutoComplete options={emailOptions} onChange={onEmailChange}>
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="email"
                    onChange={() => onInputChange()}
                  />
                </AutoComplete>
              </Form.Item>

              <Form.Item
                name="password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!"
                  }
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onChange={value => onInputChange(value, "password")}
                />
              </Form.Item>

              {error && <Alert message={error} type="error" showIcon />}
              <Divider />
              <Form.Item>
                <Button
                  type="primary"
                  loading={loading}
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  Log in
                </Button>{" "}
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
