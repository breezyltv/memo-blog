import React, { useEffect, useState } from "react";
import { upperCaseString, upperFirstChar } from "../utils/common";
import { Row, Col, Skeleton, Typography, Divider, Empty } from "antd";
import { db } from "../config/firebaseconfig";
import Moment from "react-moment";
const { Title, Paragraph, Text } = Typography;
const Detail = props => {
  const { params } = props.match;
  //console.log(props);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  let articleView;

  useEffect(() => {
    getArticle();
  }, [params.article_id]);

  const getArticle = async () => {
    setLoading(true);
    try {
      const user = db.collection("users").doc(params.uid);

      const articleData = await user
        .collection("articles")
        .doc(params.article_id)
        .get();
      if (articleData.exists) {
        const userData = await user.get();
        setArticle({
          article: articleData.data(),
          user: userData.data()
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getting documents: ", error);
    }
  };

  if (loading) {
    articleView = <Skeleton active paragraph={{ rows: 4 }} />;
  } else {
    if (article !== null) {
      articleView = (
        <div className="article-detail">
          <div className="empty-img">
            <Skeleton.Image />
          </div>
          <div className="detail-body">
            <Typography>
              <Title level={3}>
                {upperCaseString(article.article.article_name)}
              </Title>
              <Paragraph>
                {upperFirstChar(article.article.article_body)}
              </Paragraph>
            </Typography>
            <Divider />
            <div className="article-meta">
              <Text>
                <i>
                  <Moment format="MMM DD YYYY">
                    {article.article.date.toDate()}
                  </Moment>{" "}
                  - Posted By:{" "}
                  {upperFirstChar(article.user.first_name) +
                    " " +
                    upperFirstChar(article.user.last_name)}
                </i>
              </Text>
            </div>
          </div>
        </div>
      );
    } else {
      articleView = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
  }

  return (
    <Row justify="center" align="top">
      <Col sm={24} lg={14}>
        {articleView}
      </Col>
    </Row>
  );
};

export default Detail;
