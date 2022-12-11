import axios from "axios"
import { Skeleton } from 'antd';
// import DisplayPostList from "../../components/DisplayPostList";
import DisplayCommentsList from "../../../components/ListComments";

export default function comments({ data }) {

    return <div className="w-full flex flex-col items-center">
        <div className="flex flex-col w-[max(45ch,_50%)] bg-gray-50 p-5 items-center ">
            {data ? <DisplayCommentsList comments={data} /> : <Skeleton active />}
        </div>
    </div>
}

export async function getStaticProps() {
    const response = await axios.get('https://blogapi-production-d43c.up.railway.app/comments')
    const data = await response.data.comments
    return {
        props: {
            data
        }
    }
}