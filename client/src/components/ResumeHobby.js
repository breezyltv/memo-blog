import React from "react";
import { Typography, Row, Col, Space } from "antd";
import { SmileOutlined, MehOutlined, HeartOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
const ResumeHobby = () => {
  return (
    <>
      <Row gutter={[0, 15]}>
        <Col xs={24} sm={8} lg={9}>
          <div className="resume-section-heading">
            <Title level={2}>Goals</Title>
          </div>
          <Space direction="vertical">
            <Text>
              <SmileOutlined size={12} /> To be better organized
            </Text>
            <Text>
              <SmileOutlined size={12} /> Spend more time with family and
              friends
            </Text>
            <Text>
              <SmileOutlined size={12} /> More automated process
            </Text>
            <Text>
              <SmileOutlined size={12} /> To keep track everything
            </Text>
          </Space>
        </Col>
        <Col xs={24} sm={8} lg={9}>
          <div className="resume-section-heading">
            <Title level={2}>Frustrations</Title>
          </div>
          <Space direction="vertical">
            <Text>
              <MehOutlined size={12} /> Inconsistency
            </Text>
            <Text>
              <MehOutlined size={12} /> Deadlines
            </Text>
            <Text>
              <MehOutlined size={12} /> Expectations are not clear
            </Text>
            <Text>
              <MehOutlined size={12} /> To many processual steps
            </Text>
          </Space>
        </Col>
        <Col xs={24} sm={8} lg={6}>
          <div className="resume-section-heading">
            <Title level={2}>Interest</Title>
          </div>
          <Space direction="vertical">
            <Text>
              <HeartOutlined size={12} /> Traveling
            </Text>
            <Text>
              <HeartOutlined size={12} /> Yummy Foods
            </Text>
            <Text>
              <HeartOutlined size={12} /> Anime/manga/manhhua/manhwa
            </Text>
            <Text>
              <HeartOutlined size={12} /> Movies
            </Text>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default ResumeHobby;
