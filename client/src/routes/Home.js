import React, { useEffect, useState } from "react";
import { Row, Col, Skeleton, BackTop } from "antd";
import ArticleItem from "../components/ArticleItem";
import { db } from "../config/firebaseconfig";
const Home = () => {
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    setLoading(true);
    const users = await db.collection("users").get();
    let list = [];
    try {
      for (const user of users.docs) {
        const articles = await db
          .collection("users")
          .doc(user.id)
          .collection("articles")
          .orderBy("date", "desc")
          .limit(10)
          .get();
        articles.forEach(doc => {
          list.push({
            user: {
              uid: user.id,
              data: user.data()
            },
            article: {
              id: doc.id,
              data: doc.data()
            }
          });
        });
      }
      //console.log(list);
      setLoading(false);
      setArticles(list);
    } catch (error) {
      setLoading(false);
      console.log("Error getting documents: ", error);
    }
  };

  let listArticles;

  if (loading) {
    listArticles = <Skeleton active paragraph={{ rows: 4 }} />;
  } else {
    listArticles = (
      <div className="article ">
        {articles && articles.map(item => <ArticleItem item={item} />)}
      </div>
    );
  }

  return (
    <Row justify="center" align="top">
      <BackTop />
      <Col sm={24} lg={24}>
        <div class="banner wrapper">
          <h1>Explore new perspectives</h1>
        </div>
      </Col>
      <Col sm={24} lg={14}>
        {listArticles}
      </Col>
    </Row>
  );
};

export default Home;
