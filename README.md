# 📋 Task Manager

## 📸 스크린샷

<div align="center">
  <img src="https://via.placeholder.com/800x500/6366f1/ffffff?text=Smart+Todo+Main+Interface" alt="메인 화면" width="49%">
  <img src="https://via.placeholder.com/800x500/10b981/ffffff?text=Statistics+Dashboard" alt="통계 대시보드" width="49%">
  <img src="https://via.placeholder.com/800x500/f59e0b/ffffff?text=User+Authentication" alt="사용자 인증" width="49%">
  <img src="https://via.placeholder.com/800x500/ef4444/ffffff?text=Dark+Mode" alt="다크 모드" width="49%">
</div>

## ✨ 주요 기능

### 👤 **사용자 인증 시스템**
- **회원가입 & 로그인**: 이메일 기반 사용자 계정 관리
- **데모 계정 지원**: demo@example.com / demo123으로 즉시 체험
- **자동 로그인 유지**: 브라우저 재시작 후에도 로그인 상태 유지
- **토스트 알림**: 로그인/로그아웃/회원가입 성공/실패 시 예쁜 팝업 알림

### 📋 **할 일 관리 시스템**
- **스마트 입력**: 카테고리, 우선순위, 마감일, 메모를 한 번에 설정
- **인라인 편집**: 할 일 텍스트를 더블클릭하여 즉시 수정
- **완료 상태 토글**: 체크박스로 간편한 완료/미완료 전환
- **할 일 삭제**: 확인 없이 바로 삭제되는 심플한 UX

### 🏷️ **카테고리 시스템**
- **기본 카테고리**: 개인, 업무, 쇼핑, 건강 4개 기본 제공
- **커스텀 카테고리**: 사용자 정의 카테고리 무제한 추가 가능
- **카테고리별 필터링**: 좌측 사이드바에서 원하는 카테고리만 선택
- **동적 관리**: 카테고리 추가/삭제 시 관련 할 일들도 자동 처리

### ⭐ **우선순위 & 일정 관리**
- **3단계 우선순위**: 높음(🔴), 보통(🟡), 낮음(🟢) 색상 구분
- **우선순위별 정렬**: 중요한 일부터 먼저 표시하는 스마트 정렬
- **마감일 설정**: 날짜 선택기로 쉬운 마감일 설정
- **완료 시간 추적**: 완료된 할 일의 정확한 완료 시간 기록

### 🔍 **검색 & 필터링**
- **실시간 검색**: 입력과 동시에 즉시 필터링되는 검색
- **다중 정렬 옵션**: 최신순/오래된순/가나다순/우선순위순 4가지
- **상태별 필터**: 전체/진행중/완료된 할 일 3단계 필터
- **카테고리 + 검색 조합**: 카테고리 내에서 키워드 검색 가능

### 📊 **실시간 대시보드**
- **5개 통계 카드**: 전체/남은/완료된 할 일, 완료율, 카테고리 수
- **실시간 업데이트**: 할 일 변경 시 모든 통계 즉시 반영  
- **진행률 시각화**: 완료율을 %로 표시하는 직관적 대시보드
- **반응형 그리드**: 모바일에서는 2x3, 데스크톱에서는 5x1 레이아웃

### 🎯 **일괄 작업 도구**
- **다중 선택**: 개별 체크박스로 원하는 할 일만 선택
- **전체 선택/해제**: 한 번의 클릭으로 모든 할 일 선택/해제
- **일괄 완료**: 선택된 모든 할 일을 한 번에 완료 처리
- **일괄 삭제**: 불필요한 할 일들을 한 번에 삭제
- **일괄 카테고리 이동**: 선택된 할 일들을 다른 카테고리로 이동

### 🎨 **테마 & 디자인 시스템**
- **다크/라이트 모드**: 시스템 설정 감지 + 수동 토글 지원
- **다양한 색상 팔레트**: 7가지 컬러 테마 (블루, 그린, 퍼플, 핑크, 옐로우, 오렌지, 레드)
- **완전 반응형**: 모바일(320px)부터 대형 데스크톱(1920px+)까지 최적화
- **부드러운 애니메이션**: 모든 상호작용에 자연스러운 트랜지션 적용

### 🔔 **알림 시스템**
- **토스트 알림**: 우측 상단에 나타나는 예쁜 팝업 알림
- **4가지 알림 타입**: 성공(초록), 에러(빨강), 경고(노랑), 정보(파랑)
- **자동 사라짐**: 3초 후 자동으로 사라지는 스마트 타이밍
- **수동 닫기**: X 버튼으로 언제든 알림 닫기 가능

## 🏗️ 기술 스택

<div align="center">

### 🔧 **Core Technologies**

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-f7df1e?style=for-the-badge&logo=javascript)](https://javascript.com/)

### 🎨 **UI & Styling**

[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38b2ac?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572b6?style=for-the-badge&logo=css3)](https://www.w3.org/Style/CSS/)
[![PostCSS](https://img.shields.io/badge/PostCSS-8.4.49-dd3a0a?style=for-the-badge&logo=postcss)](https://postcss.org/)

### 🌐 **Routing & State**

[![React Router](https://img.shields.io/badge/React_Router-7.8.1-ca4245?style=for-the-badge&logo=react-router)](https://reactrouter.com/)
[![Context API](https://img.shields.io/badge/Context_API-Built_in-61dafb?style=for-the-badge)](https://reactjs.org/docs/context.html)

### 💾 **Data & Storage**

![Local Storage](https://img.shields.io/badge/Local_Storage-Persistent-orange?style=for-the-badge)
![Session Management](https://img.shields.io/badge/Session_Management-Custom-blue?style=for-the-badge)

</div>

<details>
<summary><strong>🔍 상세 기술 스택</strong></summary>

<table>
<tr>
<td width="33%">

**Frontend Core**
- React 19.1.1 (Hooks & Context)
- Vite 7.1.2 (Dev Server & Build)
- Modern JavaScript (ES2024)
- React Router DOM 7.8.1

</td>
<td width="33%">

**UI & Styling**
- Tailwind CSS 3.4.15
- PostCSS 8.4.49
- Autoprefixer 10.4.20
- Custom CSS Animations
- Responsive Design System

</td>
<td width="33%">

**State & Data**
- React Context API
- Local Storage API
- Form Validation
- Toast Notification System
- Authentication System

</td>
</tr>
</table>

</details>

## 📁 프로젝트 구조

```
src/
├── components/              # React 컴포넌트
│   ├── common/             # 공통 컴포넌트
│   │   ├── AuthCard.jsx    # 인증 페이지 공통 레이아웃
│   │   ├── FormField.jsx   # 재사용 가능한 폼 필드
│   │   ├── Toast.jsx       # 토스트 알림 컴포넌트
│   │   └── ToastContainer.jsx # 토스트 컨테이너
│   ├── BulkActions.jsx     # 일괄 작업 도구
│   ├── CategoryManager.jsx # 카테고리 관리
│   ├── FilterBar.jsx       # 필터 바
│   ├── Header.jsx          # 공통 헤더
│   ├── Login.jsx           # 로그인 페이지
│   ├── Register.jsx        # 회원가입 페이지
│   ├── SearchBar.jsx       # 검색 바
│   ├── StatsCard.jsx       # 통계 카드
│   ├── TodoInput.jsx       # 할 일 입력
│   ├── TodoItem.jsx        # 할 일 아이템
│   ├── TodoList.jsx        # 할 일 목록
│   ├── ThemeToggle.jsx     # 테마 토글
│   └── PalettePicker.jsx   # 색상 팔레트 선택기
├── contexts/               # React 컨텍스트
│   ├── AuthContext.jsx     # 인증 상태 관리
│   └── ToastContext.jsx    # 토스트 알림 관리
├── styles/                 # 스타일 파일
│   └── animations.css      # CSS 애니메이션
├── ThemeContext.jsx        # 테마 컨텍스트
├── ThemeProvider.jsx       # 테마 프로바이더
├── App.jsx                 # 메인 앱 컴포넌트
├── index.css              # 전역 스타일
└── main.jsx              # ReactDOM 렌더링
```

## 🎮 향후 개발 로드맵

### **Phase 1: PWA 지원**
- [ ] Service Worker 구현
- [ ] 오프라인 모드 지원
- [ ] 앱 설치 프롬프트
- [ ] Push 알림

### **Phase 2: 고급 기능**
- [ ] 드래그 앤 드롭 순서 변경
- [ ] 할 일 복제 기능
- [ ] 파일 첨부 지원
- [ ] 태그 시스템

### **Phase 3: 협업 & 클라우드**
- [ ] 실시간 동기화 (Firebase/Supabase)
- [ ] 팀 워크스페이스
- [ ] 할 일 공유 및 할당
- [ ] 데이터 백업/복원

### 🎯 **성능 지표**

![Lighthouse Performance](https://img.shields.io/badge/Performance-95%2B-brightgreen?style=flat-square)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-100-brightgreen?style=flat-square)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100-brightgreen?style=flat-square)
![Lighthouse SEO](https://img.shields.io/badge/SEO-95%2B-brightgreen?style=flat-square)

## 📱 브라우저 호환성

| 브라우저 | 데스크톱 | 모바일 | 주요 기능 |
|---------|---------|---------|-----------|
| Chrome | ✅ 90+ | ✅ 90+ | 모든 기능 |
| Firefox | ✅ 88+ | ✅ 88+ | 모든 기능 |
| Safari | ✅ 14+ | ✅ 14+ | 토스트 알림 제한적 |
| Edge | ✅ 90+ | ✅ 90+ | 모든 기능 |

<div align="center">

## **이 프로젝트가 마음에 드셨나요?**

**⭐ 눌러주시면 개발자에게 큰 힘이 됩니다!**

<table>
<tr>
<td align="center">
<a href="https://github.com/yourusername/tailwind-todos">
<img src="https://img.shields.io/github/stars/yourusername/tailwind-todos.svg?style=for-the-badge&logo=github&color=yellow" alt="GitHub stars">
</a>
<br>
<strong>⭐ Star</strong>
</td>
<td align="center">
<a href="https://github.com/yourusername/tailwind-todos/fork">
<img src="https://img.shields.io/github/forks/yourusername/tailwind-todos.svg?style=for-the-badge&logo=github&color=blue" alt="GitHub forks">
</a>
<br>
<strong>🍴 Fork</strong>
</td>
<td align="center">
<a href="https://github.com/yourusername/tailwind-todos/watchers">
<img src="https://img.shields.io/github/watchers/yourusername/tailwind-todos.svg?style=for-the-badge&logo=github&color=green" alt="GitHub watchers">
</a>
<br>
<strong>👀 Watch</strong>
</td>
<td align="center">
<a href="https://github.com/yourusername/tailwind-todos/issues">
<img src="https://img.shields.io/github/issues/yourusername/tailwind-todos.svg?style=for-the-badge&logo=github&color=red" alt="GitHub issues">
</a>
<br>
<strong>🐛 Issues</strong>
</td>
</tr>
</table>

**Made with ❤️ by [서재민](https://github.com/yourusername)**

</div>
