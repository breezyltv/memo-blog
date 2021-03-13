import React from "react";
import { Typography, Row, Col, Space } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  GithubOutlined
} from "@ant-design/icons";
const { Title, Text } = Typography;
const ResumeHeader = () => {
  return (
    <>
      <Row>
        <Col sm={24} md={12} lg={18}>
          <Space direction="vertical">
            <div className="resume-name">
              <Title level={2}>Vu Le</Title>
            </div>
            <div className="resume-tagline">
              <Text>Intern</Text>
            </div>
            <div className="resume-tagline">
              <Text>Full-stack Web Developer</Text>
            </div>
          </Space>
        </Col>

        <Col sm={24} md={12} lg={6}>
          <div className="resume-contact">
            <Space direction="vertical">
              <Text>
                <PhoneOutlined /> 858-465-90xx
              </Text>

              <Text>
                <MailOutlined />
                kevinlethevu@gmail.com
              </Text>
              <Text>
                <GithubOutlined />
                <a href="https://github.com/breezyltv">
                  https://github.com/breezyltv
                </a>
              </Text>
              <Text>
                <EnvironmentOutlined />
                San Diego, CA 92131
              </Text>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ResumeHeader;
