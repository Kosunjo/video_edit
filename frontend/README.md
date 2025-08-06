# Video Finder Frontend Files

이 디렉토리는 EC2 컨테이너에서 실행 중인 Video Finder 애플리케이션의 프론트엔드 파일들을 포함합니다.

## 📁 파일 구조

### 메인 HTML 파일들
- `index.html` - 메인 페이지 (Next.js 빌드 결과)
- `404.html` - 404 에러 페이지
- `test.html` - 테스트 페이지
- `index_backup.html` - 백업 파일

### JavaScript 파일들
- `video_patch.js` - 커스텀 비디오 모달 패치 스크립트

### Next.js 빌드 결과물
```
_next/
├── static/
│   ├── chunks/
│   │   ├── app/
│   │   │   ├── page-7e691050a682412a.js      # 메인 페이지 컴포넌트
│   │   │   ├── layout-ea5c2a7b7c6c78c8.js    # 레이아웃 컴포넌트
│   │   │   └── _not-found/
│   │   ├── pages/
│   │   │   ├── _app-da15c11dea942c36.js      # App 컴포넌트
│   │   │   └── _error-cc3f077a18ea1793.js    # 에러 페이지
│   │   ├── main-app-86201a5c7b6d811b.js      # 메인 앱 로직
│   │   ├── framework-29ac49a6a3fd316f.js     # React 프레임워크
│   │   └── ...
│   ├── css/
│   │   └── 1b474a6f35bb2390.css             # Tailwind CSS
│   ├── media/
│   │   ├── 028c0d39d2e8f589-s.p.woff2      # GeistSans 폰트
│   │   └── 5b01f339abf2f1a5.p.woff2        # GeistSans Fallback 폰트
│   └── Iz3VqgCaG9BTltNDtDVvD/
│       ├── _buildManifest.js                # 빌드 매니페스트
│       └── _ssgManifest.js                  # SSG 매니페스트
```

### 이미지 파일들
- `placeholder.svg` - SVG 플레이스홀더 이미지
- `placeholder.jpg` - JPG 플레이스홀더 이미지

## 🚀 기술 스택

- **Framework**: Next.js (정적 사이트 생성)
- **Styling**: Tailwind CSS
- **Font**: GeistSans
- **Build**: Webpack
- **Deployment**: Docker 컨테이너 내 Nginx

## 📋 특징

1. **정적 사이트 생성**: Next.js의 `output: 'export'` 설정으로 정적 HTML 생성
2. **모달 비디오 플레이어**: `video_patch.js`로 구현된 커스텀 비디오 모달
3. **반응형 디자인**: Tailwind CSS를 사용한 모바일 친화적 UI
4. **채팅봇 인터페이스**: 실시간 채팅 기능
5. **비디오 편집 요청**: 프롬프트 기반 비디오 편집 요청

## 🔧 배포 환경

- **웹서버**: Nginx
- **컨테이너**: Docker
- **EC2**: Amazon Linux
- **도메인**: http://43.202.62.61

## 📝 이슈 관련

이 파일들은 GitHub 이슈 #23과 관련하여 업로드되었습니다.
- 컨테이너 내부 경로: `/var/www/html/`
- 추출 날짜: 2025-08-06
- 브랜치: `issue-23-frontend-files`
