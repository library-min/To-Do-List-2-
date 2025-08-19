import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import AuthCard from './common/AuthCard';
import FormField from './common/FormField';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
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
    
    if (!formData.name) newErrors.name = '이름을 입력해주세요';
    else if (formData.name.length < 2) newErrors.name = '이름은 최소 2자 이상이어야 합니다';
    
    if (!formData.email) newErrors.email = '이메일을 입력해주세요';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '올바른 이메일 형식이 아닙니다';
    
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요';
    else if (formData.password.length < 6) newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.email === formData.email);
      
      if (existingUser) {
        setErrors({ email: '이미 가입된 이메일입니다' });
        showError('이미 가입된 이메일입니다');
        return;
      }
      
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      onRegister(newUser);
      showSuccess('축하합니다! 회원가입이 완료되었습니다!');
      setTimeout(() => navigate('/'), 1000);
    } catch {
      setErrors({ general: '회원가입 중 오류가 발생했습니다' });
      showError('회원가입 중 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const headerIcon = (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  );

  const nameIcon = (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  const confirmIcon = (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <AuthCard
      title="회원가입"
      subtitle="계정을 만들어 할 일 관리를 시작하세요"
      headerIcon={headerIcon}
      gradientFrom="from-green-600"
      gradientTo="to-blue-600"
      error={errors.general}
      backgroundColor="from-green-50 via-white to-blue-50"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormField
            id="name"
            name="name"
            type="text"
            label="이름"
            placeholder="홍길동"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            icon={nameIcon}
            autoComplete="name"
            colorScheme="green"
          />
          
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
            colorScheme="green"
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
            autoComplete="new-password"
            colorScheme="green"
          />
          
          <FormField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="비밀번호 확인"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={confirmIcon}
            autoComplete="new-password"
            colorScheme="green"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-all duration-200 transform border border-transparent shadow-lg rounded-xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <>
                <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                가입 중...
              </>
            ) : (
              '회원가입'
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          계정이 있으신가요?{' '}
          <Link to="/login" className="font-semibold text-green-600 transition-colors duration-200 hover:text-green-500 hover:underline">
            로그인하기
          </Link>
        </p>
      </div>

      <div className="p-4 mt-6 border border-green-100 bg-green-50 rounded-xl">
        <div className="flex">
          <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">가입하면 좋은 점</h3>
            <div className="mt-1 text-sm text-green-700">
              <p>✓ 할 일 데이터 안전한 보관</p>
              <p>✓ 여러 기기에서 동기화</p>
              <p>✓ 개인화된 설정 저장</p>
            </div>
          </div>
        </div>
      </div>
    </AuthCard>
  );
};

export default Register;