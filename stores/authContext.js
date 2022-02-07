import React, { createContext } from "react";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
const AuthContext = createContext({});

export const AuthContextProdiver = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = React.useState();
  const [isLogged, setIsLogged] = React.useState();
  const [todos, setTodos] = React.useState([]);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    variant: "",
  });
  let logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLogged(false);
    router.push("/");
  };
  let clearSnackbar = () => {
    setTimeout(() => {
      setSnackbar({
        open: false,
        message: "",
        variant: "",
      });
    }, 1000);
  };
  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  React.useEffect(() => {
    let authenticatedPathnames = ["/todo"];

    if (isLogged !== undefined) {
      if (!isLogged && authenticatedPathnames.includes(router.pathname)) {
        router.push("/login");
      }
    }
  }, [isLogged]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        todos,
        snackbar,
        logOut,
        setSnackbar,
        clearSnackbar,
        setTodos,
        isLogged,
      }}
    >
      {snackbar.open && (
        <div
          className={snackbar.variant ? `${styles.success}` : `${styles.error}`}
        >
          <p
            style={{
              color: "black",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
              padding: "1rem",
              width: "50%",
              height: "50%",
            }}
          >
            {snackbar.message}
          </p>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
