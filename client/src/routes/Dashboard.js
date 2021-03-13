import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import {
  Divider,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Table,
  Tooltip,
  Modal
} from "antd";
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";

import NewModal from "../components/NewModal";
import { getAllArticles, deleteArticles } from "../lib/firebaseHelper";

const { Title, Text } = Typography;
const { confirm } = Modal;
const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [loadTable, setLoadTable] = useState(false);
  const [articlesData, setArticlesData] = useState();
  const [action, setAction] = useState({
    method: "add",
    title: "Add an Article"
  });
  //const [modalView, setModalView] = useState();

  const columns = [
    {
      title: "Title",
      dataIndex: "article_name",
      key: "article_name"
    },
    {
      title: "Summary",
      dataIndex: "article_body",
      key: "article_body"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: text => (
        <Text>
          {text.toDate().toLocaleDateString()}{" "}
          {text.toDate().toLocaleTimeString()}
        </Text>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip placement="top" title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleUpdate(record)}
            ></Button>
          </Tooltip>
          <Tooltip placement="top" title="Delete">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            ></Button>
          </Tooltip>
        </Space>
      )
    }
  ];

  useEffect(() => {
    showArticles();
  }, []);

  const showArticles = () => {
    setLoadTable(true);
    getAllArticles(currentUser.email)
      .orderBy("date", "desc")
      .onSnapshot(snapshot => {
        let articles = [];
        snapshot.forEach(article => {
          articles.push({
            ...article.data(),
            id: article.id
          });
        });
        setLoadTable(false);
        //console.log(articles);
        setArticlesData(articles);
      });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAdd = () => {
    setAction({ method: "Add", title: "Add an Article" });
    showModal();
  };

  const handleUpdate = data => {
    let fields = [];
    for (const key in data) {
      fields.push({
        name: [key],
        value: data[key]
      });
    }

    setAction({
      method: "Update",
      title: "Update an Article",
      fields: fields,
      id: data.id
    });
    showModal();
  };

  const handleDelete = data => {
    console.log(data);
    confirm({
      title: "Do you want to delete this article?",
      icon: <ExclamationCircleOutlined />,
      content: data.article_name,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // return new Promise((resolve, reject) => {
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // }).catch(() => console.log("Oops errors!"));
        deleteArticles(currentUser.email, data.id)
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch(error => {
            console.error("Error removing document: ", error);
          });
      },
      onCancel() {}
    });
  };

  return (
    <Row justify="center" align="top">
      <Col sm={24} lg={18}>
        <div className="site-layout-content shadow-lg">
          <Row>
            <Col sm={24} md={12} lg={18}>
              <div className="text-header">
                <Title level={2}>Welcome to Dashboard!!</Title>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={12} lg={18}>
              <div className="action">
                <Space wrap>
                  <NewModal
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    visible={visible}
                    //title={"Update an Article"}
                    action={action}
                  />
                  <Button
                    type="primary"
                    onClick={handleAdd}
                    icon={<PlusSquareOutlined />}
                  >
                    New Article
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={24} md={12} lg={24}>
              <Table
                columns={columns}
                dataSource={articlesData}
                loading={loadTable}
                className="tb-colored"
              />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;
