import { useState } from "react";

export default function TodoInput({ onAdd, categories, selectedCategory }) {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState(selectedCategory || categories[0] || "개인");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const submit = async () => {
    if (!value.trim()) return;
    
    setIsAdding(true);
    
    // 애니메이션을 위한 작은 지연
    setTimeout(() => {
      onAdd(value, category, priority, dueDate, notes);
      setValue("");
      setDueDate("");
      setNotes("");
      setIsAdding(false);
    }, 200);
  };

  const priorityOptions = [
    { value: "high", label: "높음", icon: "🔴", color: "text-red-500" },
    { value: "medium", label: "보통", icon: "🟡", color: "text-yellow-500" },
    { value: "low", label: "낮음", icon: "🟢", color: "text-green-500" }
  ];

  return (
    <div className="bg-card/70 backdrop-blur-sm border border-app/30 rounded-2xl p-6 space-y-4">
      {/* 메인 입력 영역 */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative group">
          <input
            className="w-full rounded-xl border-2 border-app bg-card px-5 py-4 outline-none text-app placeholder:text-muted
                       transition-all duration-300 ease-in-out
                       focus:border-accent focus:ring-4 ring-accent/20 focus:scale-[1.01]
                       hover:shadow-lg hover:border-accent/50
                       text-lg placeholder:text-base"
            placeholder="✨ 새로운 할 일을 추가해보세요..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && submit()}
            aria-label="할 일 입력"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        
        {/* 고급 설정 토글 */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`
            p-4 rounded-xl border-2 transition-all duration-300 hover-lift
            ${showAdvanced 
              ? 'border-accent bg-accent text-white shadow-lg' 
              : 'border-app bg-card hover:border-accent/50'
            }
          `}
          title="고급 설정"
        >
          <span className={`text-lg transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`}>
            ⚙️
          </span>
        </button>
        
        <button
          onClick={submit}
          disabled={!value.trim() || isAdding}
          className={`
            relative rounded-xl px-6 py-4 font-bold text-white transition-all duration-300 ease-in-out
            hover-lift button-press
            ${!value.trim() || isAdding
              ? 'bg-gray-400 cursor-not-allowed opacity-60' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
            }
            ${isAdding ? 'animate-pulse' : ''}
          `}
        >
          <span className={`flex items-center gap-2 ${isAdding ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
            <span className="text-lg">➕</span>
            추가
          </span>
          
          {isAdding && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </div>

      {/* 고급 설정 영역 */}
      {showAdvanced && (
        <div className="space-y-4 p-4 bg-accent/5 rounded-xl border border-accent/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 카테고리 선택 */}
            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                📁 카테고리
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-card border border-app/50 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 마감일 선택 */}
            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                📅 마감일
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3 bg-card border border-app/50 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
          </div>

          {/* 우선순위 선택 */}
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              ⭐ 우선순위
            </label>
            <div className="flex gap-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPriority(option.value)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-300
                    ${priority === option.value 
                      ? 'border-accent bg-accent/10 text-accent' 
                      : 'border-app/50 bg-card hover:border-accent/50'
                    }
                  `}
                >
                  <span>{option.icon}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 메모 입력 */}
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              📝 메모 (선택사항)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="추가 정보나 메모를 입력하세요..."
              className="w-full p-3 bg-card border border-app/50 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
              rows="3"
            />
          </div>
        </div>
      )}

      {/* 빠른 액션 */}
      <div className="flex items-center justify-between text-sm text-muted">
        <div className="flex items-center gap-4">
          <span>📁 {category}</span>
          <span>⭐ {priorityOptions.find(p => p.value === priority)?.label}</span>
          {dueDate && <span>📅 {new Date(dueDate).toLocaleDateString('ko-KR')}</span>}
          {notes && <span>📝 메모 있음</span>}
        </div>
        <div className="flex items-center gap-2">
          <span>💡 Tip: Shift+Enter로 줄바꿈</span>
        </div>
      </div>
    </div>
  );
}