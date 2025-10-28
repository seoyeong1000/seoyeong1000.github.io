---
title: "블로그에 오신 것을 환영합니다!"
date: 2025-01-26
tags: ["Welcome", "Tutorial"]
category: "Getting Started"
description: "첫 번째 예시 게시글입니다. 마크다운 문법과 블로그 기능을 확인해보세요."
---

# 환영합니다! 🎉

이 블로그는 GitHub Pages와 순수 HTML, CSS, JavaScript로 만들어진 정적 블로그입니다.

## 주요 기능

### 1. 마크다운 지원

이 블로그는 **마크다운 문법**을 완벽하게 지원합니다. _기울임체_, **굵은 글씨**, ~~취소선~~ 등을 자유롭게 사용할 수 있습니다.

### 2. 코드 하이라이팅

JavaScript 코드 예시:

```javascript
function greet(name) {
  console.log(`안녕하세요, ${name}님!`);
  return `Welcome to my blog!`;
}

greet("seoyeong1000");
```

Python 코드 예시:

```python
def calculate_sum(numbers):
    """숫자 리스트의 합을 계산합니다."""
    total = sum(numbers)
    print(f"합계: {total}")
    return total

numbers = [1, 2, 3, 4, 5]
result = calculate_sum(numbers)
```

### 3. 다크 모드

오른쪽 상단의 버튼을 클릭하여 다크 모드와 라이트 모드를 전환할 수 있습니다.

### 4. 검색 및 필터링

- 검색창에서 키워드로 게시글을 찾을 수 있습니다
- 카테고리별로 필터링할 수 있습니다
- 태그를 클릭하여 관련 게시글을 찾을 수 있습니다

## 마크다운 문법 예시

### 인용구

> 이것은 인용구입니다.
> 여러 줄로 작성할 수 있습니다.

### 리스트

순서 없는 리스트:

- 항목 1
- 항목 2
  - 하위 항목 2-1
  - 하위 항목 2-2
- 항목 3

순서 있는 리스트:

1. 첫 번째
2. 두 번째
3. 세 번째

### 링크와 이미지

[GitHub Pages 공식 문서](https://docs.github.com/ko/pages)를 참고하세요.

### 표

| 기능     | 설명        | 지원 여부 |
| -------- | ----------- | --------- |
| 마크다운 | 게시글 작성 | ✅        |
| 검색     | 키워드 검색 | ✅        |
| 댓글     | Giscus 연동 | ✅        |
| 다크모드 | 테마 전환   | ✅        |

## 게시글 작성 방법

새 게시글을 작성하려면:

1. `pages/` 폴더에 `.md` 파일을 생성합니다
2. Front Matter를 추가합니다:

```markdown
---
title: "게시글 제목"
date: 2025-01-26
tags: ["태그1", "태그2"]
category: "카테고리"
description: "게시글 설명"
---
```

3. 마크다운으로 내용을 작성합니다
4. GitHub에 push하면 자동으로 배포됩니다!

## 다음 단계

- [ ] GitHub 저장소 생성 (`seoyeong1000.github.io`)
- [ ] 코드를 push
- [ ] GitHub Pages 활성화
- [ ] Giscus 댓글 설정 (plan.md 참고)
- [ ] 첫 게시글 작성!

---

**Tip**: 이 파일(`pages/example.md`)을 복사하여 새 게시글을 만들 수 있습니다.

즐거운 블로깅 되세요! 🚀
