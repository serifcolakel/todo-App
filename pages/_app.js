import "../styles/globals.css";
import { AuthContextProdiver } from "../stores/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProdiver>
      <Component {...pageProps} />
    </AuthContextProdiver>
  );
}

export default MyApp;
