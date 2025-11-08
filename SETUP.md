# Gemini Saju - 설치 및 실행 가이드

## 📋 개요

Google Gemini API를 활용한 AI 운세 분석 웹앱입니다.

## 🔧 설치 방법

### 1. 의존성 설치

프로젝트 루트 디렉토리에서 다음 명령어를 실행하세요:

```bash
npm install --legacy-peer-deps
```

> **참고**: `--legacy-peer-deps` 플래그는 React 19와 일부 패키지 간의 peer dependency 충돌을 해결하기 위해 필요합니다.

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Google Gemini API Key
# API 키 발급: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here
```

**Gemini API 키 발급 방법:**
1. https://makersuite.google.com/app/apikey 접속
2. Google 계정으로 로그인
3. "Create API Key" 버튼 클릭
4. 생성된 API 키를 복사하여 `.env.local` 파일에 붙여넣기

## 🚀 실행 방법

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
saju/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts    # 운세 분석 API
│   │   └── chat/route.ts        # 채팅 API
│   ├── layout.tsx
│   ├── page.tsx                 # 메인 페이지
│   └── globals.css
├── components/
│   ├── page-input.tsx           # 사용자 정보 입력 페이지
│   ├── page-result.tsx          # 운세 결과 페이지
│   ├── page-chat.tsx            # AI 채팅 페이지
│   └── ui/                      # shadcn/ui 컴포넌트
├── lib/
│   └── saju-context.tsx         # Context API 상태 관리
└── .env.local                   # 환경 변수 (직접 생성 필요)
```

## ✨ 주요 기능

### 1. 사용자 정보 입력
- 생년월일 (YYYYMMDD 형식)
- 태어난 시간 (00시~23시)
- 성별 (남성/여성)

### 2. AI 운세 분석
- 오늘의 운세
- 재물운
- 애정운

### 3. AI 사주 상담
- 사주 기반 자유 질문 및 답변
- 채팅 히스토리 유지

## 🎨 디자인 특징

- **다크 모드**: 전체 UI가 다크 모드로 구성
- **현대적 색상**: 청록색(teal/cyan) 계열 사용
- **스크롤 방지**: 페이지 전환 방식으로 스크롤 불필요
- **부드러운 애니메이션**: Framer Motion을 활용한 페이지 전환 효과

## 🔐 환경 변수 보안

**중요**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!
- 이미 `.gitignore`에 추가되어 있습니다.
- Vercel 배포 시: Vercel 대시보드에서 환경 변수를 별도로 설정하세요.

## 🚢 Vercel 배포

1. Vercel 대시보드에서 프로젝트 import
2. Environment Variables 섹션에서 `GEMINI_API_KEY` 추가
3. Deploy 버튼 클릭

## 📝 참고사항

- Gemini API는 무료 할당량이 제한되어 있으니 주의하세요.
- API 키가 노출되지 않도록 주의하세요.
- 더 많은 기능이 필요하면 Gemini API 문서를 참고하세요: https://ai.google.dev/

## 🐛 트러블슈팅

### API 키 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 개발 서버를 재시작

### 패키지 설치 오류
```bash
# 캐시 삭제 후 재설치
rm -rf node_modules
rm package-lock.json
npm install --legacy-peer-deps
```

### 빌드 오류
- TypeScript 타입 오류 확인
- 모든 의존성이 올바르게 설치되었는지 확인

