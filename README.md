# 📋 Smart Todo

## 📸 스크린샷

<div align="center">
  <img src="https://via.placeholder.com/800x500/6366f1/ffffff?text=Smart+Todo+Main+Interface" alt="메인 화면" width="49%">
  <img src="https://via.placeholder.com/800x500/10b981/ffffff?text=Statistics+Dashboard" alt="통계 대시보드" width="49%">
  <img src="https://via.placeholder.com/800x500/f59e0b/ffffff?text=Pomodoro+Timer" alt="뽀모도로 타이머" width="49%">
  <img src="https://via.placeholder.com/800x500/ef4444/ffffff?text=Dark+Mode" alt="다크 모드" width="49%">
</div>

---

## ✨ 주요 기능

### 🎮 **게이미피케이션 시스템**
- **포인트 & 레벨링**: 할 일 완료 시 포인트 획득 및 레벨 업
- **뱃지 시스템**: 성취에 따른 다양한 뱃지 수집 (첫 걸음, 성실함, 연속 완주)
- **우선순위 보너스**: 높은 우선순위 작업 완료 시 추가 포인트

### ⏱️ **커스터마이징 가능한 뽀모도로 타이머**
- **시간 설정**: 집중(1–60분), 짧은 휴식(1–30분), 긴 휴식(1–60분)
- **사이클 관리**: 4사이클 완료 후 자동 긴 휴식 전환
- **진행률 표시**: SVG 원형 프로그레스바
- **알림 시스템**: 브라우저 푸시 알림 지원

### 📊 **통계 및 분석 대시보드**
- **인터랙티브 차트**: Chart.js 기반 막대/도넛 차트
- **다중 시간 범위**: 최근 7일, 4주, 12개월 선택 가능
- **완료 통계**: 시간대별 완료 추이
- **우선순위 분석**: 중요도별 완료율 시각화
- **실시간 대시보드**: 오늘/이번 주 진행률 카드

### 🔧 **상호작용**
- 드래그 앤 드롭: 순서 변경  
- 인라인 편집: 더블클릭 수정  
- 실시간 검색: 제목 / 우선순위  
- 상단 네비: 고정 헤더 + 토글  

### 🔧 **생산성 도구**
- **스마트 우선순위**: 3단계 우선순위 + 색상 구분 (🔴/🟡/🟢)
- **마감일 추적**: 자동 상태 감지 (지남/오늘/내일/곧)
- **완료/미완료 필터**: 선택적 표시
- **아카이브 시스템**: 완료 작업 별도 보관 및 복원
- **할 일 복제**: 반복 작업 원클릭 생성

### 🎭 **테마 & 접근성**
- 다크/라이트 모드 (자동 감지 + 수동 전환)  
- 완전 반응형 (모바일 320px ~ 데스크톱 1920px+)  
- 키보드 네비게이션 (Enter/Escape 지원)  
- 로컬 저장소 (데이터 지속성 보존)  

---

## 🏗️ 기술 스택

<div align="center">

### 🔧 **Core Technologies**

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-f7df1e?style=for-the-badge&logo=javascript)](https://javascript.com/)

### 📊 **Libraries & Frameworks**

[![Chart.js](https://img.shields.io/badge/Chart.js-4.5.0-ff6384?style=for-the-badge&logo=chart.js)](https://www.chartjs.org/)
[![DND Kit](https://img.shields.io/badge/DND_Kit-6.3.1-00d9ff?style=for-the-badge)](https://dndkit.com/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572b6?style=for-the-badge&logo=css3)](https://www.w3.org/Style/CSS/)

### 🌐 **Browser APIs**

![Local Storage](https://img.shields.io/badge/Local_Storage-Persistent-orange?style=for-the-badge)
![Notification API](https://img.shields.io/badge/Notification_API-PWA_Ready-green?style=for-the-badge)
![Media Query](https://img.shields.io/badge/Media_Query-Responsive-blue?style=for-the-badge)

</div>

<details>
<summary><strong>🔍 상세 기술 스택</strong></summary>

<table>
<tr>
<td width="33%">

**Frontend Core**
- React 19.1.1 (Hooks & FC)
- Vite 7.1.2 (HMR & Bundling)
- Modern JavaScript (ES2024)

</td>
<td width="33%">

**UI & Styling**
- Pure CSS (Custom Properties)
- CSS Grid & Flexbox
- CSS Animations & Transitions
- Modern Design System

</td>
<td width="33%">

**Data & APIs**
- Chart.js (Data Visualization)
- @dnd-kit (Drag & Drop)
- Local Storage (Persistence)
- Notification API (PWA)

</td>
</tr>
</table>

</details>

---

## 📁 프로젝트 구조

src/
├── components/
│ ├── TodoList.jsx # 메인 할 일 관리
│ ├── TodoList.css # 메인 스타일시트
│ ├── PomodoroTimer.jsx # 뽀모도로 타이머 & 설정
│ ├── PomodoroTimer.css # 타이머 전용 스타일
│ ├── Statistics.jsx # 통계 차트 & 분석
│ ├── Statistics.css # 차트 컴포넌트 스타일
│ ├── GameStats.jsx # 게이미피케이션 UI
│ ├── GameStats.css # 레벨/뱃지 스타일
│ ├── ThemeToggle.jsx # 다크/라이트 테마 전환
│ └── ThemeToggle.css # 토글 스위치 스타일
├── assets/ # 정적 리소스
├── App.jsx # 루트 컴포넌트
├── App.css # 글로벌 스타일
├── index.css # CSS 변수 & 기본 설정
└── main.jsx # ReactDOM 렌더링

php-template
복사
편집

---

## 🌟 향후 개발 로드맵

### **Phase 1: PWA & 오프라인**
- [ ] Service Worker 구현
- [ ] 앱 설치 프롬프트
- [ ] 오프라인 동작 지원
- [ ] 백그라운드 동기화

### **Phase 2: 클라우드 & 동기화**
- [ ] Firebase/Supabase 연동
- [ ] 실시간 다기기 동기화
- [ ] 사용자 인증 시스템
- [ ] 데이터 백업/복원

### **Phase 3: AI & 고급 기능**
- [ ] 머신러닝 우선순위 추천
- [ ] 자연어 할 일 입력 파싱
- [ ] 생산성 패턴 분석
- [ ] 개인화된 인사이트

### **Phase 4: 협업 & 확장**
- [ ] 팀 워크스페이스
- [ ] 할 일 공유 및 할당
- [ ] 실시간 협업 편집
- [ ] 프로젝트 템플릿

---

### 🎯 **성능 지표**

![Lighthouse Performance](https://img.shields.io/badge/Performance-95%2B-brightgreen?style=flat-square)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-100-brightgreen?style=flat-square)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100-brightgreen?style=flat-square)
![Lighthouse SEO](https://img.shields.io/badge/SEO-95%2B-brightgreen?style=flat-square)

---

## 📱 브라우저 호환성

| 브라우저 | 데스크톱 | 모바일 | 주요 기능 |
|----------|---------|---------|-----------|
| Chrome   | ✅ 90+  | ✅ 90+  | 모든 기능 |
| Firefox  | ✅ 88+  | ✅ 88+  | 모든 기능 |
| Safari   | ✅ 14+  | ✅ 14+  | 알림 제한적 |
| Edge     | ✅ 90+  | ✅ 90+  | 모든 기능 |

---

<div align="center">

## **이 프로젝트가 마음에 드셨나요?**

**⭐ 눌러주시면 개발자에게 큰 힘이 됩니다!**

<table>
<tr>
<td align="center">
<a href="https://github.com/yourusername/smart-todo">
<img src="https://img.shields.io/github/stars/yourusername/smart-todo.svg?style=for-the-badge&logo=github&color=yellow" alt="GitHub stars">
</a>
<br>
<strong>⭐ Star</strong>
</td>
<td align="center">
<a href="https://github.com/yourusername/smart-todo/fork">
<img src="https://img.shields.io/github/forks/yourusername/smart-todo.svg?style=for-the-badge&logo=github&color=blue" alt="GitHub forks">
</a>
<br>
<strong>🍴 Fork</strong>
</td>
<td align="center">
<a href="https://github.com/yourusername/smart-todo/watchers">
<img src="https://img.shields.io/github/watchers/yourusername/smart-todo.svg?style=for-the-badge&logo=github&color=green" alt="GitHub watchers">
</a>
<br>
<strong>👀 Watch</strong>
</td>
<td align="center">
<a href="https://github.com/yourusername/smart-todo/issues">
<img src="https://img.shields.io/github/issues/yourusername/smart-todo.svg?style=for-the-badge&logo=github&color=red" alt="GitHub issues">
</a>
<br>
<strong>🐛 Issues</strong>
</td>
</tr>
</table>

**Made with ❤️ by [서재민](https://github.com/library_min)**

</div>
