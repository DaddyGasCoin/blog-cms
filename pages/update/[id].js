import axios from "axios"
import Home from "../home";

export default function updatepost({ postData }) {
    return <Home data={postData.post} />
}


export async function getStaticPaths() {
    const response = await axios.get('https://blogapi-production-d43c.up.railway.app/posts')
    const data = await response.data.posts
    const idlist = data.map(post => (
        { params: { id: post._id } }))

    return {
        paths: idlist,
        fallback: false

    }
}

export async function getStaticProps({ params }) {
    const res = await axios.get(`https://blogapi-production-d43c.up.railway.app/post/${params.id}`)
    const postData = res.data
    return {
        props: {
            postData,
        },
    };
}