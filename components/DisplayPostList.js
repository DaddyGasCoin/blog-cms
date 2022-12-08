import { Button } from 'antd';
import Link from 'next/link'


export default function DisplayPostList({ posts }) {
    //Display all post is consised format for home page

    return (<>
        {
            posts.map((post) => {
                return (
                    <Link href={`update/${post._id}`}>
                        <div className="text-lg font-mono font-semibold text-gray-700" key={post._id}>
                            {post.title}
                        </div>
                    </Link>
                    // <div className="flex flex-col my-2" key={post._id}>
                    //     <div className="flex flex-row justify-between mb-1">
                    //         <div className="text-base font-medium text-gray-600">{post.user.username}</div>
                    //         <div className="text-sm font-mono font-normal text-gray-600">
                    //             {(post.date)} ago</div>
                    //     </div>
                    //     <div className="flex flex-row justify-between">

                    //         <Button type="primary" size='middle' href={`posts/${post._id}`}
                    //             style={{
                    //                 background: "#6b7280"
                    //             }}>
                    //             View Post
                    //         </Button>
                    //     </div>
                    // </div>
                )
            })}
    </>)
}