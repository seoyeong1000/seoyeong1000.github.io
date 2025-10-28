// 검색 및 필터링 기능
(function () {
  "use strict";

  console.log("[Search] 검색 시스템 초기화");

  // 전역 변수
  window.searchModule = {
    allPosts: [],
    filteredPosts: [],
    selectedCategory: "",
    selectedTags: new Set(),
    searchQuery: "",
  };

  // 검색 수행
  function performSearch() {
    console.log("[Search] 검색 수행 시작");
    console.log("[Search] 검색어:", window.searchModule.searchQuery);
    console.log(
      "[Search] 선택된 카테고리:",
      window.searchModule.selectedCategory
    );
    console.log(
      "[Search] 선택된 태그:",
      Array.from(window.searchModule.selectedTags)
    );

    const { allPosts, selectedCategory, selectedTags, searchQuery } =
      window.searchModule;

    // 필터링
    window.searchModule.filteredPosts = allPosts.filter((post) => {
      // 카테고리 필터
      if (selectedCategory && post.category !== selectedCategory) {
        return false;
      }

      // 태그 필터
      if (selectedTags.size > 0) {
        const hasAllTags = Array.from(selectedTags).every(
          (tag) => post.tags && post.tags.includes(tag)
        );
        if (!hasAllTags) {
          return false;
        }
      }

      // 검색어 필터
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const titleMatch = post.title.toLowerCase().includes(query);
        const descMatch =
          post.description && post.description.toLowerCase().includes(query);
        const tagMatch =
          post.tags &&
          post.tags.some((tag) => tag.toLowerCase().includes(query));
        const categoryMatch =
          post.category && post.category.toLowerCase().includes(query);

        if (!titleMatch && !descMatch && !tagMatch && !categoryMatch) {
          return false;
        }
      }

      return true;
    });

    console.log(
      "[Search] 검색 결과:",
      window.searchModule.filteredPosts.length,
      "개"
    );

    // UI 업데이트 이벤트 발생
    const event = new CustomEvent("searchUpdated", {
      detail: { posts: window.searchModule.filteredPosts },
    });
    window.dispatchEvent(event);
  }

  // 검색창 이벤트
  function initSearchInput() {
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        window.searchModule.searchQuery = e.target.value.trim();
        console.log("[Search] 검색어 입력:", window.searchModule.searchQuery);
        performSearch();
      });
      console.log("[Search] 검색 입력창 초기화 완료");
    }
  }

  // 카테고리 필터 초기화
  function initCategoryFilter(posts) {
    console.log("[Search] 카테고리 필터 초기화");
    const categoryFilter = document.getElementById("categoryFilter");

    if (!categoryFilter) return;

    // 모든 카테고리 추출
    const categories = [
      ...new Set(posts.map((post) => post.category).filter(Boolean)),
    ];
    console.log("[Search] 발견된 카테고리:", categories);

    // 카테고리 옵션 추가
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });

    // 이벤트 리스너
    categoryFilter.addEventListener("change", (e) => {
      window.searchModule.selectedCategory = e.target.value;
      console.log(
        "[Search] 카테고리 변경:",
        window.searchModule.selectedCategory || "전체"
      );
      performSearch();
    });

    console.log("[Search] 카테고리 필터 초기화 완료");
  }

  // 태그 필터 초기화
  function initTagsFilter(posts) {
    console.log("[Search] 태그 필터 초기화");
    const tagsContainer = document.getElementById("tagsContainer");

    if (!tagsContainer) return;

    // 모든 태그 추출
    const allTags = new Set();
    posts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => allTags.add(tag));
      }
    });

    const tagsArray = Array.from(allTags).sort();
    console.log("[Search] 발견된 태그:", tagsArray);

    // 태그 버튼 생성
    tagsArray.forEach((tag) => {
      const tagElement = document.createElement("button");
      tagElement.className = "tag";
      tagElement.textContent = `#${tag}`;
      tagElement.dataset.tag = tag;

      tagElement.addEventListener("click", () => {
        console.log("[Search] 태그 클릭:", tag);

        if (window.searchModule.selectedTags.has(tag)) {
          window.searchModule.selectedTags.delete(tag);
          tagElement.classList.remove("active");
          console.log("[Search] 태그 선택 해제:", tag);
        } else {
          window.searchModule.selectedTags.add(tag);
          tagElement.classList.add("active");
          console.log("[Search] 태그 선택:", tag);
        }

        performSearch();
      });

      tagsContainer.appendChild(tagElement);
    });

    console.log("[Search] 태그 필터 초기화 완료");
  }

  // 검색 시스템 초기화
  window.initSearch = function (posts) {
    console.log("[Search] 검색 시스템 초기화 - 게시글 수:", posts.length);
    window.searchModule.allPosts = posts;
    window.searchModule.filteredPosts = posts;

    initSearchInput();
    initCategoryFilter(posts);
    initTagsFilter(posts);

    console.log("[Search] 검색 시스템 초기화 완료");
  };

  // 검색 리셋
  window.resetSearch = function () {
    console.log("[Search] 검색 초기화");
    window.searchModule.selectedCategory = "";
    window.searchModule.selectedTags.clear();
    window.searchModule.searchQuery = "";

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    if (searchInput) searchInput.value = "";
    if (categoryFilter) categoryFilter.value = "";

    document.querySelectorAll(".tag.active").forEach((tag) => {
      tag.classList.remove("active");
    });

    performSearch();
  };

  console.log("[Search] 검색 모듈 로드 완료");
})();
