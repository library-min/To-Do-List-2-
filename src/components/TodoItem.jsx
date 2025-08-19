import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onUpdate, categories, isSelected, onSelect }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category || "개인");
  const [editPriority, setEditPriority] = useState(todo.priority || "medium");
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ? todo.dueDate.split('T')[0] : "");
  const [editNotes, setEditNotes] = useState(todo.notes || "");

  const handleToggle = () => {
    setIsToggling(true);
    setTimeout(() => {
      onToggle();
      setIsToggling(false);
    }, 150);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 300);
  };

  const handleEdit = () => {
    if (editText.trim()) {
      onUpdate(todo.id, {
        text: editText.trim(),
        category: editCategory,
        priority: editPriority,
        dueDate: editDueDate || null,
        notes: editNotes.trim() || null
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setEditCategory(todo.category || "개인");
    setEditPriority(todo.priority || "medium");
    setEditDueDate(todo.dueDate ? todo.dueDate.split('T')[0] : "");
    setEditNotes(todo.notes || "");
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-500 bg-red-100 dark:bg-red-900/30";
      case "low": return "text-green-500 bg-green-100 dark:bg-green-900/30";
      default: return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high": return "🔴";
      case "low": return "🟢";
      default: return "🟡";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "개인": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      "업무": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      "쇼핑": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      "건강": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
    };
    return colors[category] || "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
  };

  if (isEditing) {
    return (
      <li className="rounded-2xl border-2 border-accent bg-card p-6 animate-bounce-in shadow-lg">
        <div className="space-y-4">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEdit();
              if (e.key === "Escape") handleCancelEdit();
            }}
            className="w-full p-3 bg-card border border-app/50 rounded-lg text-lg focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            autoFocus
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-1">카테고리</label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="w-full p-2 bg-card border border-app/50 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              >
                {categories?.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted mb-1">우선순위</label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="w-full p-2 bg-card border border-app/50 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              >
                <option value="high">🔴 높음</option>
                <option value="medium">🟡 보통</option>
                <option value="low">🟢 낮음</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted mb-1">마감일</label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full p-2 bg-card border border-app/50 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted mb-1">메모</label>
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="추가 정보나 메모를 입력하세요..."
              className="w-full p-2 bg-card border border-app/50 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
              rows="2"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex-1 py-2 px-4 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-all"
            >
              저장
            </button>
            <button
              onClick={handleCancelEdit}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg font-medium hover:opacity-90 transition-all"
            >
              취소
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li 
      className={`
        rounded-2xl border-2 border-app bg-card p-6 
        transition-all duration-300 ease-in-out hover-lift
        animate-slide-in-up hover:border-accent/30 hover:shadow-xl
        ${isDeleting ? 'animate-wiggle opacity-0 scale-95' : ''}
        ${todo.completed ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : ''}
        group relative overflow-hidden
      `}
    >
      {/* 배경 애니메이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* 상단: 선택 체크박스, 카테고리와 우선순위 */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {/* 선택 체크박스 */}
          {onSelect && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(todo.id)}
              className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
          )}
          
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(todo.category || "개인")}`}>
              📁 {todo.category || "개인"}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority || "medium")}`}>
              {getPriorityIcon(todo.priority || "medium")} {todo.priority === "high" ? "높음" : todo.priority === "low" ? "낮음" : "보통"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 transition-all"
            title="편집"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className={`
              p-2 rounded-lg bg-red-500/20 text-red-600 hover:bg-red-500/30 
              transition-all button-press
              ${isDeleting ? 'animate-wiggle scale-110' : ''}
            `}
            title="삭제"
          >
            <span className={`transition-transform duration-200 ${isDeleting ? 'rotate-180 scale-125' : ''}`}>
              🗑️
            </span>
          </button>
        </div>
      </div>
      
      {/* 메인 콘텐츠 */}
      <label className="flex items-center gap-4 cursor-pointer relative z-10">
        <div className="relative">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className={`
              h-7 w-7 rounded-full border-3 border-accent/50 
              bg-card appearance-none cursor-pointer
              transition-all duration-300 ease-in-out
              hover:border-accent hover:scale-110
              checked:bg-accent checked:border-accent
              focus:ring-4 focus:ring-accent/20
              ${isToggling ? 'animate-pulse scale-125' : ''}
            `}
            aria-label="완료 전환"
          />
          {todo.completed && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white text-lg font-bold animate-bounce-in">✓</span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <span 
            className={`
              text-xl font-medium transition-all duration-300 ease-in-out block
              ${todo.completed 
                ? "line-through text-muted/70 transform scale-95" 
                : "text-app hover:text-accent"
              }
              ${isToggling ? 'animate-pulse' : ''}
            `}
          >
            {todo.text}
          </span>
          
          {/* 생성 날짜 */}
          {todo.createdAt && (
            <span className="text-sm text-muted mt-1 block">
              📅 생성: {new Date(todo.createdAt).toLocaleDateString('ko-KR')}
            </span>
          )}
          
          {/* 마감일 */}
          {todo.dueDate && (
            <span className={`text-sm mt-1 block ${
              new Date(todo.dueDate) < new Date() && !todo.completed 
                ? 'text-red-500 font-medium' 
                : 'text-muted'
            }`}>
              ⏰ 마감: {new Date(todo.dueDate).toLocaleDateString('ko-KR')}
              {new Date(todo.dueDate) < new Date() && !todo.completed && ' (기한 초과)'}
            </span>
          )}
          
          {/* 완료 시간 */}
          {todo.completed && todo.completedAt && (
            <span className="text-sm text-green-600 mt-1 block">
              ✅ 완료: {new Date(todo.completedAt).toLocaleDateString('ko-KR')}
            </span>
          )}
          
          {/* 메모 */}
          {todo.notes && (
            <div className="text-sm text-muted mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              📝 {todo.notes}
            </div>
          )}
        </div>
        
        {todo.completed && (
          <span className="text-3xl animate-bounce-in">🎉</span>
        )}
      </label>
      
      {/* 호버 시 반짝이는 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
    </li>
  );
}