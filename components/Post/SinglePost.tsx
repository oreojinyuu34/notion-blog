import Link from "next/link";
import React from "react";

type Props = {
  icon?: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  isPaginationPage: boolean;
};

const SinglePost = (props: Props) => {
  const { icon, title, description, date, tags, slug, isPaginationPage } =
    props;
  return (
    <section>
      <div>
        <Link href={`/posts/${slug}`}>
          <div>
            <span>{icon && <img src={icon} alt="Post Icon" />} </span>
            <h2>{title}</h2>
          </div>
          <div>{date}</div>
          {tags.map((tag, index: number) => (
            <span key={index}>{tag}</span>
          ))}
          <p>{description}</p>
        </Link>
      </div>
    </section>
  );
};

export default SinglePost;
