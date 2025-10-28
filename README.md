# seoyeong1000's Blog

GitHub Pages로 호스팅되는 정적 블로그입니다. 마크다운으로 게시글을 작성하고 자동으로 배포됩니다.

🌐 **Live Site**: https://seoyeong1000.github.io

## ✨ 주요 기능

- 📝 **마크다운 기반** 게시글 작성
- 🌓 **다크/라이트 모드** 자동 전환
- 🔍 **검색 및 필터링** (태그, 카테고리)
- 💬 **댓글 시스템** (Giscus)
- 🎨 **코드 하이라이팅** (Prism.js)
- 🚀 **자동 배포** (GitHub Actions)

## 🛠️ 기술 스택

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Markdown**: marked.js
- **Code Highlighting**: Prism.js
- **Comments**: Giscus (GitHub Discussions)
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages

## 📝 게시글 작성 방법

### 1. 새 마크다운 파일 생성

`pages/` 폴더에 `.md` 파일을 생성합니다.

```bash
# 예시
pages/my-first-post.md
pages/hello-world.md
```

### 2. Front Matter 작성

파일 상단에 Front Matter를 추가합니다:

```markdown
---
title: "게시글 제목"
date: 2025-01-26
tags: ["JavaScript", "Web"]
category: "Development"
description: "게시글에 대한 간단한 설명"
---

# 게시글 내용 시작

여기에 마크다운 형식으로 내용을 작성합니다...
```

### 3. Git Push

변경사항을 커밋하고 푸시합니다:

```bash
git add pages/my-first-post.md
git commit -m "feat: 새 게시글 추가"
git push origin main
```

GitHub Actions가 자동으로 `posts.json`을 생성하고 사이트를 배포합니다!

## 🚀 초기 설정

### 1. GitHub 저장소 생성

저장소 이름을 `seoyeong1000.github.io`로 생성합니다.

### 2. 코드 업로드

```bash
git init
git add .
git commit -m "feat: 블로그 초기 설정"
git branch -M main
git remote add origin https://github.com/seoyeong1000/seoyeong1000.github.io.git
git push -u origin main
```

### 3. GitHub Pages 활성화

1. 저장소 **Settings** > **Pages**로 이동
2. **Source**: `GitHub Actions` 선택
3. 첫 번째 push 후 자동으로 배포가 시작됩니다

### 4. Giscus 댓글 설정 (선택사항)

댓글 기능을 사용하려면 Giscus를 설정해야 합니다:

#### 4-1. GitHub Discussions 활성화

1. 저장소 **Settings** > **General** > **Features**
2. **Discussions** 체크박스 활성화

#### 4-2. Giscus 앱 설치

1. https://github.com/apps/giscus 접속
2. **Install** 클릭 후 저장소 선택

#### 4-3. Giscus 설정 가져오기

1. https://giscus.app/ko 접속
2. 저장소 입력: `seoyeong1000/seoyeong1000.github.io`
3. 설정:
   - **페이지 ↔️ Discussions 매핑**: `pathname`
   - **Discussion 카테고리**: `General`
   - **테마**: `preferred_color_scheme`
4. 생성된 `data-repo-id`와 `data-category-id` 복사

#### 4-4. 설정 파일 수정

`js/post-loader.js` 파일에서 다음 부분을 수정:

```javascript
script.setAttribute("data-repo-id", "YOUR_REPO_ID"); // 여기에 복사한 값 입력
script.setAttribute("data-category-id", "YOUR_CATEGORY_ID"); // 여기에 복사한 값 입력
```

저장 후 커밋하고 푸시하면 댓글 기능이 활성화됩니다!

## 📁 프로젝트 구조

```
seoyeong1000.github.io/
├── index.html              # 메인 페이지 (게시글 목록)
├── post.html               # 게시글 상세 페이지
├── css/
│   ├── style.css          # 메인 스타일 (다크/라이트 모드)
│   └── prism.css          # 코드 하이라이팅 테마
├── js/
│   ├── app.js             # 메인 앱 로직
│   ├── post-loader.js     # 마크다운 로더
│   ├── search.js          # 검색/필터 기능
│   └── theme.js           # 테마 전환
├── pages/                  # 마크다운 게시글 폴더
│   └── example.md
├── .github/
│   └── workflows/
│       └── generate-posts.yml  # 자동 배포 워크플로우
├── .gitignore
└── README.md
```

## 🎨 커스터마이징

### 색상 변경

`css/style.css`의 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #212529;
  --text-link: #0d6efd;
  /* ... */
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #e9ecef;
  --text-link: #6ea8fe;
  /* ... */
}
```

### 블로그 제목 변경

`index.html`과 `post.html`의 다음 부분을 수정:

```html
<title>seoyeong1000's Blog</title>
<h1 class="logo">
  <a href="index.html">seoyeong1000's Blog</a>
</h1>
```

## 📄 라이선스

MIT License

## 🤝 기여

이슈와 풀 리퀘스트는 언제나 환영합니다!

---

Made with ❤️ by seoyeong1000
