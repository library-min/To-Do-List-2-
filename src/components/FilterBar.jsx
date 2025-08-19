import { useState } from "react";

export default function FilterBar({
  filter,
  setFilter,
  remaining,
  hasCompleted,
  onClearCompleted,
}) {
  const [clickedFilter, setClickedFilter] = useState(null);
  const [isClearingCompleted, setIsClearingCompleted] = useState(false);

  const handleFilterClick = (key) => {
    setClickedFilter(key);
    setTimeout(() => {
      setFilter(key);
      setClickedFilter(null);
    }, 100);
  };

  const handleClearCompleted = () => {
    setIsClearingCompleted(true);
    setTimeout(() => {
      onClearCompleted();
      setIsClearingCompleted(false);
    }, 300);
  };

  const tab = (key, label, icon) => (
    <button
      key={key}
      onClick={() => handleFilterClick(key)}
      className={`
        relative px-4 py-2 text-sm font-medium rounded-xl border-2 transition-all duration-300 ease-in-out
        hover-lift button-press group overflow-hidden
        ${filter === key 
          ? "bg-accent text-white border-accent shadow-lg scale-105 ring-4 ring-accent/20" 
          : "border-app bg-card hover:bg-accent-weak hover:border-accent/50 text-app"
        }
        ${clickedFilter === key ? 'animate-pulse scale-110' : ''}
      `}
      aria-selected={filter === key}
      role="tab"
    >
      <div className="relative flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span>{label}</span>
      </div>
      
      {/* 활성 상태 배경 효과 */}
      {filter === key && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse rounded-xl"></div>
      )}
      
      {/* 호버 효과 */}
      <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 p-4 rounded-xl bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-900/50 border border-app/30">
      {/* 상태 표시 */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-card/70 rounded-full border border-app/50">
          <span className="text-lg animate-pulse">📊</span>
          <span className="text-sm text-muted">
            남은 일: <span className="font-bold text-accent animate-pulse">{remaining}</span>개
          </span>
        </div>
      </div>

      {/* 필터 버튼들 */}
      <div className="flex flex-wrap items-center gap-2 ml-auto">
        <div className="inline-flex items-center gap-2 p-1 bg-card/50 rounded-2xl border border-app/30" role="tablist" aria-label="필터">
          {tab("all", "전체", "📋")}
          {tab("active", "미완료", "⏳")}
          {tab("completed", "완료", "✅")}
        </div>
        
        <button
          onClick={handleClearCompleted}
          disabled={!hasCompleted || isClearingCompleted}
          className={`
            relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ease-in-out
            hover-lift button-press group overflow-hidden
            ${!hasCompleted 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50' 
              : 'bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white shadow-lg hover:shadow-xl'
            }
            ${isClearingCompleted ? 'animate-wiggle scale-110' : ''}
          `}
          title="완료 항목 비우기"
        >
          <div className="relative flex items-center gap-2">
            <span className={`text-base transition-transform duration-200 ${isClearingCompleted ? 'rotate-12 scale-125' : ''}`}>
              🧹
            </span>
            <span>완료 비우기</span>
          </div>
          
          {/* 호버 효과 */}
          {hasCompleted && (
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
          )}
          
          {/* 클릭 효과 */}
          {isClearingCompleted && (
            <div className="absolute inset-0 bg-white/30 animate-ping rounded-xl"></div>
          )}
        </button>
      </div>
    </div>
  );
}