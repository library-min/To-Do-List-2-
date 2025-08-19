export default function StatsCard({ title, value, icon, color, delay, suffix = "" }) {
  return (
    <div className="rounded-2xl bg-card border border-app/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-2xl">
          <span className="block">{icon}</span>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-app">
            {value}
            <span className="text-lg text-muted ml-1">{suffix}</span>
          </div>
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-muted uppercase tracking-wider">
        {title}
      </h3>
      
      {/* 프로그레스 바 (완료율용) */}
      {suffix === "%" && (
        <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gray-400 dark:bg-gray-500 rounded-full"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}