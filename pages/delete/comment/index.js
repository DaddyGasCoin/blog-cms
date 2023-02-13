import { Skeleton } from "antd";
import DisplayCommentsList from "../../../components/ListComments";

export default function comments({ data }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col w-[max(45ch,_50%)] bg-gray-50 p-5 items-center ">
        {data ? <DisplayCommentsList comments={data} /> : <Skeleton active />}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    "https://blog-backend-4u64.onrender.com/comments"
  );
  let data = await response.json();
  data = data.comments;
  return {
    props: {
      data,
    },
  };
}
