import { getAllPosts, getSinglePost } from "lib/notionAPI";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

const Post = ({ post }: any) => {
  const { icon } = post.metadata;
  return (
    <section>
      <div>
        <span>{icon && <img src={icon} alt="Post Icon" />} </span>
        <h2>{post.metadata.title}</h2>
        <div>description</div>
        <span>投稿日:{post.metadata.date}</span>
        <br />
        {post.metadata.tags.map((tag: string, index: number) => (
          <p key={index}>{tag}</p>
        ))}
      </div>
      <div>
        <ReactMarkdown
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.markdown.parent}
        </ReactMarkdown>
        <Link href="/">
          <span>ホームに戻る</span>
        </Link>
      </div>
    </section>
  );
};

export default Post;
