import "../styles/globals.scss";
import { AuthContextProdiver } from "../stores/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProdiver>
      <Component {...pageProps} />
    </AuthContextProdiver>
  );
}

export default MyApp;
