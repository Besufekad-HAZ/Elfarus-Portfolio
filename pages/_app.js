import "../styles/globals.css";

// components
import Layout from "../components/Layout";
import Transition from "../components/Transition";

// router
import { useRouter } from "@next/router";

// framer motion
import { AnimatePresence, motion } from "framer-motion";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
