import { useNavigate } from 'react-router-dom';

const AuthModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Authentication Required
          </h3>
          <p className="text-gray-600 mb-6">
            Please create an account or login to continue.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleGoToLogin}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Go to Login
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
