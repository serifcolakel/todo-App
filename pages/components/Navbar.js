import React, { useContext } from "react";
import AuthContext from "../../stores/authContext";
import styles from "../../styles/Home.module.scss";
export default function Navbar() {
  const [show, setShow] = React.useState(false);
  const context = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <h1>MyApp</h1>
      <div className={styles.navbarBrand}>
        <img
          src="https://i.hizliresim.com/hcw5gba.jpg"
          alt="user"
          onClick={() => setShow(!show)}
        />
        {show && (
          <div className={styles.dropdown}>
            <p style={{ color: "black" }}>
              {context.user && context.user.username.toUpperCase()}
            </p>
            <p style={{ color: "black" }}>
              {context.user && context.user.email}
            </p>
            <p style={{ cursor: "pointer" }} onClick={() => context.logOut()}>
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
