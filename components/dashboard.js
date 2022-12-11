
import { Button } from 'antd';
import Link from 'next/link'


export default function DashBoard() {

    return (
        <>
            <Link href="/home">
                <Button type="primary">Create new post</Button>
            </Link>
            <Link href="/update">
                <Button type="primary">Update post</Button>
            </Link>
            <Link href="/delete/comment">
                <Button type="primary">Update comments</Button>
            </Link>
        </>
        // TODO: ADD Buttonds to manage posts and comments
    )
}