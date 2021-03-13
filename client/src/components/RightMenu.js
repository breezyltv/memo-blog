import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import {
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import { Menu, Avatar, Image, Button } from "antd";
import { logout } from "../lib/firebaseHelper";
import ava from "../img/author.jpg";

const RightMenu = () => {
  const history = useHistory();
  //get current user
  const { currentUser } = useContext(AuthContext);

  let fullName = "Vu Le";

  const logoutUser = () => {
    logout()
      .then(() => {
        console.log("logout ok");
        history.push("/login");
      })
      .catch(error => console.log(error.messages));
  };

  const authMenu = (
    <Menu mode="horizontal">
      <Menu.Item key="account">
        <Avatar src={<Image src={ava} />} /> {fullName}
      </Menu.Item>
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>

      <Button onClick={logoutUser}>
        <LogoutOutlined />
        Logout
      </Button>
    </Menu>
  );

  const guestMenu = (
    <Menu mode="horizontal">
      <Menu.Item key="mail" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );

  return <>{currentUser ? authMenu : guestMenu}</>;
};
export default RightMenu;
