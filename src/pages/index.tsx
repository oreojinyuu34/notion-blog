import Head from "next/head";
import { getAllPosts, getPostsForTopPage } from "lib/notionAPI";
import SinglePost from "components/Post/SinglePost";
import { GetStaticProps } from "next";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const numberOfPosts = await getPostsForTopPage();
  return {
    props: {
      numberOfPosts,
    },
    revalidate: 60,
  };
};

export default function Home({ numberOfPosts }: any) {
  // console.log(allPosts);
  return (
    <div>
      <Head>
        <title>title-blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="style.css" href="/style.css/" />
      </Head>
      <main className="">
        <h1 className="title">blog-title</h1>
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
        <Link href="/posts/page/1">...もっと見る</Link>
      </main>
    </div>
  );
}
