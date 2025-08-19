import { useState } from "react";

export default function BulkActions({ 
  selectedTodos, 
  onSelectAll, 
  onDeselectAll, 
  onBulkComplete, 
  onBulkDelete, 
  onBulkMove,
  categories,
  totalTodos 
}) {
  const [showMoveOptions, setShowMoveOptions] = useState(false);

  if (selectedTodos.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* 선택 정보 */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            📋 {selectedTodos.length}개 항목 선택됨
          </span>
          <button
            onClick={selectedTodos.length === totalTodos ? onDeselectAll : onSelectAll}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {selectedTodos.length === totalTodos ? "전체 해제" : "전체 선택"}
          </button>
        </div>

        {/* 일괄 작업 버튼들 */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onBulkComplete}
            className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            ✅ 완료 처리
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowMoveOptions(!showMoveOptions)}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              📁 카테고리 이동
            </button>
            
            {showMoveOptions && (
              <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-40">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onBulkMove(category);
                      setShowMoveOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    📁 {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={onBulkDelete}
            className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            🗑️ 삭제
          </button>
          
          <button
            onClick={onDeselectAll}
            className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
          >
            ❌ 선택 해제
          </button>
        </div>
      </div>
    </div>
  );
}