import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple authentication check
    if (credentials.username === 'Elfarus' && credentials.password === 'Elfarus7') {
      // Store authentication in sessionStorage
      sessionStorage.setItem('adminAuthenticated', 'true');
      sessionStorage.setItem('adminLoginTime', Date.now().toString());

      // Redirect to admin panel
      router.push('/admin');
    } else {
      setError('Invalid username or password');
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-primary/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        animate="show"
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2
              variants={fadeIn("down", 0.4)}
              initial="hidden"
              animate="show"
              className="text-3xl font-bold text-white mb-2"
            >
              Admin <span className="text-accent">Login</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("down", 0.5)}
              initial="hidden"
              animate="show"
              className="text-white/70"
            >
              Access your portfolio admin panel
            </motion.p>
          </div>

          {/* Login Form */}
          <motion.form
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-accent" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-white/50 transition-colors"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-accent" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-white/50 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-lg p-3"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-accent hover:bg-accent/80 disabled:bg-accent/50 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </motion.form>

          {/* Footer */}
          <motion.div
            variants={fadeIn("up", 0.7)}
            initial="hidden"
            animate="show"
            className="mt-6 text-center"
          >
            <p className="text-xs text-white/50">
              Protected admin access for portfolio management
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
