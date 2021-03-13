import { Avatar, Col, Image, Row, Typography } from "antd";
import React from "react";
import ava from "../img/author.jpg";
const { Paragraph } = Typography;
const ResumeIntro = () => {
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={6} lg={4}>
          <Avatar size={120} src={<Image src={ava} />} />
        </Col>

        <Col xs={24} sm={24} md={18} lg={20}>
          <div className="resume-intro">
            <Typography>
              <Paragraph>
                I’ve always sought out opportunities and challenges that are
                meaningful to me. As a web developer, I love to learn and
                creatively solve problems. Seeking a position as a Full Stack
                Developer to further enhance organizational worth by leveraging
                my skills and knowledge in Front-end and Back-end development,
                Responsive frameworks, Coding, Designing and maintaining
                Databases to enhance the client experience.
              </Paragraph>
            </Typography>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ResumeIntro;
