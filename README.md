# 🚀 Task Manager

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/) 
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<br>

## 🚀 라이브 데모

<a href="https://library-min.github.io/To-Do-List_2/" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; border-radius: 5px; text-decoration: none;">
  🚀 데모 바로가기
</a>

---

## 📸 미리보기



---

## ✨ 주요 기능

### 📝 할 일 관리
- **추가/편집/삭제**: 직관적인 인터페이스로 할 일을 쉽게 관리합니다.
- **완료 상태 토글**: 체크박스로 간편하게 완료 처리합니다.
- **인라인 편집**: 할 일을 클릭하여 바로 수정할 수 있습니다.

### 🏷️ 카테고리 시스템
- **카테고리 관리**: 개인, 업무, 쇼핑 등 사용자 정의 카테고리를 만들 수 있습니다.
- **카테고리별 필터링**: 원하는 카테고리만 골라서 볼 수 있습니다.

### ⭐ 우선순위 설정
- **3단계 우선순위**: 높음(🔴), 보통(🟡), 낮음(🟢)으로 중요도를 표시합니다.
- **우선순위별 정렬**: 중요한 일부터 처리할 수 있도록 정렬합니다.

### 📅 날짜 관리
- **마감일 설정**: 할 일에 마감일을 추가하여 관리합니다.
- **기한 초과 알림**: 마감일이 지난 할 일은 빨간색으로 표시됩니다.

### 💾 데이터 저장
- **로컬 스토리지**: 브라우저에 데이터가 자동 저장되어 앱을 닫아도 유지됩니다.
- **실시간 동기화**: 모든 변경사항이 즉시 저장됩니다.

---

## 🛠️ 기술 스택

- **React 18**: 최신 React 버전으로 구축
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **Vite**: 빠르고 효율적인 개발 환경
- **JavaScript (ES6+)**: 현대적인 자바스크립트 문법
- **LocalStorage API**: 클라이언트 측 데이터 저장

---

## 📁 프로젝트 구조

src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── BulkActions.jsx  # 일괄 작업 관리
│   ├── CategoryManager.jsx # 카테고리 관리
│   ├── FilterBar.jsx    # 필터 및 정렬
│   ├── SearchBar.jsx    # 검색 기능
│   ├── StatsCard.jsx    # 통계 카드
│   ├── TodoInput.jsx    # 할 일 입력 필드
│   ├── TodoItem.jsx     # 개별 할 일 아이템
│   ├── TodoList.jsx     # 할 일 목록
│   ├── ThemeToggle.jsx  # 테마 토글
│   └── PalettePicker.jsx # 색상 선택
├── ThemeContext.jsx     # 전역 테마 상태 관리
├── App.jsx              # 메인 컴포넌트
├── index.css            # 전역 스타일
└── main.jsx             # 엔트리 포인트


---

## 🎯 사용법

1. **할 일 추가**: 상단 입력 필드에 할 일을 입력하고 추가 버튼을 클릭합니다.
2. **고급 설정**: ⚙️ 버튼을 클릭하여 카테고리, 우선순위, 마감일을 설정합니다.
3. **할 일 관리**: 체크박스로 완료 처리하고, 편집/삭제 버튼으로 관리합니다.
4. **검색/필터**: 검색창에 키워드를 입력하고, 필터 옵션을 선택합니다.
5. **일괄 작업**: 여러 할 일을 선택하여 한 번에 완료하거나 삭제합니다.

---

## 🎨 커스터마이징

- **색상 테마**: 다크/라이트 모드와 다양한 색상 팔레트를 지원합니다.
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 등 모든 기기에서 최적화된 화면을 제공합니다.

---

## 🎓 라이선스

이 프로젝트는 MIT 라이선스에 따라 배포됩니다.
