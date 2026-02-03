import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { FaSpinner } from "react-icons/fa";

const AdminAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = () => {
    const authenticated = sessionStorage.getItem("adminAuthenticated");
    const loginTime = sessionStorage.getItem("adminLoginTime");

    if (authenticated === "true" && loginTime) {
      // Check if login is not older than 24 hours
      const loginTimestamp = parseInt(loginTime);
      const currentTime = Date.now();
      const hoursSinceLogin = (currentTime - loginTimestamp) / (1000 * 60 * 60);

      if (hoursSinceLogin < 24) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        sessionStorage.removeItem("adminAuthenticated");
        sessionStorage.removeItem("adminLoginTime");
        router.push("/admin/login");
      }
    } else {
      router.push("/admin/login");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    sessionStorage.removeItem("adminLoginTime");
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary/30 flex items-center justify-center">
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <FaSpinner className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
          <p className="text-white/70">Checking authentication...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Router will handle redirect
  }

  return (
    <div className="relative">
      {/* Logout Button */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors shadow-lg text-sm sm:text-base"
        >
          Logout
        </button>
      </div>

      {children}
    </div>
  );
};

export default AdminAuth;
