// 게시글 로더 및 마크다운 파싱
(function () {
  "use strict";

  console.log("[PostLoader] 게시글 로더 초기화");

  const postContainer = document.getElementById("postContainer");
  const loadingElement = document.getElementById("loading");
  const errorElement = document.getElementById("postError");

  // URL에서 파일명 가져오기
  function getPostFileName() {
    const params = new URLSearchParams(window.location.search);
    const fileName = params.get("file");
    console.log("[PostLoader] URL 파라미터에서 파일명 추출:", fileName);
    return fileName;
  }

  // Front Matter 파싱
  function parseFrontMatter(content) {
    console.log("[PostLoader] Front Matter 파싱 시작");

    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);

    if (!match) {
      console.log("[PostLoader] Front Matter가 없습니다");
      return { metadata: {}, body: content };
    }

    const frontMatterText = match[1];
    const body = match[2];

    const metadata = {};
    const lines = frontMatterText.split("\n");

    lines.forEach((line) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex === -1) return;

      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // 따옴표 제거
      value = value.replace(/^['"]|['"]$/g, "");

      // 배열 파싱 (태그)
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/^['"]|['"]$/g, ""));
      }

      metadata[key] = value;
    });

    console.log("[PostLoader] Front Matter 파싱 완료:", metadata);
    return { metadata, body };
  }

  // 날짜 포맷팅
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  }

  // 메타데이터 렌더링
  function renderMetadata(metadata) {
    console.log("[PostLoader] 메타데이터 렌더링");

    const titleElement = document.getElementById("postTitle");
    const dateElement = document.getElementById("postDate");
    const categoryElement = document.getElementById("postCategory");
    const tagsElement = document.getElementById("postTags");

    if (titleElement) {
      titleElement.textContent = metadata.title || "제목 없음";
      document.title = `${metadata.title || "게시글"} - seoyeong1000's Blog`;
    }

    if (dateElement && metadata.date) {
      dateElement.textContent = formatDate(metadata.date);
    }

    if (categoryElement) {
      categoryElement.textContent = metadata.category || "미분류";
    }

    if (tagsElement && metadata.tags) {
      tagsElement.innerHTML = "";
      metadata.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.className = "post-tag";
        tagElement.textContent = `#${tag}`;
        tagsElement.appendChild(tagElement);
      });
    }
  }

  // 마크다운을 HTML로 변환
  function renderMarkdown(markdown) {
    console.log("[PostLoader] 마크다운 렌더링 시작");

    if (typeof marked === "undefined") {
      console.error("[PostLoader] marked.js가 로드되지 않았습니다");
      return "<p>마크다운 파서를 불러올 수 없습니다.</p>";
    }

    // marked 설정
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false,
    });

    const html = marked.parse(markdown);
    console.log("[PostLoader] 마크다운 렌더링 완료");
    return html;
  }

  // Prism.js로 코드 하이라이팅
  function highlightCode() {
    console.log("[PostLoader] 코드 하이라이팅 시작");

    if (typeof Prism !== "undefined") {
      Prism.highlightAll();
      console.log("[PostLoader] 코드 하이라이팅 완료");
    } else {
      console.warn("[PostLoader] Prism.js가 로드되지 않았습니다");
    }
  }

  // Giscus 댓글 시스템 로드
  function loadGiscus() {
    console.log("[PostLoader] Giscus 댓글 시스템 로드");

    const giscusContainer = document.getElementById("giscus-container");

    if (!giscusContainer) {
      console.warn("[PostLoader] Giscus 컨테이너를 찾을 수 없습니다");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "seoyeong1000/seoyeong1000.github.io");
    script.setAttribute("data-repo-id", "R_kgDOQKfwqw");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOQKfwq84CxMbe");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    giscusContainer.appendChild(script);
    console.log("[PostLoader] Giscus 스크립트 추가 완료");
  }

  // 게시글 로드
  async function loadPost() {
    console.log("[PostLoader] 게시글 로드 시작");

    const fileName = getPostFileName();

    if (!fileName) {
      console.error("[PostLoader] 파일명이 지정되지 않았습니다");
      showError();
      return;
    }

    try {
      console.log("[PostLoader] 마크다운 파일 요청:", `pages/${fileName}`);
      const response = await fetch(`pages/${fileName}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const content = await response.text();
      console.log("[PostLoader] 마크다운 파일 로드 성공");

      // Front Matter 파싱
      const { metadata, body } = parseFrontMatter(content);

      // 메타데이터 렌더링
      renderMetadata(metadata);

      // 마크다운을 HTML로 변환
      const html = renderMarkdown(body);

      // 본문 렌더링
      const postBody = document.getElementById("postBody");
      if (postBody) {
        postBody.innerHTML = html;
      }

      // UI 업데이트
      loadingElement.style.display = "none";
      postContainer.style.display = "block";

      // 코드 하이라이팅
      highlightCode();

      // Giscus 댓글 로드
      loadGiscus();

      console.log("[PostLoader] 게시글 로드 완료");
    } catch (error) {
      console.error("[PostLoader] 게시글 로드 실패:", error);
      showError();
    }
  }

  // 에러 표시
  function showError() {
    console.log("[PostLoader] 에러 메시지 표시");
    loadingElement.style.display = "none";
    errorElement.style.display = "block";
  }

  // 페이지 로드 시 실행
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPost);
  } else {
    loadPost();
  }

  console.log("[PostLoader] 게시글 로더 초기화 완료");
})();
