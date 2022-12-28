import Home from "../home";

export default function updatepost({ postData }) {
  return <Home data={postData.post} />;
}

export async function getStaticPaths() {
  const response = await fetch("https://blog-backend-4u64.onrender.com/posts");
  let data = await response.json();
  data = data.posts;
  const idlist = data.map((post) => ({ params: { id: post._id } }));

  return {
    paths: idlist,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://blog-backend-4u64.onrender.com/post/${params.id}`
  );
  const postData = await res.json();
  return {
    props: {
      postData,
    },
  };
}
