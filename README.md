# WithChurch

Next.js 14 (App Router) + Supabase 프로젝트입니다.

## 시작하기

이 저장소는 로컬에 Node.js가 없는 환경에서 작성되었습니다. GitHub Codespaces 등
클라우드 환경에서 열고 아래 순서로 진행하세요.

1. 의존성 설치

   ```bash
   npm install
   ```

2. 환경 변수 설정

   `.env.local.example`을 복사해 `.env.local`을 만들고 Supabase 프로젝트 값을 채워주세요.

   ```bash
   cp .env.local.example .env.local
   ```

   | 변수 | 설명 |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL (예: `https://xxxx.supabase.co`, `/rest/v1` 제외) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon(publishable) key |

3. 개발 서버 실행

   ```bash
   npm run dev
   ```

   [http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.
   홈 화면에 Supabase 연결 상태가 표시됩니다.

## 구조

- `src/app` — App Router 페이지/레이아웃
- `src/lib/supabase/client.ts` — 브라우저(클라이언트 컴포넌트)용 Supabase 클라이언트
- `src/lib/supabase/server.ts` — 서버 컴포넌트용 Supabase 클라이언트
- `src/lib/supabase/middleware.ts`, `middleware.ts` — 세션 자동 갱신 미들웨어
