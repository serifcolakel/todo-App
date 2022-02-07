import React, { useContext } from "react";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import router from "next/router";
import AuthContext from "../stores/authContext";

export default function Register() {
  const context = useContext(AuthContext);

  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    todos: [],
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const register = async (e) => {
    try {
      e.preventDefault();
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}register`,
        data
      );

      context.setUser(response.data.user);
      context.setSnackbar({
        open: true,
        message: "User registered successfully",
        variant: "success",
      });
      setTimeout(() => {
        router.push("/");
        context.clearSnackbar();
      }, 2000);
    } catch (error) {
      if (error.response) {
        context.setSnackbar({
          open: true,
          message: error.response.data.message,
          variant: "error",
        });
      } else {
        context.setSnackbar({
          open: true,
          message: error.message,
          variant: "error",
        });
      }
    }
  };

  return (
    <div className={styles.register}>
      <h1>Register</h1>
      <form className={styles.registerForm} onSubmit={register}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button disabled={data.confirm} type="submit">
          Register
        </button>
      </form>
      <p>Already a member ? </p>
      <button onClick={() => router.push("/login")}>Login</button>
    </div>
  );
}
