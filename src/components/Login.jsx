import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import AuthCard from './common/AuthCard';
import FormField from './common/FormField';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = '이메일을 입력해주세요';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '올바른 이메일 형식이 아닙니다';
    
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요';
    else if (formData.password.length < 6) newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 데모 계정 체크
      if (formData.email === 'demo@example.com' && formData.password === 'demo123') {
        const demoUser = { id: 'demo', name: '데모 사용자', email: 'demo@example.com' };
        localStorage.setItem('currentUser', JSON.stringify(demoUser));
        onLogin(demoUser);
        showSuccess('로그인!');
        setTimeout(() => navigate('/'), 500);
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin(user);
        showSuccess('로그인!');
        setTimeout(() => navigate('/'), 500);
      } else {
        setErrors({ general: '이메일 또는 비밀번호가 올바르지 않습니다' });
        showError('이메일 또는 비밀번호가 올바르지 않습니다');
      }
    } catch (error) {
      setErrors({ general: '로그인 중 오류가 발생했습니다' });
      showError('로그인 중 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const headerIcon = (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const emailIcon = (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  );

  const passwordIcon = (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <AuthCard
      title="로그인"
      subtitle="로그인하여 할 일을 관리하세요"
      headerIcon={headerIcon}
      gradientFrom="from-blue-600"
      gradientTo="to-purple-600"
      error={errors.general}
      backgroundColor="from-blue-50 via-white to-purple-50"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormField
            id="email"
            name="email"
            type="email"
            label="이메일 주소"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={emailIcon}
            autoComplete="email"
            colorScheme="blue"
          />
          
          <FormField
            id="password"
            name="password"
            type="password"
            label="비밀번호"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={passwordIcon}
            autoComplete="current-password"
            colorScheme="blue"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-all duration-200 transform border border-transparent shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        >
          {isLoading ? (
            <>
              <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              로그인 중...
            </>
          ) : (
            '로그인'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          계정이 없으신가요?{' '}
          <Link to="/register" className="font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-500 hover:underline">
            회원가입
          </Link>
        </p>
      </div>

      <div className="p-4 mt-6 border border-blue-100 bg-blue-50 rounded-xl">
        <div className="flex">
          <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">데모 계정</h3>
            <div className="mt-1 text-sm text-blue-700">
              <p>이메일: demo@example.com</p>
              <p>비밀번호: demo123</p>
            </div>
          </div>
        </div>
      </div>
    </AuthCard>
  );
};

export default Login;