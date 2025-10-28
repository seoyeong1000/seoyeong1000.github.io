// 다크/라이트 모드 토글 기능
(function () {
  "use strict";

  console.log("[Theme] 테마 시스템 초기화 시작");

  const THEME_KEY = "blog-theme";
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  // 저장된 테마 불러오기 또는 시스템 설정 사용
  function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme) {
      console.log("[Theme] 저장된 테마 발견:", savedTheme);
      return savedTheme;
    }

    // 시스템 다크모드 설정 확인
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const systemTheme = prefersDark ? "dark" : "light";
    console.log("[Theme] 시스템 테마 사용:", systemTheme);
    return systemTheme;
  }

  // 테마 적용
  function applyTheme(theme) {
    console.log("[Theme] 테마 적용:", theme);
    html.setAttribute("data-theme", theme);

    // 아이콘 변경
    if (themeToggle) {
      const icon = themeToggle.querySelector(".theme-icon");
      if (icon) {
        icon.textContent = theme === "dark" ? "☀️" : "🌙";
      }
    }

    // localStorage에 저장
    localStorage.setItem(THEME_KEY, theme);
    console.log("[Theme] 테마가 저장되었습니다");
  }

  // 테마 토글
  function toggleTheme() {
    const currentTheme = html.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    console.log("[Theme] 테마 전환:", currentTheme, "->", newTheme);
    applyTheme(newTheme);
  }

  // 초기 테마 적용
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // 토글 버튼 이벤트 리스너
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    console.log("[Theme] 테마 토글 버튼 이벤트 리스너 등록 완료");
  } else {
    console.warn("[Theme] 테마 토글 버튼을 찾을 수 없습니다");
  }

  // 시스템 테마 변경 감지
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // 사용자가 수동으로 설정하지 않은 경우에만 시스템 설정 따르기
      if (!localStorage.getItem(THEME_KEY)) {
        const newTheme = e.matches ? "dark" : "light";
        console.log("[Theme] 시스템 테마 변경 감지:", newTheme);
        applyTheme(newTheme);
      }
    });

  console.log("[Theme] 테마 시스템 초기화 완료");
})();
