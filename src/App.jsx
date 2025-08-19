import { useMemo, useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";
import PalettePicker from "./components/PalettePicker";
import SearchBar from "./components/SearchBar";
import StatsCard from "./components/StatsCard";
import CategoryManager from "./components/CategoryManager";
import BulkActions from "./components/BulkActions";
import { Routes, Route } from 'react-router-dom';

function HomePage() {
  return <h1>홈 페이지입니다.</h1>;
}

function SignupPage() {
  return <h1>회원가입 페이지입니다.</h1>;
}

export default function App() {
  const { mode } = useTheme();
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
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return result;
  }, [todos, filter, searchQuery, sortBy, selectedCategory]);

  return (
    <div className="min-h-screen transition-all duration-500 ease-in-out bg-app text-app">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-app/90 backdrop-blur-md border-app/20">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-app">
                📋 Task Manager
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <PalettePicker />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨테이너 */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* 상단 통계 카드들 */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-5">
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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* 사이드바 */}
          <div className="space-y-6 lg:col-span-1">
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
          <div className="space-y-6 lg:col-span-3">
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