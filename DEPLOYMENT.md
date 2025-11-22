# GitHub Pages 배포 가이드

## 🚀 자동 배포 설정 완료

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

## 📋 배포 URL

배포 완료 후 다음 URL에서 접속 가능합니다:

**https://jeonck.github.io/dap-study/**

## ⚙️ GitHub 저장소 설정

### 1. GitHub Pages 활성화

GitHub 저장소 설정에서 다음 단계를 따르세요:

1. 저장소 페이지로 이동: https://github.com/jeonck/dap-study
2. **Settings** (설정) 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - Source: **GitHub Actions** 선택
   - (이전에 "Deploy from a branch"가 선택되어 있다면 변경 필요)

### 2. 변경사항 커밋 및 푸시

```bash
# 변경사항 확인
git status

# 모든 변경사항 추가
git add .

# 커밋
git commit -m "Fix GitHub Pages deployment configuration"

# GitHub에 푸시
git push origin main
```

### 3. 배포 상태 확인

1. GitHub 저장소의 **Actions** 탭으로 이동
2. "Deploy to GitHub Pages" 워크플로우 실행 확인
3. 완료되면 초록색 체크마크 표시
4. 완료 후 **Settings > Pages**로 이동하면 배포된 URL 확인 가능

## 🔍 배포 확인 사항

### 워크플로우 실행 확인
- GitHub 저장소 → **Actions** 탭
- 최근 워크플로우 실행 목록에서 "Deploy to GitHub Pages" 확인
- 각 단계별 로그 확인 가능

### 배포 URL 확인
- Settings → Pages로 이동
- 상단에 "Your site is live at ..." 메시지 확인
- 링크 클릭하여 사이트 접속 확인

## 🛠️ 수정된 파일

1. **`.github/workflows/deploy.yml`**
   - YAML 들여쓰기 오류 수정
   - pnpm 캐싱 최적화
   - 불필요한 환경변수 제거

2. **`vite.config.ts`**
   - `base` 경로를 `/dap-study/`로 설정
   - GitHub Pages의 저장소 경로에 맞게 조정

## 📝 로컬 미리보기

배포 전 로컬에서 프로덕션 빌드를 테스트하려면:

```bash
# 빌드
npm run build

# 미리보기 (포트 4173)
npm run preview
```

브라우저에서 http://localhost:4173/dap-study/ 접속

## ⚠️ 문제 해결

### URL에 접속했는데 404 에러가 나는 경우
- GitHub Settings > Pages에서 Source가 "GitHub Actions"로 설정되어 있는지 확인
- Actions 탭에서 워크플로우가 성공적으로 완료되었는지 확인

### 워크플로우가 실패하는 경우
1. Actions 탭에서 실패한 워크플로우 클릭
2. 실패한 단계의 로그 확인
3. 일반적인 원인:
   - pnpm-lock.yaml 파일 누락
   - 빌드 오류 (로컬에서 `npm run build` 테스트)
   - 권한 문제 (Settings > Actions > General에서 workflow 권한 확인)

### 스타일이 깨지거나 리소스 로드 실패
- `vite.config.ts`의 `base` 경로가 `/dap-study/`로 올바르게 설정되어 있는지 확인
- 빌드 후 `dist/index.html` 파일에서 경로가 `/dap-study/assets/...` 형태인지 확인

## 🎉 배포 자동화

`main` 브랜치에 푸시할 때마다 자동으로:
1. 의존성 설치
2. 프로젝트 빌드
3. GitHub Pages에 배포

수동으로 배포하려면:
1. GitHub 저장소 → **Actions** 탭
2. "Deploy to GitHub Pages" 워크플로우 선택
3. **Run workflow** 버튼 클릭

---

**배포 후 예상 URL**: https://jeonck.github.io/dap-study/
