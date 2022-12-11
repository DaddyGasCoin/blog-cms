import { Button, Modal, notification } from 'antd';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import checkUserStatus from '../utils/checkUserStatus';
import { useState } from 'react';
const axios = require('axios');


export default function DisplayCommentsList({ comments }) {

    const [_comments, setComments] = useState(comments)
    const [expandedComments, setExpandedComments] = useState([]);

    // Function to expand a comment when it is clicked
    const handleCommentClick = (id) => {
        const index = expandedComments.indexOf(id);
        if (index === -1) {
            setExpandedComments([...expandedComments, id]);
        } else {
            setExpandedComments(expandedComments.filter((_, i) => i !== index));
        }
    };
    // Use the notification hook from antd to create an api for showing notifications
    const [api, contextHolder] = notification.useNotification();
    // Function to show a notification with the specified placement and error message
    const openNotification = (placement, error) => {
        let message = 'Post deleted'
        if (error) {
            message = 'An error occured'
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
            title: 'Are you sure you want to delete this post?',
            icon: <ExclamationCircleFilled />,
            content: 'This change is permenant ',
            onOk() {
                return deleteComment(id)
            },
            onCancel() { },
        });
    };
    // Function to delete a post with the specified ID
    const deleteComment = async (id) => {
        let str = localStorage.getItem('token_info') || sessionStorage.getItem('token_info');
        if (str) {
            str = JSON.parse(str);
            if (!checkUserStatus(JSON.stringify(str))) {
                str = null
            }
        }

        // Make a POST request to the specified URL with the post ID to delete the post
        try {

            const resp = await axios.post(`https://blogapi-production-d43c.up.railway.app/comment/${id}/delete`, {}, {
                headers: {
                    'Authorization': `Bearer ${str.token}`
                }
            })
            // If the request is successful, remove the post from the list of posts
            if (resp) {
                setComments(
                    _comments.filter(t => t._id !== id)
                );
                // Show a success notification
                openNotification('top')
            }
        } catch (err) {
            openNotification('top', 'error')
        }
    }

    return (<div className="flex flex-col">
        {contextHolder}
        {
            _comments.map((comment) => {
                const isExpanded = expandedComments.includes(comment._id);
                return (
                    <div className="flex flex-row gap-56 justify-between border-0 border-solid border-b
                     p-2 hover:bg-gray-200 cursor-pointer"
                        key={comment._id} onClick={() => handleCommentClick(comment._id)}>
                        <div className="flex flex-col">
                            <div className="text-lg font-sans font-semibold text-gray-700">
                                {comment.message}
                            </div>
                            {isExpanded && (
                                <div className="text-sm font-sans font-semibold text-gray-700">
                                    Posted by {comment.user}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-1">
                            <Button size='small' icon={<DeleteOutlined />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showPromiseConfirm(comment._id);
                                }} danger />
                        </div>
                    </div>
                )
            })}
    </div>)

}
