import Head from "next/head";
import { getAllPosts, getPostsForTopPage } from "lib/notionAPI";
import SinglePost from "components/Post/SinglePost";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { page: "1" } }, { params: { page: "2" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const numberOfPosts = await getPostsForTopPage();
  return {
    props: {
      numberOfPosts,
    },
    revalidate: 60,
  };
};

const BlogPageList = ({ numberOfPosts }: any) => {
  // console.log(allPosts);
  return (
    <div>
      <Head>
        <title>Atsushi-blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="style.css" href="/style.css/" />
      </Head>
      <main className="">
        <h1 className="title">Atsushi-blog🖥</h1>
        {numberOfPosts.map((post: any) => (
          <div>
            <SinglePost
              icon={post.icon}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default BlogPageList;