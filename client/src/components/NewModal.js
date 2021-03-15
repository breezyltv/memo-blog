import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import {
  Button,
  Modal,
  Form,
  Input,
  Divider,
  Typography,
  Space,
  Alert,
  message
} from "antd";
import { addBlog, updateArticle } from "../lib/firebaseHelper";
const { TextArea } = Input;
const { Text } = Typography;
const NewModal = ({ handleOk, handleCancel, visible, action }) => {
  const { currentUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [status, setStatus] = useState({});

  const key = "updatable";

  form.resetFields();
  const onFinish = articleData => {
    setConfirmLoading(true);
    if (action.method === "Add") {
      handelAddArticle(articleData);
    } else {
      handleUpdateArticle(articleData);
    }
  };

  const handelAddArticle = articleData => {
    message.loading({ content: "Updating this article...", key });
    addBlog(currentUser.uid, articleData)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        setConfirmLoading(false);

        message.success({
          content: "Successfully added the article!!",
          key,
          duration: 4,
          onClose: form.resetFields()
        });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        setConfirmLoading(false);
        setStatus({
          error: error
        });
      });
  };

  const handleUpdateArticle = articleData => {
    message.loading({ content: "Updating this article...", key });
    updateArticle(currentUser.uid, action.id, articleData)
      .then(() => {
        console.log("Document successfully written!");
        setConfirmLoading(false);
        message.success({
          content: "The article successfully updated!",
          key,
          duration: 4,
          onClose: handleOk()
        });
      })
      .catch(error => {
        console.error("Error writing document: ", error);
        setConfirmLoading(false);
        setStatus({
          error: error
        });
      });
  };

  const handleCancelModal = () => {
    handleCancel();
    form.resetFields();
  };

  return (
    <>
      <Modal
        title={action.title}
        visible={visible}
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="modal_view"
          form={form}
          fields={action.fields}
          layout="vertical"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label={<Text strong>Title</Text>}
            name="article_name"
            hasFeedback
            required
            rules={[
              {
                required: true,
                message: "Please enter a title!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<Text strong>Summary</Text>}
            name="article_body"
            required
            rules={[
              {
                required: true,
                message: "Please enter summary!"
              }
            ]}
          >
            <TextArea rows={6} value={action.data} />
          </Form.Item>

          <Divider />
          {status.error && (
            <Alert message={status.success} type="error" showIcon />
          )}
          <Form.Item>
            <Space wrap>
              <Button onClick={handleCancelModal}>Cancel</Button>
              <Button type="primary" loading={confirmLoading} htmlType="submit">
                {action.method}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewModal;
