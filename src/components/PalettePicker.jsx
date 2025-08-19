import { useTheme } from "../ThemeContext";
import { useState } from "react";

export default function PalettePicker() {
  const { palette, setPalette } = useTheme();
  const [hoveredPalette, setHoveredPalette] = useState(null);
  const [clickedPalette, setClickedPalette] = useState(null);

  const palettes = [
    { key: "blue", label: "Blue", color: "bg-blue-500", hoverColor: "hover:bg-blue-600", ring: "ring-blue-500" },
    { key: "green", label: "Green", color: "bg-emerald-500", hoverColor: "hover:bg-emerald-600", ring: "ring-emerald-500" },
    { key: "purple", label: "Purple", color: "bg-violet-500", hoverColor: "hover:bg-violet-600", ring: "ring-violet-500" },
    { key: "pink", label: "Pink", color: "bg-pink-500", hoverColor: "hover:bg-pink-600", ring: "ring-pink-500" },
    { key: "orange", label: "Orange", color: "bg-amber-500", hoverColor: "hover:bg-amber-600", ring: "ring-amber-500" },
  ];

  const handlePaletteClick = (paletteKey) => {
    setClickedPalette(paletteKey);
    setTimeout(() => {
      setPalette(paletteKey);
      setClickedPalette(null);
    }, 150);
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-full bg-card/50 backdrop-blur-sm border border-app/50">
      {palettes.map((p, index) => (
        <button
          key={p.key}
          onClick={() => handlePaletteClick(p.key)}
          onMouseEnter={() => setHoveredPalette(p.key)}
          onMouseLeave={() => setHoveredPalette(null)}
          className={`
            relative w-10 h-10 rounded-full border-3 transition-all duration-300 ease-in-out
            hover-lift button-press overflow-hidden group
            ${p.color} ${p.hoverColor}
            ${palette === p.key 
              ? `border-white shadow-xl scale-110 ${p.ring} ring-4 ring-opacity-50` 
              : "border-gray-300/50 hover:border-white/70"
            }
            ${clickedPalette === p.key ? 'animate-pulse scale-125' : ''}
            ${hoveredPalette === p.key ? 'scale-110 shadow-lg' : ''}
          `}
          title={`${p.label} 팔레트`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* 선택된 팔레트 체크마크 */}
          {palette === p.key && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg font-bold animate-bounce-in drop-shadow-lg">
                ✓
              </span>
            </div>
          )}
          
          {/* 호버 시 라벨 툴팁 */}
          {hoveredPalette === p.key && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg animate-fade-in whitespace-nowrap">
              {p.label}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          )}
          
          {/* 반짝이는 효과 */}
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* 클릭 시 Ripple 효과 */}
          {clickedPalette === p.key && (
            <div className="absolute inset-0 rounded-full bg-white/50 animate-ping"></div>
          )}
        </button>
      ))}
    </div>
  );
}