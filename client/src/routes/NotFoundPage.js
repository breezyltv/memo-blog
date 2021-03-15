import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const NotFoundPage = () => {
  return (
    <Row justify="center" align="top">
      <Col sm={24} lg={20}>
        <div className="notfoundpage">
          <h2>Look like you're lost</h2>
          <p class="zoom-area">
            <b>the page</b> you are looking for not avaible!{" "}
          </p>

          <section class="error-container">
            <span>4</span>
            <span>
              <span class="screen-reader-text">0</span>
            </span>
            <span>4</span>
          </section>
          <Link to="/" className="more-link">
            Go To Home
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default NotFoundPage;
