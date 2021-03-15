import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebaseconfig";
import { Layout, Row, Col, Typography, Space, Tag } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { commonTags, randomChoiceArr, upperCaseString } from "../utils/common";
const { Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const FooterLayout = () => {
  const [newestArticle, setNewestArticle] = useState();
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const users = await db.collection("users").get();
    let list = [];
    try {
      for (const user of users.docs) {
        const articles = await db
          .collection("users")
          .doc(user.id)
          .collection("articles")
          .orderBy("date", "desc")
          .limit(5)
          .get();
        articles.forEach(doc => {
          list.push({
            uid: user.id,
            id: doc.id,
            article_name: doc.data().article_name
          });
        });
      }
      //console.log(list);
      setNewestArticle(list);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
    // Promise:
    // db.collection("users")
    //   .get()
    //   .then(querySnapshot => {
    //     let list = [];
    //     querySnapshot.forEach(doc => {
    //       db.collection("users")
    //         .doc(doc.id)
    //         .collection("blogs")
    //         .orderBy("date", "desc")
    //         .limit(5)
    //         .get()
    //         .then(querySnapshot => {
    //           querySnapshot.forEach(doc => {
    //             // doc.data() is never undefined for query doc snapshots
    //             //console.log(doc.id, " => ", doc.data());
    //             list.push({
    //               id: doc.id,
    //               article_name: doc.data().article_name
    //             });
    //           });
    //         });
    //     });
    //     //console.log(list);
    //     setNewestArticle(list);
    //     console.log(newestArticle);
    //   })
    //   .catch(error => {
    //     console.log("Error getting documents: ", error);
    //   });
  };

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
          <div className="newest-post">
            <Typography>
              <Title level={4}>Recent Articles</Title>
              <Space direction="vertical">
                {newestArticle &&
                  newestArticle.map(item => (
                    <Link key={item.id} to={`/articles/${item.uid}/${item.id}`}>
                      <CaretRightOutlined size={12} />{" "}
                      {upperCaseString(item.article_name)}
                    </Link>
                  ))}
              </Space>
            </Typography>
          </div>
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
