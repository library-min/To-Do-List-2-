import { useTheme } from "../ThemeContext";
import { useState } from "react";

export default function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  const [isToggling, setIsToggling] = useState(false);
  const dark = mode === "dark";
  
  const handleToggle = () => {
    setIsToggling(true);
    setTimeout(() => {
      toggleMode();
      setIsToggling(false);
    }, 200);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        relative inline-flex items-center gap-3 rounded-full border-2 border-app bg-card 
        px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out
        hover:bg-accent-weak hover:border-accent/50 hover:scale-105 hover:shadow-lg
        button-press group overflow-hidden
        ${isToggling ? 'animate-pulse' : ''}
      `}
      title="라이트/다크 전환"
    >
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      
      <div className="relative flex items-center gap-3">
        <div className="relative">
          {/* 아이콘 컨테이너 */}
          <div className={`transition-all duration-500 ease-in-out ${isToggling ? 'rotate-180 scale-110' : ''}`}>
            {dark ? (
              <span className="text-xl animate-pulse">🌙</span>
            ) : (
              <span className="text-xl animate-pulse">☀️</span>
            )}
          </div>
          
          {/* 반짝이는 효과 */}
          {!dark && (
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-ping"></div>
          )}
        </div>
        
        <span className={`
          transition-all duration-300 font-semibold
          ${dark ? 'text-blue-300' : 'text-orange-600'}
          ${isToggling ? 'scale-95' : ''}
        `}>
          {dark ? "Dark" : "Light"}
        </span>
      </div>
      
      {/* 클릭 ripple 효과 */}
      {isToggling && (
        <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping"></div>
      )}
    </button>
  );
}