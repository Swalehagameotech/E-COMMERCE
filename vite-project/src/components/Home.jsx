import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserFromStorage, logout } from '../utils/auth';

const Home = () => {
  const navigate = useNavigate();
  const user = getUserFromStorage();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated()) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Navigation Bar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-gradient-to-br from-white to-white/80 rounded-lg flex items-center justify-center shadow-lg">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">AuthApp</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/90 font-medium">
                {user?.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Welcome Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20 max-w-2xl mx-auto">
            {/* Success Icon */}
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <svg
                className="h-12 w-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
              Welcome Home!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              You have successfully logged in to your account.
            </p>

            {/* User Info Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-100">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {user?.name || 'User'}
              </h3>
              <p className="text-gray-600">{user?.email || ''}</p>
            </div>

            {/* Decorative Elements */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white">
                <div className="text-3xl font-bold">🎉</div>
                <div className="text-sm font-semibold mt-2">Authenticated</div>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-4 text-white">
                <div className="text-3xl font-bold">🔒</div>
                <div className="text-sm font-semibold mt-2">Secure</div>
              </div>
              <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl p-4 text-white">
                <div className="text-3xl font-bold">✨</div>
                <div className="text-sm font-semibold mt-2">Protected</div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-white/90">
            <p className="text-lg">
              This is a protected route. Only authenticated users can access this
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
