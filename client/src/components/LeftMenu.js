import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const LeftMenu = () => {
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Link to="/">Home</Link>
        </Menu.Item>
        <SubMenu title={<span>HW5</span>}>
          <MenuItemGroup>
            <Menu.Item key="method">
              <a href="https://cse134b-hw4-d072f.web.app/methodtest.html">
                Methods Test
              </a>
            </Menu.Item>
            <Menu.Item key="method">
              <Link to="/dashboard">CRUD With Firebase</Link>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="about">
          <Link to="/about">About Me</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};
export default LeftMenu;
