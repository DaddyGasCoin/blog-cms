import { Skeleton } from "antd";
import DisplayPostList from "../../components/DisplayPostList";

export default function posts({ data }) {
  return (
    <div className="w-full flex flex-col items-center mt-20">
      <div className="flex flex-col w-[max(45ch,_50%)] bg-gray-50 p-5 items-center ">
        {data ? <DisplayPostList posts={data} /> : <Skeleton active />}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://blog-backend-4u64.onrender.com/posts");
  let data = await response.json();
  data = data.posts;
  return {
    props: {
      data,
    },
  };
}
