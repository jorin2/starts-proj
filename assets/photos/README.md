# 사진 선택 폴더 / Photo Selection Folder

이 폴더에 웹사이트에서 사용할 사진을 넣어 주세요.

Place the photos you want to use on the website in this folder.

## 사용 방법 / How to use

1. JPG, PNG, WebP 또는 AVIF 사진을 이 폴더에 복사합니다.
2. `photo-config.js`를 메모장이나 코드 편집기로 엽니다.
3. 원하는 파일명을 아래처럼 입력하고 저장합니다. 여러 장을 입력하면 웹페이지의 화살표 버튼으로 사진을 바꿀 수 있습니다.

Copy JPG, PNG, WebP, or AVIF files here. Open `photo-config.js`, enter the selected filenames as shown below, and save it.

```js
window.SITE_PHOTOS = {
  edgeStage: "edgestage1.jpg",
  nextLab: "nextlab1.jpg",
  projectStills: ["project-still-01.jpg", "project-still-02.jpg"],
};
```

- `edgeStage`: EDGE STAGE 영역 사진 / Photo for the EDGE STAGE section
- `nextLab`: NEXT LAB 영역 사진 / Photo for the NEXT LAB section
- `projectStills`: 프로젝트 스틸 컷 목록 / List of project still images
- 한 장만 사용할 때: `"photo.jpg"` / Use `"photo.jpg"` for a single image
- 여러 장을 사용할 때: `["photo-1.jpg", "photo-2.jpg"]` / Use an array for multiple images
- 빈 문자열 `""`: 기존 그래픽 사용 / Keep the original graphic

메인 및 SNS 공유 이미지는 현재 이 폴더의 `main.jpg`를 사용합니다. 프로젝트 스틸 컷도 이 폴더에 넣은 뒤 `projectStills`에 파일명을 추가하세요.

The hero and social-sharing image currently use `main.jpg`. Add project stills to this folder and list their filenames under `projectStills`.

파일명에는 영문 소문자, 숫자, 하이픈 사용을 권장합니다. 예: `edge-stage-01.jpg`

Lowercase letters, numbers, and hyphens are recommended for filenames, for example `edge-stage-01.jpg`.
