import React, { useContext } from "react";
import AuthContext from "../../stores/authContext";
import styles from "../../styles/Home.module.css";
export default function Navbar() {
  const [show, setShow] = React.useState(false);
  const context = useContext(AuthContext);
  console.log("context", context);
  return (
    <div className={styles.navbar}>
      <h1>TODO MyApp</h1>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src="https://i.hizliresim.com/hcw5gba.jpg"
          alt="user"
          onClick={() => setShow(!show)}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "100%",
            cursor: "pointer",
          }}
        />
        {show && (
          <div
            style={{
              backgroundColor: "white",
              width: "200px",
              height: "auto",
              padding: "10px",
              position: "absolute",
              top: 60,
              borderRadius: "2px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              right: 10,
              textAlign: "center",
            }}
          >
            {" "}
            <p style={{ color: "black" }}>
              {context.user && context.user.username.toUpperCase()}
            </p>
            <p style={{ color: "black" }}>
              {context.user && context.user.email}
            </p>
            <p onClick={() => context.logOut()}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
}
