// fonts
import { sora, poppins } from "../lib/fonts";

// components
import Nav from "../components/Nav";
import Header from "../components/Header";
import TopLeftImg from "../components/TopLeftImg";
import AdSense from "./AdSense";
import Head from "next/head";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const isAdminLogin = router.pathname === "/admin/login";
  const isAdminPage = router.pathname.startsWith("/admin");

  return (
    <div
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} ${poppins.variable} font-sora relative`}
    >
      <Head>
        <AdSense />
      </Head>
      {!isAdminPage && <TopLeftImg />}
      {!isAdminPage && <Nav />}
      {!isAdminPage && <Header />}
      {children}
    </div>
  );
};

export default Layout;
