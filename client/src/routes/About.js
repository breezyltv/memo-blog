import React from "react";

import { Divider, Row, Col } from "antd";
import ResumeHeader from "../components/ResumeHeader";
import ResumeIntro from "../components/ResumeIntro";
import ResumeHobby from "../components/ResumeHobby";
import ResumeSocial from "../components/ResumeSocial";

const About = () => {
  return (
    <Row justify="center" align="top">
      <Col sm={24} lg={20}>
        <div className="site-layout-content shadow-lg">
          <ResumeHeader />
          <Divider />
          <ResumeIntro />
          <Divider />
          <ResumeHobby />
          <Divider />
          <ResumeSocial />
        </div>
      </Col>
    </Row>
  );
};

export default About;
