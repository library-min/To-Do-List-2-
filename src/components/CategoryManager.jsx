import { useState } from "react";

export default function CategoryManager({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  onAddCategory, 
  onDeleteCategory,
  totalTodos
}) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName("");
      setIsAdding(false);
    }
  };

  const categoryColors = {
    "개인": "bg-blue-500",
    "업무": "bg-orange-500", 
    "쇼핑": "bg-green-500",
    "건강": "bg-pink-500"
  };

  const getRandomColor = () => {
    const colors = ["bg-purple-500", "bg-indigo-500", "bg-teal-500", "bg-red-500", "bg-yellow-500"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="space-y-6">
      {/* 카테고리 제목 */}
      <div className="bg-card/70 backdrop-blur-sm border border-app/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📁</span>
          <h2 className="text-xl font-bold text-app">카테고리</h2>
        </div>

        {/* 전체 카테고리 */}
        <button
          onClick={() => onSelectCategory("all")}
          className={`
            w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 mb-3
            hover-lift button-press group
            ${selectedCategory === "all" 
              ? "bg-accent text-white shadow-lg scale-105 ring-4 ring-accent/20" 
              : "bg-card/50 hover:bg-accent/10 border border-app/30"
            }
          `}
        >
          <div className={`w-4 h-4 rounded-full ${selectedCategory === "all" ? "bg-white" : "bg-gradient-to-r from-purple-500 to-blue-500"} group-hover:scale-110 transition-transform`}></div>
          <span className="font-medium">전체</span>
          <span className="ml-auto text-sm opacity-70">모든 할 일</span>
        </button>

        {/* 카테고리 목록 */}
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div
              key={category}
              className={`
                flex items-center gap-3 p-4 rounded-xl transition-all duration-300
                hover-lift group relative overflow-hidden
                ${selectedCategory === category 
                  ? "bg-accent text-white shadow-lg scale-105 ring-4 ring-accent/20" 
                  : "bg-card/50 hover:bg-accent/10 border border-app/30"
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 배경 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <button
                onClick={() => onSelectCategory(category)}
                className="flex items-center gap-3 flex-1 relative z-10"
              >
                <div className={`w-4 h-4 rounded-full ${categoryColors[category] || getRandomColor()} group-hover:scale-110 transition-transform shadow-lg`}></div>
                <span className="font-medium">{category}</span>
              </button>
              
              {/* 삭제 버튼 */}
              {categories.length > 1 && (
                <button
                  onClick={() => onDeleteCategory(category)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg hover:bg-red-500/20 relative z-10"
                  title="카테고리 삭제"
                >
                  <span className="text-red-500 hover:scale-110 transition-transform">🗑️</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 새 카테고리 추가 */}
        <div className="mt-4">
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-app/50 rounded-xl hover:border-accent/70 hover:bg-accent/5 transition-all duration-300 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">➕</span>
              <span className="font-medium text-muted group-hover:text-accent">새 카테고리</span>
            </button>
          ) : (
            <div className="space-y-3 p-4 bg-accent/5 rounded-xl border border-accent/20 animate-slide-in-up">
              <input
                type="text"
                placeholder="카테고리 이름..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                className="w-full p-3 bg-card border border-app/50 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="flex-1 py-2 px-4 bg-accent text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                >
                  추가
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewCategoryName("");
                  }}
                  className="py-2 px-4 bg-gray-500 text-white rounded-lg font-medium hover:opacity-90 transition-all text-sm"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 빠른 통계 */}
      <div className="bg-card/70 backdrop-blur-sm border border-app/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h3 className="text-lg font-bold text-app">빠른 통계</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
            <span className="text-sm text-muted">총 할 일</span>
            <span className="font-bold text-accent">{totalTodos || 0}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
            <span className="text-sm text-muted">카테고리 수</span>
            <span className="font-bold text-accent">{categories.length}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
            <span className="text-sm text-muted">선택된 카테고리</span>
            <span className="font-bold text-accent">{selectedCategory === "all" ? "전체" : selectedCategory}</span>
          </div>
        </div>
      </div>
    </div>
  );
}