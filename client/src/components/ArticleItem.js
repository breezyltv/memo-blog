import React from "react";
import { upperCaseString, upperFirstChar } from "../utils/common";
import { Row, Col, Skeleton, Typography } from "antd";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import Moment from "react-moment";
const { Title, Paragraph, Text } = Typography;

const ArticleItem = ({ item }) => {
  let fullName =
    upperFirstChar(item.user.data.first_name) +
    " " +
    upperFirstChar(item.user.data.last_name);
  const params = `/articles/${item.user.uid}/${item.article.id}`;
  return (
    <Row className="article-item" gutter={[15, 10]}>
      <Col sm={24} lg={8}>
        <Link to={params}>
          <div className="empty-img">
            <Skeleton.Image />
          </div>
        </Link>
      </Col>
      <Col sm={24} lg={16}>
        <aside className="article-aside">
          <Typography>
            <Link to={params}>
              <Title level={4} ellipsis={{ rows: 2 }}>
                {upperCaseString(item.article.data.article_name)}
              </Title>
            </Link>
            <Paragraph ellipsis={{ rows: 4 }}>
              {upperFirstChar(item.article.data.article_body)}
            </Paragraph>
          </Typography>
          <hr />
          <div className="article-meta">
            <Text>
              <i>
                <Moment fromNow>{item.article.data.date.toDate()}</Moment> -
                Posted By: {fullName}
              </i>
            </Text>
          </div>
          <Link to={params} className="more-link">
            Read More <ArrowRightOutlined />
          </Link>
        </aside>
      </Col>
    </Row>
  );
};

export default ArticleItem;
