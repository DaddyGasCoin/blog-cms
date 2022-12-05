import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Form, Input, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import checkUserStatus from "../utils/checkUserStatus"
const axios = require('axios');

export default function home({ }) {
    const [value, setValue] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [loadStatus, setLoadStatus] = useState(false)
    const [blurState, setBlurState] = useState({ filter: 'blur(0)' })
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
            type: 'success',
            content: `Post succesfull`,
        });
        setLoadStatus(false)
        setBlurState({
            filter: 'blur(0)'
        })
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Invalid credatials',
        });
        setLoadStatus(false)
        setBlurState({
            filter: 'blur(0)'
        })
    };

    let token
    if (checkUserStatus()) {
        token = checkUserStatus()
    }

    const submitPost = async (data) => {

        try {
            setLoadStatus(true)
            setBlurState({
                filter: 'blur(4px)'
            })
            const resp = await axios.post(`https://blogapi-production-d43c.up.railway.app/post/create`,
                {
                    title: 'Loren Ipsum',
                    message: data
                }, {
                headers: {
                    'Authorization': `Bearer ${token.token}`
                }
            })
            if (resp) {
                success()
            }
        } catch (err) {
            error()
        }
    }

    return <>
        <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-20">
            {loadStatus ? <Spin indicator={antIcon} /> : null}
        </div>
        <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 w-1/2 
            flex flex-col gap-5" style={blurState}>
            {contextHolder}
            <ReactQuill theme="snow" value={value} onChange={setValue}
                style={{
                    overflow: "auto",
                    maxHeight: "300px"
                }} />
            <div className="self-center	">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}

                    onFinish={submitPost}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Title is required!',
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
            {/* <Button onClick={() => submitPost(value)}>Submit</Button> */}
        </div>
    </>
}