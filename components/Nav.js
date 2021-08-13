import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const Nav = () => {
  const userState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
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
            <Link href="/[addEditPost]" as="/addPost">
              Add Post
            </Link>
          </li>
          {userState.isAuthenticated ? (
            <li onClick={() => dispatch(logout())}>
              Log out
            </li>
          ) : (
            <>
              <li>
                <Link href="/signup">Sign up</Link>
              </li>
              <li>
                <Link href="/login">Log in</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
