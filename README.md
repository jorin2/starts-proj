# Virtual Production Education Landing Page

버추얼 프로덕션 교육 프로그램을 소개하기 위한 반응형 홍보 웹페이지입니다.

A responsive promotional landing page for a virtual production education program.

## Project structure

```text
.
├── index.html          # 페이지 구조와 콘텐츠 / Page content
├── styles.css          # 디자인과 반응형 레이아웃 / Styles
├── script.js           # 메뉴와 화면 효과 / Interactions
├── assets/             # 웹에 실제로 게시할 최종 자료 / Published assets
└── reference/          # AI 작업 참고용 원본 자료 / Local source materials
```

`reference/`에 넣은 원본 자료는 `.gitignore`로 보호되어 공개 GitHub 저장소에 업로드되지 않습니다. 웹페이지에 실제로 사용할 최종 자료만 `assets/`로 복사해 주세요.

Files placed in `reference/` stay local and are excluded from the public GitHub repository. Copy only finalized, publishable assets into `assets/`.

## Preview

`index.html`을 브라우저에서 열면 바로 확인할 수 있습니다. 별도의 설치나 빌드 과정은 필요하지 않습니다.

Open `index.html` in a browser. No installation or build step is required.

## Photo selection

1. 사용할 사진을 `assets/photos/`에 복사합니다.
2. `assets/photos/photo-config.js`에서 각 영역에 표시할 파일명을 입력합니다.
3. 파일명이 비어 있거나 사진을 찾을 수 없으면 기존 그래픽이 표시됩니다.

Copy photos into `assets/photos/`, then choose the filenames in `assets/photos/photo-config.js`. The original graphic remains visible when a filename is empty or the image cannot be found.
