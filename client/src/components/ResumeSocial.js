import React from "react";
import { Row, Col, Space, Button } from "antd";
import {
  InstagramOutlined,
  LinkedinOutlined,
  GithubOutlined
} from "@ant-design/icons";

const ResumeSocial = () => {
  return (
    <>
      <div className="resume-social-list">
        <Row>
          <Col span={20} offset={2} style={{ textAlign: "center" }}>
            <Space wrap>
              <Button
                type="link"
                icon={<GithubOutlined />}
                onClick={() =>
                  window.location.assign("https://github.com/breezyltv")
                }
              >
                github.com/breezyltv
              </Button>
              <Button type="link" icon={<LinkedinOutlined />}>
                linkedin.com/in/username
              </Button>
              <Button type="link" icon={<InstagramOutlined />}>
                @username
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ResumeSocial;
