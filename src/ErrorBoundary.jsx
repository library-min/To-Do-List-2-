import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4 text-red-600">⚠️ 오류 발생</h1>
            <p className="text-gray-600 mb-6">
              앱 실행 중 예상치 못한 오류가 발생했습니다.
            </p>
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
              <p className="text-red-800 font-mono text-sm">
                {this.state.error?.message || '알 수 없는 오류'}
              </p>
            </div>
            <div className="space-x-4">
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                페이지 새로고침
              </button>
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }} 
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                데이터 초기화 후 새로고침
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;