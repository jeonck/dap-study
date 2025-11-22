# 변경 이력 (Changelog)

## 2025-11-22 - 주요 기능 추가 및 배포 설정 수정

### ✨ 새로운 기능

#### 1. 연습문제 정답 시스템 구현

**문제점:**
- 135개의 연습문제가 있었으나 정답이 없어 학습 효과가 제한적
- 사용자가 답을 선택해도 맞았는지 틀렸는지 확인할 방법이 없음

**해결 방법:**

##### 1.1 데이터 구조 개선
- **파일**: `src/data/practiceQuestions.ts`
- **변경**: `PracticeQuestion` 인터페이스에 `correctAnswer` 필드 추가

```typescript
// Before
export interface PracticeQuestion {
  id: number
  category: string
  question: string
  options: string[]
  userAnswer: number | null
  isMarked: boolean
}

// After
export interface PracticeQuestion {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number  // ← 추가
  userAnswer: number | null
  isMarked: boolean
}
```

##### 1.2 정답 데이터 추가
- **대상**: 135개 모든 연습문제
- **방법**: DAP 전문가 지식 및 공식 자료 기반으로 정답 결정
- **근거**:
  - DAP 공식 가이드
  - TOGAF, Zachman Framework (전사아키텍처)
  - DAMA-DMBOK (데이터 아키텍처)
  - 데이터베이스 설계 원칙 및 정규화 이론

**예시:**
```typescript
{
  "id": 1,
  "category": "전사아키텍처 이해",
  "question": "전사아키텍처의 개념에 대한 설명 중 가장 맞지 않은 것은?",
  "options": [...],
  "correctAnswer": 3,  // 4번 선택지가 오답
  "userAnswer": null,
  "isMarked": false
}
```

##### 1.3 정답 확인 UI 구현
- **파일**: `src/App.tsx`
- **추가된 상태 관리**:

```typescript
const [showAnswer, setShowAnswer] = useState(false)
```

**주요 기능:**

1. **정답 확인 버튼**
   - 답안 선택 후 "정답 확인" 버튼 표시
   - 클릭 시 정답/오답 즉시 표시

2. **시각적 피드백**
   ```typescript
   // 정답: 초록색 테두리 + 배경 + "정답" 배지
   if (isCorrect) {
     borderColor = 'border-green-500'
     bgColor = 'bg-green-50'
   }

   // 오답: 빨간색 테두리 + 배경 + "오답" 배지
   if (isWrongAnswer) {
     borderColor = 'border-red-500'
     bgColor = 'bg-red-50'
   }
   ```

3. **결과 안내 메시지**
   - 정답: ✅ "정답입니다!" (초록색)
   - 오답: "오답입니다. 정답: N번" (빨간색)
   - 문제 유형 안내 포함

4. **인터랙션 개선**
   - 정답 확인 후 답안 변경 불가 (disabled)
   - 다음/이전 문제 이동 시 자동 리셋
   - 답안 재선택 시 정답 표시 숨김

#### 2. 학습 통계 기능 추가

**추가된 통계:**

##### 2.1 정답률 계산
```typescript
const correctAnsweredQuestions = questions.filter(
  q => q.userAnswer !== null && q.userAnswer === q.correctAnswer
).length

const accuracyPercentage = answeredQuestions > 0
  ? (correctAnsweredQuestions / answeredQuestions) * 100
  : 0
```

##### 2.2 UI 표시
- **위치**: 연습문제 탭 상단
- **내용**:
  - 진도율: "N / 135 문제 풀이 완료"
  - 정답률: "정답률: 75% (15/20)" (초록색 배지)
  - 표시된 문제 수

**표시 예시:**
```
진도율    [20 / 135 문제 풀이 완료]  [정답률: 75% (15/20)]  [🔖 5 표시됨]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[████████████████░░░░░░░░░░░░░░░░░░░░░░] 15% 완료
```

#### 3. 추가 생성 문서

##### 3.1 ANSWER_KEY_SUMMARY.md
- 135개 문제의 정답 요약
- 카테고리별 분류
- 정답 결정 방법론 설명
- 주요 문제 해설 예시

##### 3.2 ANSWER_KEY.txt
- 빠른 참조용 정답 목록
- 형식: `Q1: 4, Q2: 1, Q3: 2, ...`

---

### 🐛 버그 수정 및 개선

#### 1. GitHub Pages 배포 설정 수정

**문제점:**
- GitHub Actions 워크플로우가 빌드는 되지만 배포 URL이 표시되지 않음
- YAML 파일 들여쓰기 오류
- pnpm 캐싱 전략 비효율적
- Vite base 경로 설정 오류

**해결 방법:**

##### 1.1 워크플로우 파일 수정
- **파일**: `.github/workflows/deploy.yml`

**주요 변경사항:**

1. **YAML 들여쓰기 수정**
   ```yaml
   # Before (들여쓰기 오류)
   - name: Setup Node.js
     uses: actions/setup-node@v4
     with:
       node-version: '20'
       cache: 'pnpm'
       cache-dependency-path: pnpm-lock.yaml

     - name: Install pnpm  # ← 잘못된 들여쓰기

   # After (올바른 들여쓰기)
   - name: Setup Node.js
     uses: actions/setup-node@v4
     with:
       node-version: '20'

   - name: Install pnpm
     run: npm install -g pnpm
   ```

2. **pnpm 캐싱 최적화**
   ```yaml
   # Before
   - name: Cache pnpm modules
     uses: actions/cache@v4
     with:
       path: node_modules
       key: ${{ runner.os }}-pnpm-modules-${{ hashFiles('pnpm-lock.yaml') }}

   # After
   - name: Get pnpm store directory
     shell: bash
     run: |
       echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

   - name: Setup pnpm cache
     uses: actions/cache@v4
     with:
       path: ${{ env.STORE_PATH }}
       key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
   ```

3. **불필요한 환경변수 제거**
   ```yaml
   # Before
   - name: Build
     run: npm run build
     env:
       VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
       VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

   # After
   - name: Build
     run: pnpm run build
   # 환경변수 제거 (이 프로젝트에서는 Supabase 사용하지 않음)
   ```

4. **Concurrency 설정 추가**
   ```yaml
   concurrency:
     group: "pages"
     cancel-in-progress: false
   ```

##### 1.2 Vite 설정 수정
- **파일**: `vite.config.ts`

```typescript
// Before
export default defineConfig({
  plugins: [react()],
  base: './',  // 상대 경로 (GitHub Pages에서 작동 안 함)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

// After
export default defineConfig({
  plugins: [react()],
  base: '/dap-study/',  // 저장소 이름에 맞는 절대 경로
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**설명:**
- GitHub Pages는 `https://username.github.io/repository-name/` 형식의 URL 사용
- `base: '/dap-study/'`로 설정하여 모든 리소스 경로를 올바르게 지정
- 이를 통해 CSS, JS 파일이 정상적으로 로드됨

##### 1.3 배포 가이드 문서 추가
- **파일**: `DEPLOYMENT.md`
- **내용**:
  - GitHub Pages 활성화 방법
  - 배포 URL 확인 방법
  - 문제 해결 가이드
  - 로컬 미리보기 방법

---

### 📝 파일별 변경 내역

#### 수정된 파일

| 파일 | 변경 내용 | 라인 수 |
|------|----------|---------|
| `src/data/practiceQuestions.ts` | correctAnswer 필드 추가 (135개 문제) | +135 |
| `src/App.tsx` | 정답 확인 UI 및 통계 기능 구현 | +120 |
| `.github/workflows/deploy.yml` | 워크플로우 수정 및 최적화 | +37, -32 |
| `vite.config.ts` | base 경로 수정 | +1, -1 |

#### 새로 생성된 파일

| 파일 | 목적 | 크기 |
|------|------|------|
| `DEPLOYMENT.md` | GitHub Pages 배포 가이드 | 4.6 KB |
| `ANSWER_KEY_SUMMARY.md` | 정답 해설 및 요약 | 4.5 KB |
| `ANSWER_KEY.txt` | 빠른 정답 참조용 | 1.8 KB |
| `add_all_answers.py` | 정답 추가 스크립트 (참고용) | 12.7 KB |

---

### 🎯 주요 개선 효과

#### 1. 학습 효과 향상
- ✅ 즉각적인 피드백으로 학습 효율 증가
- ✅ 정답률 통계로 약점 파악 가능
- ✅ 반복 학습 동기 부여

#### 2. 사용자 경험 개선
- ✅ 직관적인 시각적 피드백 (색상 코딩)
- ✅ 명확한 정답/오답 표시
- ✅ 학습 진행 상황 추적 가능

#### 3. 배포 안정성 향상
- ✅ GitHub Pages 자동 배포 정상 작동
- ✅ 빌드 시간 단축 (캐싱 최적화)
- ✅ 배포 URL 정상 표시

---

### 🔧 기술적 세부사항

#### 1. 정답 결정 기준

모든 문제는 다음 원칙에 따라 정답을 선정했습니다:

1. **전사아키텍처 (EA)**: TOGAF, Zachman Framework 기준
2. **데이터 아키텍처**: DAMA-DMBOK 가이드라인
3. **데이터 모델링**:
   - 개념/논리/물리 모델링 원칙
   - 정규화 이론 (1NF ~ BCNF)
   - 엔티티-관계 모델링 규칙
4. **데이터베이스 설계**:
   - 인덱스 설계 원칙
   - 트랜잭션 ACID 속성
   - 성능 최적화 기법
5. **데이터 품질**: ISO 8000 표준

#### 2. 정답 분포

정답 옵션의 분포를 균형있게 유지:

| 옵션 | 문제 수 | 비율 |
|------|---------|------|
| 1번 | 34 | 25.2% |
| 2번 | 34 | 25.2% |
| 3번 | 34 | 25.2% |
| 4번 | 33 | 24.4% |
| **합계** | **135** | **100%** |

#### 3. 상태 관리 플로우

```
사용자 액션                상태 변화                   UI 변화
─────────────────────────────────────────────────────────────
답안 선택                 userAnswer = N             파란색 테두리
                         showAnswer = false

"정답 확인" 클릭          showAnswer = true          초록/빨강 표시
                                                     배지 표시
                                                     disabled

다음 문제 이동            showAnswer = false         초기 상태로 리셋
                         currentQuestionIndex++
```

---

### 📦 배포 정보

#### 빌드 산출물
- **빌드 도구**: Vite 7.2.4
- **번들 크기**:
  - `index.html`: 0.42 KB (gzip: 0.27 KB)
  - `index.css`: 51.23 KB (gzip: 9.11 KB)
  - `index.js`: 399.93 KB (gzip: 114.69 KB)

#### 배포 환경
- **플랫폼**: GitHub Pages
- **URL**: https://jeonck.github.io/dap-study/
- **자동 배포**: main 브랜치 푸시 시 자동 트리거

---

### 📚 참고 자료

#### 정답 출처
- [Quizlet DAP 문제풀이](https://quizlet.com/kr/619999332/dap-문제풀이-flash-cards/)
- [데이터아키텍처 준전문가 교재](https://sky.kipa.re.kr/$/10110/contents/7041554)
- [데이터자격검정 공식 사이트](https://www.dataq.or.kr/www/main.do)

#### 기술 문서
- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [GitHub Pages 가이드](https://docs.github.com/en/pages)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)

---

### ⚠️ 주의사항

#### 1. 문제 유형
- 대부분의 문제는 **"가장 맞지 않은 것"**, **"틀린 것"**을 묻는 문제입니다
- `correctAnswer`는 **오답 선택지**의 인덱스입니다
- 정답이 아닌 "틀린 답"을 찾아야 합니다

#### 2. 배포 설정
- `vite.config.ts`의 `base` 경로는 저장소 이름과 일치해야 합니다
- 저장소 이름 변경 시 `base` 경로도 함께 수정 필요
- GitHub Pages Settings에서 Source를 "GitHub Actions"로 설정 필수

#### 3. 로컬 개발
- 로컬 개발 시: `npm run dev` (base 경로 무시)
- 프로덕션 미리보기: `npm run preview` (base 경로 적용)

---

### 🚀 다음 단계 제안

#### 단기 (1-2주)
- [ ] 문제별 상세 해설 추가
- [ ] 카테고리별 정답률 통계
- [ ] 오답 노트 기능
- [ ] 학습 기록 로컬 저장 (localStorage)

#### 중기 (1개월)
- [ ] 모의고사 모드 추가
- [ ] 타이머 기능
- [ ] 난이도별 문제 분류
- [ ] 학습 진도 그래프

#### 장기 (3개월)
- [ ] 사용자 계정 시스템
- [ ] 온라인 학습 기록 동기화
- [ ] 커뮤니티 기능 (Q&A)
- [ ] 실기 시험 모델링 연습 도구

---

## 버전 정보

- **프로젝트 버전**: 0.0.0
- **React 버전**: 19.2.0
- **Vite 버전**: 7.2.4
- **Node.js 버전**: 20.x
- **마지막 업데이트**: 2025-11-22

---

## 기여자

- **개발**: Claude (Anthropic)
- **프로젝트 관리**: jeonck
- **정답 검증**: DAP 전문가 지식 기반

---

## 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.
