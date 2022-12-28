import React, { useState, useMemo, useEffect } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import checkUserStatus from "../utils/checkUserStatus";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const axios = require("axios");

export default function Home({ data }) {
  const [value, setValue] = useState("");
  const [token, setToken] = useState(false);
  const [title, setTitle] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loadStatus, setLoadStatus] = useState(false);
  const [blurState, setBlurState] = useState({ filter: "blur(0)" });
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  useEffect(() => {
    if (data) {
      setValue(data.message);
      setTitle(data.title);
    }
  }, [data]);

  useEffect(() => {
    let str =
      localStorage.getItem("token_info") ||
      sessionStorage.getItem("token_info");
    if (str) {
      str = JSON.parse(str);
      setToken(str);
      if (!checkUserStatus(JSON.stringify(str))) {
        setToken(false);
      }
    }
  }, []);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 100,
      }}
      spin
    />
  );

  const success = () => {
    messageApi.open({
      type: "success",
      content: `Post succesfull`,
    });
    setLoadStatus(false);
    setBlurState({
      filter: "blur(0)",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Invalid credatials",
    });
    setLoadStatus(false);
    setBlurState({
      filter: "blur(0)",
    });
  };

  const submitPost = async (val) => {
    let apiUrl = "https://blog-backend-4u64.onrender.com/post/create";
    if (data) {
      apiUrl = `https://blog-backend-4u64.onrender.com/post/${data._id}/update`;
    }
    try {
      setLoadStatus(true);
      setBlurState({
        filter: "blur(4px)",
      });

      const resp = await axios.post(
        apiUrl,
        {
          title: val.title,
          message: value,
        },
        {
          headers: {
            authorization: `Bearer ${token.token}`,
          },
        }
      );
      if (resp) {
        success();
      }
    } catch (err) {
      error();
    }
  };

  return (
    <>
      <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-20">
        {loadStatus ? <Spin indicator={antIcon} /> : null}
      </div>
      <div
        className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 w-1/2 
            flex flex-col gap-5"
        style={blurState}
      >
        {contextHolder}
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          style={{
            overflow: "auto",
            maxHeight: "300px",
          }}
        />
        <div className="self-center	">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            fields={[
              {
                name: ["title"],
                value: title,
              },
            ]}
            onFinish={submitPost}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Title is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
