import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useToast } from "./contexts/ToastContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import StatsCard from "./components/StatsCard";
import CategoryManager from "./components/CategoryManager";
import BulkActions from "./components/BulkActions";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import ToastContainer from "./components/common/ToastContainer";

function TodoApp() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos") || "[]"));
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | alphabetical | priority
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem("categories") || '["개인", "업무", "쇼핑", "건강"]'));
  const [selectedTodos, setSelectedTodos] = useState([]);

  const persist = (next) => localStorage.setItem("todos", JSON.stringify(next));
  const persistCategories = (next) => localStorage.setItem("categories", JSON.stringify(next));

  const addTodo = (text, category = "개인", priority = "medium", dueDate = "", notes = "") => {
    if (!text.trim()) return;
    const next = [...todos, { 
      id: Date.now(), 
      text: text.trim(), 
      completed: false,
      category,
      priority,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || null,
      notes: notes.trim() || null,
      completedAt: null
    }];
    setTodos(next); 
    persist(next);
  };

  const toggleTodo = (id) => {
    const next = todos.map((t) => 
      t.id === id 
        ? { 
            ...t, 
            completed: !t.completed,
            completedAt: !t.completed ? new Date().toISOString() : null
          } 
        : t
    );
    setTodos(next); persist(next);
  };

  const deleteTodo = (id) => {
    const next = todos.filter((t) => t.id !== id);
    setTodos(next); persist(next);
  };

  const updateTodo = (id, updates) => {
    const next = todos.map((t) => (t.id === id ? { ...t, ...updates } : t));
    setTodos(next); persist(next);
  };

  const clearCompleted = () => {
    const next = todos.filter((t) => !t.completed);
    setTodos(next); persist(next);
  };

  const addCategory = (name) => {
    if (name.trim() && !categories.includes(name.trim())) {
      const next = [...categories, name.trim()];
      setCategories(next);
      persistCategories(next);
    }
  };

  const deleteCategory = (name) => {
    const next = categories.filter(c => c !== name);
    setCategories(next);
    persistCategories(next);
    if (selectedCategory === name) {
      setSelectedCategory("all");
    }
  };

  // 일괄 선택 관련 함수들
  const handleSelectTodo = (id) => {
    setSelectedTodos(prev => 
      prev.includes(id) 
        ? prev.filter(todoId => todoId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedTodos(filtered.map(todo => todo.id));
  };

  const handleDeselectAll = () => {
    setSelectedTodos([]);
  };

  const handleBulkComplete = () => {
    const next = todos.map(todo => 
      selectedTodos.includes(todo.id) 
        ? { ...todo, completed: true, completedAt: new Date().toISOString() }
        : todo
    );
    setTodos(next);
    persist(next);
    setSelectedTodos([]);
  };

  const handleBulkDelete = () => {
    const next = todos.filter(todo => !selectedTodos.includes(todo.id));
    setTodos(next);
    persist(next);
    setSelectedTodos([]);
  };

  const handleBulkMove = (category) => {
    const next = todos.map(todo => 
      selectedTodos.includes(todo.id) 
        ? { ...todo, category }
        : todo
    );
    setTodos(next);
    persist(next);
    setSelectedTodos([]);
  };

  const remaining = todos.filter((t) => !t.completed).length;
  const completed = todos.filter((t) => t.completed).length;

  const filtered = useMemo(() => {
    let result = todos;

    // 카테고리 필터
    if (selectedCategory !== "all") {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // 완료 상태 필터
    if (filter === "active") result = result.filter((t) => !t.completed);
    if (filter === "completed") result = result.filter((t) => t.completed);

    // 검색 필터
    if (searchQuery) {
      result = result.filter((t) => 
        t.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 정렬
    result.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "alphabetical":
          return a.text.localeCompare(b.text);
        case "priority": {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
        }
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return result;
  }, [todos, filter, searchQuery, sortBy, selectedCategory]);

  return (
    <div className="min-h-screen bg-app text-app transition-all duration-500 ease-in-out">
      <Header />

      {/* 메인 컨테이너 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 상단 통계 카드들 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatsCard 
            title="전체 할 일" 
            value={todos.length} 
            icon="📋"
          />
          <StatsCard 
            title="남은 할 일" 
            value={remaining} 
            icon="⏳"
          />
          <StatsCard 
            title="완료된 일" 
            value={completed} 
            icon="✅"
          />
          <StatsCard 
            title="완료율" 
            value={todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0} 
            icon="📊"
            suffix="%"
          />
          <StatsCard 
            title="카테고리 수" 
            value={categories.length} 
            icon="📁"
          />
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 */}
          <div className="lg:col-span-1 space-y-6">
            <CategoryManager 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onAddCategory={addCategory}
              onDeleteCategory={deleteCategory}
              totalTodos={todos.length}
            />
          </div>

          {/* 메인 할 일 영역 */}
          <div className="lg:col-span-3 space-y-6">
            {/* 할 일 입력 */}
            <div>
              <TodoInput 
                onAdd={addTodo} 
                categories={categories}
                selectedCategory={selectedCategory !== "all" ? selectedCategory : undefined}
              />
            </div>

            {/* 검색 및 정렬 */}
            <div>
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* 필터 바 */}
            <div>
              <FilterBar
                filter={filter}
                setFilter={setFilter}
                remaining={remaining}
                hasCompleted={todos.some((t) => t.completed)}
                onClearCompleted={clearCompleted}
              />
            </div>

            {/* 일괄 작업 */}
            <div>
              <BulkActions 
                selectedTodos={selectedTodos}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                onBulkComplete={handleBulkComplete}
                onBulkDelete={handleBulkDelete}
                onBulkMove={handleBulkMove}
                categories={categories}
                totalTodos={filtered.length}
              />
            </div>

            {/* 할 일 목록 */}
            <div>
              <TodoList 
                todos={filtered} 
                onToggle={toggleTodo} 
                onDelete={deleteTodo}
                onUpdate={updateTodo}
                categories={categories}
                selectedTodos={selectedTodos}
                onSelect={handleSelectTodo}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
<<<<<<< HEAD
  try {
    const { login, register, loading } = useAuth();
    const { toasts, removeToast } = useToast();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    return (
      <>
        <Routes>
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register onRegister={register} />} />
          <Route path="/" element={<TodoApp />} />
        </Routes>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  } catch (error) {
    console.error('App error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">앱 로딩 중 오류가 발생했습니다</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            페이지 새로고침
          </button>
        </div>
      </div>
    );
  }
=======
  const { login, register, loading } = useAuth();
  const { toasts, removeToast } = useToast();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app text-app">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register onRegister={register} />} />
        <Route path="/" element={<TodoApp />} />
      </Routes>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
>>>>>>> 3aa2f09ae87276ca2317e7294239b1ea6bda4c8e
}