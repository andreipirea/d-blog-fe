import { useState, useEffect } from "react";
import Link from "next/link";
import navStyles from "../styles/Nav.module.scss";
import "../styles/Nav.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { useRouter } from "next/router";

const Nav = () => {
  const userState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [toggleMobileNav, setToggleMobileNav] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className={`${navStyles.navAdmin}`}>
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
          <li className={`${router.pathname === "/" && navStyles.active}`}>
            <Link href="/">Acasă</Link>
          </li>
          <li
            className={`${
              router.pathname === "/categoryPage" && navStyles.active
            }`}
          >
            <div className={navStyles.dropdown}>
              <a href="#" className={navStyles.dropbtn}>
                Categorii
              </a>
              <div className={navStyles.dropdown_content}>
                <ul>
                  <Link
                    href={`/categoryPage?category=Activitati`}
                    as={`/categoryPage?category=Activitati`}
                  >
                    <li
                      className={`${
                        router.asPath === "/categoryPage?category=Activitati"
                          ? navStyles.category_active
                          : ""
                      }`}
                    >
                      Activitati
                    </li>
                  </Link>
                  <Link
                    href={`/categoryPage?category=Retete`}
                    as={`/categoryPage?category=Retete`}
                  >
                    <li
                      className={`${
                        router.asPath === "/categoryPage?category=Retete"
                          ? navStyles.category_active
                          : ""
                      }`}
                    >
                      Retete
                    </li>
                  </Link>
                  <Link
                    href={`/categoryPage?category=Locuri de vizitat`}
                    as={`/categoryPage?category=Locuri de vizitat`}
                  >
                    <li
                      className={`${
                        router.asPath === "/categoryPage?category=Locuri%20de%20vizitat"
                          ? navStyles.category_active
                          : ""
                      }`}
                    >
                      Locuri de vizitat
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </li>
          <li
            className={`${`${
              router.pathname === "/gallery" && navStyles.active
            }`}`}
          >
            <Link href="/gallery">Fototecă</Link>
          </li>
          <li
            className={`${`${
              router.pathname === "/about" && navStyles.active
            }`}`}
          >
            <Link href="/about">Despre noi</Link>
          </li>
          <li
            className={`${`${
              router.pathname === "/contact" && navStyles.active
            }`}`}
          >
            <Link href="/contact">Contact</Link>
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
          <li>
            <div className={navStyles.dropdown}>
              <a href="#" className={navStyles.dropbtn}>
                Categorii
              </a>
              <div
                className={navStyles.dropdown_content}
                onClick={() => setToggleMobileNav(false)}
              >
                <Link
                  href={`/categoryPage?category=Activitati`}
                  as={`/categoryPage?category=Activitati`}
                >
                  Activitati
                </Link>
                <Link
                  href={`/categoryPage?category=Retete`}
                  as={`/categoryPage?category=Retete`}
                >
                  Retete
                </Link>
                <Link
                  href={`/categoryPage?category=Locuri de vizitat`}
                  as={`/categoryPage?category=Locuri de vizitat`}
                >
                  Locuri de vizitat
                </Link>
              </div>
            </div>
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
