import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete, onUpdate, categories, selectedTodos, onSelect }) {
  if (todos.length === 0) {
    return (
      <div className="mt-4">
        <div className="rounded-2xl border-2 border-dashed border-app/30 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-900/50 p-8 text-center animate-fade-in">
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl animate-pulse">📝</div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-muted">아직 할 일이 없습니다</h3>
              <p className="text-sm text-muted/70">위에서 새로운 할 일을 추가해보세요!</p>
            </div>
            <div className="flex items-center gap-2 text-2xl animate-bounce">
              <span>✨</span>
              <span>🚀</span>
              <span>⭐</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <ul className="space-y-3">
        {todos.map((todo, index) => (
          <div 
            key={todo.id}
            className="animate-slide-in-up"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'backwards'
            }}
          >
            <TodoItem 
              todo={todo} 
              onToggle={() => onToggle(todo.id)} 
              onDelete={() => onDelete(todo.id)}
              onUpdate={onUpdate}
              categories={categories}
              isSelected={selectedTodos?.includes(todo.id)}
              onSelect={onSelect}
            />
          </div>
        ))}
      </ul>
      
      {/* 할 일 목록 하단 장식 */}
      {todos.length > 0 && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-app/30 animate-fade-in">
            <span className="text-sm text-muted">총</span>
            <span className="font-bold text-accent">{todos.length}</span>
            <span className="text-sm text-muted">개의 할 일</span>
            <span className="text-lg animate-pulse">📋</span>
          </div>
        </div>
      )}
    </div>
  );
}