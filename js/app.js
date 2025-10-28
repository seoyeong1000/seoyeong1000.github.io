// 메인 애플리케이션 로직
(function () {
  "use strict";

  console.log("[App] 애플리케이션 시작");

  const postsContainer = document.getElementById("postsContainer");
  const loadingElement = document.getElementById("loading");
  const noResultsElement = document.getElementById("noResults");

  // 날짜 포맷팅
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  // 게시글 카드 생성
  function createPostCard(post) {
    console.log("[App] 게시글 카드 생성:", post.title);

    const card = document.createElement("a");
    card.href = `post.html?file=${encodeURIComponent(post.file)}`;
    card.className = "post-card";

    const title = document.createElement("h2");
    title.textContent = post.title;

    const meta = document.createElement("div");
    meta.className = "post-card-meta";

    const date = document.createElement("time");
    date.textContent = formatDate(post.date);

    const separator = document.createElement("span");
    separator.className = "separator";
    separator.textContent = "·";

    const category = document.createElement("span");
    category.textContent = post.category || "미분류";

    meta.appendChild(date);
    meta.appendChild(separator);
    meta.appendChild(category);

    const description = document.createElement("p");
    description.className = "post-card-description";
    description.textContent = post.description || "설명이 없습니다.";

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(description);

    // 태그 추가
    if (post.tags && post.tags.length > 0) {
      const tagsContainer = document.createElement("div");
      tagsContainer.className = "post-card-tags";

      post.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.className = "post-card-tag";
        tagElement.textContent = `#${tag}`;
        tagsContainer.appendChild(tagElement);
      });

      card.appendChild(tagsContainer);
    }

    return card;
  }

  // 게시글 목록 렌더링
  function renderPosts(posts) {
    console.log("[App] 게시글 목록 렌더링:", posts.length, "개");

    postsContainer.innerHTML = "";

    if (posts.length === 0) {
      noResultsElement.style.display = "block";
      console.log("[App] 검색 결과 없음");
      return;
    }

    noResultsElement.style.display = "none";

    // 날짜순 정렬 (최신순)
    const sortedPosts = [...posts].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    sortedPosts.forEach((post) => {
      const card = createPostCard(post);
      postsContainer.appendChild(card);
    });

    console.log("[App] 게시글 렌더링 완료");
  }

  // posts.json 로드
  async function loadPosts() {
    console.log("[App] 게시글 데이터 로딩 시작");

    try {
      const response = await fetch("posts.json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();
      console.log("[App] 게시글 데이터 로드 성공:", posts.length, "개");

      loadingElement.style.display = "none";

      // 검색 시스템 초기화
      if (typeof window.initSearch === "function") {
        window.initSearch(posts);
      } else {
        console.error("[App] 검색 모듈을 찾을 수 없습니다");
      }

      // 초기 렌더링
      renderPosts(posts);
    } catch (error) {
      console.error("[App] 게시글 로드 실패:", error);
      loadingElement.innerHTML = `
                <p style="color: var(--text-secondary);">
                    게시글을 불러오는데 실패했습니다.<br>
                    <small>posts.json 파일이 없거나 형식이 올바르지 않습니다.</small>
                </p>
            `;
    }
  }

  // 검색 업데이트 이벤트 리스너
  window.addEventListener("searchUpdated", (e) => {
    console.log("[App] 검색 업데이트 이벤트 수신");
    renderPosts(e.detail.posts);
  });

  // 페이지 로드 시 실행
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPosts);
  } else {
    loadPosts();
  }

  console.log("[App] 애플리케이션 초기화 완료");
})();
