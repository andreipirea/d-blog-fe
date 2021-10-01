import Meta from "./Meta";
import Nav from "./Nav";
import Footer from "./Footer";

import styles from "../styles/Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <div className={styles.container}>
      {/* <Nav /> */}
        <main className={styles.main}>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
