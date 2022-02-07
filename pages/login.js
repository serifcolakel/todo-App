import axios from "axios";
import React, { useContext } from "react";
import styles from "../styles/Home.module.scss";
import router from "next/router";
import AuthContext from "../stores/authContext";

export default function Login() {
  const context = useContext(AuthContext);
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const login = async (e) => {
    try {
      e.preventDefault();
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}login`,
        data
      );
      context.setUser({ ...response.data.user });
      context.setSnackbar({
        open: true,
        message: "User logged in successfully",
        variant: "success",
      });
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/todo");
        context.clearSnackbar();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.register}>
      <h1>Login</h1>

      <form className={styles.registerForm} onSubmit={login}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>Do not have a account yet? </p>
      <button onClick={() => router.push("/register")}>Register</button>
    </div>
  );
}
