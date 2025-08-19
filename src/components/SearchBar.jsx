import { useState } from "react";

export default function SearchBar({ searchQuery, onSearchChange, sortBy, onSortChange }) {
  const [isFocused, setIsFocused] = useState(false);

  const sortOptions = [
    { value: "newest", label: "최신순", icon: "🆕" },
    { value: "oldest", label: "오래된순", icon: "📅" },
    { value: "alphabetical", label: "가나다순", icon: "🔤" },
    { value: "priority", label: "우선순위", icon: "⭐" }
  ];

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-app/30 rounded-2xl p-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 검색 입력 */}
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className={`text-xl transition-transform duration-300 ${isFocused ? 'scale-110 rotate-12' : ''}`}>
              🔍
            </span>
          </div>
          <input
            type="text"
            placeholder="할 일이나 카테고리를 검색하세요..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
              w-full pl-14 pr-4 py-4 bg-card border-2 border-app/50 rounded-xl 
              text-lg placeholder:text-muted transition-all duration-300 ease-in-out
              focus:border-accent focus:ring-4 focus:ring-accent/20 focus:scale-[1.02]
              hover:border-accent/70 hover:shadow-lg
              ${isFocused ? 'bg-accent/5' : ''}
            `}
          />
          {/* 포커스 시 그라데이션 효과 */}
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 pointer-events-none ${isFocused ? 'opacity-100' : ''}`}></div>
          
          {/* 검색어 클리어 버튼 */}
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted hover:text-accent transition-colors animate-fade-in"
            >
              <span className="text-xl hover:scale-110 transition-transform">❌</span>
            </button>
          )}
        </div>

        {/* 정렬 선택 */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-card border-2 border-app/50 rounded-xl px-4 py-4 pr-12 text-lg font-medium hover:border-accent/70 focus:border-accent focus:ring-4 focus:ring-accent/20 transition-all duration-300 cursor-pointer hover:shadow-lg"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <span className="text-accent animate-pulse">⬇️</span>
          </div>
        </div>
      </div>

      {/* 검색 결과 표시 */}
      {searchQuery && (
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-xl border border-accent/20 animate-slide-in-up">
          <span className="text-base">🔍</span>
          <span className="text-sm text-muted">
            "<span className="font-semibold text-accent">{searchQuery}</span>" 검색 중...
          </span>
          <div className="ml-auto">
            <button
              onClick={() => onSearchChange("")}
              className="text-sm text-muted hover:text-accent transition-colors px-2 py-1 rounded-lg hover:bg-accent/10"
            >
              지우기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}