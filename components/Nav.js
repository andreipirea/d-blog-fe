import Link from "next/link";
import navStyles from "../styles/Nav.module.css";

const Nav = () => {
  return (
    <div>
      <nav className={navStyles.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/[addEditPost]" as="/addPost">Add Post</Link>
          </li>
          <li>
            <Link href="/signup">Sign up</Link>
          </li>
          <li>
            <Link href="/login">Log in</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
