import { Button, Modal, notification } from "antd";
import Link from "next/link";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import checkUserStatus from "../utils/checkUserStatus";
import { useState } from "react";
const axios = require("axios");

export default function DisplayPostList({ posts }) {
  // Declare state for the list of posts
  const [_posts, setPosts] = useState(posts);
  // Use the notification hook from antd to create an api for showing notifications
  const [api, contextHolder] = notification.useNotification();
  // Function to show a notification with the specified placement and error message
  const openNotification = (placement, error) => {
    let message = "Post deleted";
    if (error) {
      message = "An error occured";
    }
    api.info({
      message: message,
      placement,
    });
  };
  // Use the confirm method from antd to create a modal for confirming deletions
  const { confirm } = Modal;
  // Show the confirmation modal when the user clicks on the delete button
  const showPromiseConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this post?",
      icon: <ExclamationCircleFilled />,
      content: "This change is permenant ",
      onOk() {
        return deletePost(id);
      },
      onCancel() {},
    });
  };
  // Function to delete a post with the specified ID
  const deletePost = async (id) => {
    let str =
      localStorage.getItem("token_info") ||
      sessionStorage.getItem("token_info");
    if (str) {
      str = JSON.parse(str);
      if (!checkUserStatus(JSON.stringify(str))) {
        str = null;
      }
    }

    // Make a POST request to the specified URL with the post ID to delete the post
    try {
      const resp = await axios.post(
        `https://blog-backend-4u64.onrender.com/post/${id}/delete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${str.token}`,
          },
        }
      );
      // If the request is successful, remove the post from the list of posts
      if (resp) {
        setPosts(_posts.filter((t) => t._id !== id));
        // Show a success notification
        openNotification("top");
      }
    } catch (err) {
      openNotification("top", "error");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {contextHolder}
      {_posts.map((post) => {
        return (
          <div className="flex flex-row gap-3" key={post._id}>
            <div className="text-xl font-mono font-semibold text-gray-700">
              {post.title}
            </div>
            <div className="flex gap-1">
              <Link href={`update/${post._id}`}>
                <Button size="small" icon={<EditOutlined />} />
              </Link>
              <Button
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => showPromiseConfirm(post._id)}
                danger
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
