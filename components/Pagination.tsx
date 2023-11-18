import Link from "next/link";
import React from "react";

interface Props {
  numberOfPage: number;
}

const Pagination = (props: Props) => {
  const { numberOfPage } = props;
  let pages: number[] = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }
  return (
    <section>
      <ul>
        {pages.map((page) => (
          <li key={page}>
            <Link href={`/posts/page/${page}`}>{page}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagination;
