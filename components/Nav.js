import { useState, useEffect } from "react";
import Link from "next/link";
import navStyles from "../styles/Nav.module.scss";
import "../styles/Nav.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const Nav = () => {
  const userState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [toggleMobileNav, setToggleMobileNav] = useState(false);

  return (
    <>
      <nav className={`${navStyles.navAdmin} ${navStyles.nav}`}>
        <ul>
        {userState.user && userState.user.userStatus === "admin" && (
            <li>
              <Link href="/[addEditPost]" as="/addPost">
                Adaugă postare
              </Link>
            </li>
          )}
          {userState.isAuthenticated ? (
            <>
              <li onClick={() => dispatch(logout())}>Ieși din cont</li>
              <li>{userState.user.name}</li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup">Înregistrare</Link>
              </li>
              <li>
                <Link href="/login">Autentificare</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <nav className={navStyles.nav}>
        <div className={navStyles.menu_icon}>
          <MenuIcon
            onClick={() => setToggleMobileNav(true)}
            style={toggleMobileNav ? { display: "none" } : { display: "block" }}
          />
          <CloseIcon
            onClick={() => setToggleMobileNav(false)}
            style={toggleMobileNav ? { display: "block" } : { display: "none" }}
          />
        </div>
        {/* <div className={navStyles.logo}>LOGO</div> */}
        <ul>

          <li>
            <Link href="/">Acasă</Link>
          </li>
          <li>
            <Link href="/about">Fototecă</Link>
          </li>
          <li>
            <Link href="/about">Despre noi</Link>
          </li>
          <li>
            <Link href="/about">Contact</Link>
          </li>
          
        </ul>
      </nav>
      {/* ======================== MOBILE MENU ============================ */}
      <nav
        className={` ${navStyles.mobile_nav} ${
          toggleMobileNav ? navStyles.active : null
        }`}
      >
        <ul>
          <li onClick={() => setToggleMobileNav(false)}>
            <Link href="/">Acasă</Link>
          </li>
          <li onClick={() => setToggleMobileNav(false)}>
            <Link href="/about">Fototecă</Link>
          </li>
          <li onClick={() => setToggleMobileNav(false)}>
            <Link href="/about">Despre noi</Link>
          </li>
          <li onClick={() => setToggleMobileNav(false)}>
            <Link href="/about">Contact</Link>
          </li>
          {userState.user && userState.user.userStatus === "admin" && (
            <li onClick={() => setToggleMobileNav(false)}>
              <Link href="/[addEditPost]" as="/addPost">
                Adaugă postare
              </Link>
            </li>
          )}
          {userState.isAuthenticated ? (
            <>
              <li onClick={() => dispatch(logout())}>Ieși din cont</li>
              <li>{userState.user.name}</li>
            </>
          ) : (
            <>
              <li onClick={() => setToggleMobileNav(false)}>
                <Link href="/signup">Înregistrare</Link>
              </li>
              <li onClick={() => setToggleMobileNav(false)}>
                <Link href="/login">Autentificare</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
