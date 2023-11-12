import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <Link href="/">Atsushi</Link>
        <div>
          <ul>
            <li>
              <Link href="/">リンク</Link>
            </li>
            <li>
              <Link href="/">リンク</Link>
            </li>
            <li>
              <Link href="/">リンク</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
