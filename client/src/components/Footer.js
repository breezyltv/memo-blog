import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseconfig";
import { Layout, Row, Col, Typography, Space, Tag } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { commonTags, randomChoiceArr, upperCaseString } from "../utils/common";
import { getNewestArticles } from "../lib/firebaseHelper";
const { Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const FooterLayout = () => {
  const [newestArticle, setNewestArticle] = useState();
  useEffect(() => {
    // .get()
    // .then(querySnapshot => {
    //   console.log(querySnapshot.data());
    // })
    // .catch(error => {
    //   console.log("Error getting documents: ", error);
    // });
  }, []);

  return (
    <Footer>
      <Row gutter={[15, 15]}>
        <Col sm={24} lg={8}>
          <Typography>
            <Title level={4}>About</Title>
            <Paragraph>
              I'm a web developer in San Diego, I've been excited in building
              websites and web applications.
            </Paragraph>
            <Paragraph>
              We help clients solve business problems by fusing creativity,
              innovation, strategy, and craft.
            </Paragraph>
            <Text>Vu Creation ©2021 Created by Vu Le</Text>
          </Typography>
        </Col>
        <Col sm={24} lg={7}>
          <Typography>
            <Title level={4}>Recent Projects</Title>
            <Space direction="vertical">
              {newestArticle &&
                newestArticle.map(item => {
                  <Text>
                    <CaretRightOutlined size={12} />
                    {item.article_name}
                  </Text>;
                })}
            </Space>
          </Typography>
        </Col>
        <Col sm={24} lg={8}>
          <Typography>
            <Title level={4}>Tags</Title>
          </Typography>
          <Space wrap>
            {randomChoiceArr(commonTags, 25).map(item => (
              <Tag>{item}</Tag>
            ))}
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterLayout;
