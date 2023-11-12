import { getSinglePost } from "lib/notionAPI";
import React from "react";

export const getStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

const Post = () => {
  return (
    <section>
      <div>
        <span>gazou</span>
        <h2>title</h2>
        <div>description</div>
        <span>date</span>
        <br />
        <p>tag</p>
      </div>
    </section>
  );
};

export default Post;
