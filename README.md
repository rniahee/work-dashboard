# LabelBoard

데이터 라벨링 작업 현황을 한눈에 관리하고 시각화하는 태스크 관리 대시보드입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| 상태 관리 | TanStack Query v5 |
| 차트 | Recharts |
| 폼 | react-hook-form |
| API Mocking | MSW v2 |
| 테스트 | Vitest |
| 배포 | Vercel |

## 주요 기능

### 대시보드 홈 (`/`)
- 전체 / 진행중 / 완료 / 반려 작업 요약 카드
- 작업 상태별 비율 도넛 차트
- 작업자별 완료/반려 건수 바 차트
- 최근 등록된 작업 목록 5건

### 작업 목록 (`/tasks`)
- 전체 작업 테이블
- 상태 / 작업자 필터링 및 작업명 검색

### 작업 등록 (`/tasks/new`)
- 작업명 / 작업 유형 / 담당 작업자 / 마감일 입력
- react-hook-form 기반 유효성 검사

### 작업 상세 (`/tasks/[id]`)
- 작업 정보 조회 및 수정
- 작업 삭제

### 작업자 관리 (`/workers`)
- 작업자 목록
- 작업자별 완료율 / 반려율 통계

## 프로젝트 구조

```
├── app/
│   ├── _components/        # 대시보드 전용 컴포넌트
│   │   ├── StatCard.tsx
│   │   ├── StatusDonutChart.tsx
│   │   ├── WorkerBarChart.tsx
│   │   └── RecentTaskList.tsx
│   ├── providers/          # QueryProvider, MSWProvider
│   ├── tasks/
│   │   ├── page.tsx        # 작업 목록 진입점
│   │   ├── TasksClient.tsx # 목록 테이블 + 필터 + 검색
│   │   ├── new/
│   │   │   ├── page.tsx          # 작업 등록 진입점
│   │   │   └── NewTaskClient.tsx # 등록 폼
│   │   └── [id]/
│   │       ├── page.tsx              # 작업 상세 진입점
│   │       └── TaskDetailClient.tsx  # 상세 조회 + 수정 + 삭제
│   └── workers/            # 작업자 관리 페이지
├── components/
│   ├── layout/             # Header, Sidebar, LayoutShell
│   └── ui/                 # 공통 UI 컴포넌트 (Button, Input, Select)
├── constants/              # 상태/유형 레이블 상수
├── mocks/                  # MSW 핸들러 및 목업 데이터
└── types/                  # Task, Worker, Stats 타입 정의
```

## 시작하기

```bash
# yarn
yarn install
yarn dev

# npm
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## Mock API

MSW를 사용해 개발 환경에서 API를 모킹합니다.

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/tasks` | 작업 목록 조회 (필터 파라미터 포함) |
| GET | `/api/tasks/:id` | 작업 상세 조회 |
| POST | `/api/tasks` | 작업 등록 |
| PATCH | `/api/tasks/:id` | 작업 수정 |
| DELETE | `/api/tasks/:id` | 작업 삭제 |
| GET | `/api/workers` | 작업자 목록 조회 |
| GET | `/api/stats` | 대시보드 통계 조회 |
