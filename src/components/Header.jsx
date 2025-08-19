import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Link } from 'react-router-dom';
import PalettePicker from './PalettePicker';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { user, logout } = useAuth();
  const { showSuccess } = useToast();

  const handleLogout = () => {
    logout();
    showSuccess('로그아웃!');
  };

  return (
    <header className="sticky top-0 z-50 bg-app/90 backdrop-blur-md border-b border-app/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-app">
              📋 Task Manager
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 mr-4">
                <span className="text-sm text-app/70">
                  안녕하세요, {user.name}님!
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mr-4">
                <Link
                  to="/login"
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  회원가입
                </Link>
              </div>
            )}
            <PalettePicker />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;