import { useNavigate } from 'react-router-dom';

const AuthCard = ({ 
  title, 
  subtitle, 
  headerIcon, 
  gradientFrom, 
  gradientTo, 
  children, 
  error,
  backgroundColor = 'from-blue-50 via-white to-purple-50'
}) => {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br ${backgroundColor} sm:px-6 lg:px-8`}>
      <div className="w-full max-w-md">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로 돌아가기
          </button>
        </div>

        <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl animate-fade-in-up">
          <div className={`px-8 py-8 text-center bg-gradient-to-r ${gradientFrom} ${gradientTo}`}>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white/20">
              {headerIcon}
            </div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-white/80">{subtitle}</p>
          </div>

          <div className="px-8 py-8">
            {error && (
              <div className="p-4 mb-6 border-l-4 border-red-400 rounded-r-lg bg-red-50 animate-shake">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;