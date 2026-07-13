document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const year = document.querySelector("[data-current-year]");

if (year) year.textContent = new Date().getFullYear();

const photoConfig = window.SITE_PHOTOS ?? {};
document.querySelectorAll("[data-photo-gallery]").forEach(async (gallery) => {
  const configuredPhotos = photoConfig[gallery.dataset.photoSlot];
  const fileNames = (Array.isArray(configuredPhotos) ? configuredPhotos : [configuredPhotos])
    .filter((fileName) => typeof fileName === "string" && fileName.trim())
    .map((fileName) => fileName.trim());

  if (!fileNames.length) return;

  const photos = (await Promise.all(fileNames.map((fileName) => new Promise((resolve) => {
    const image = new Image();
    image.className = "space-image";
    image.alt = "";
    image.decoding = "async";
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener("error", () => resolve(null), { once: true });
    image.src = "assets/photos/" + fileName;
  })))).filter(Boolean);

  if (!photos.length) return;

  const controls = gallery.querySelector("[data-photo-controls]");
  const counter = gallery.querySelector("[data-photo-count]");
  const previousButton = gallery.querySelector("[data-photo-prev]");
  const nextButton = gallery.querySelector("[data-photo-next]");
  let currentIndex = 0;

  photos.forEach((image) => gallery.insertBefore(image, controls));
  gallery.classList.add("has-photo");

  const showPhoto = (index) => {
    currentIndex = (index + photos.length) % photos.length;
    photos.forEach((image, photoIndex) => image.classList.toggle("is-active", photoIndex === currentIndex));
    if (counter) counter.textContent = (currentIndex + 1) + " / " + photos.length;
  };

  showPhoto(0);

  if (photos.length > 1 && controls) {
    controls.hidden = false;
    previousButton?.addEventListener("click", () => showPhoto(currentIndex - 1));
    nextButton?.addEventListener("click", () => showPhoto(currentIndex + 1));
  }
});

const projectStillsContainer = document.querySelector("[data-project-stills]");
const configuredProjects = Array.isArray(photoConfig.projectStills) ? photoConfig.projectStills : [];

const loadProjectImage = (file) => new Promise((resolve) => {
  const image = new Image();
  image.loading = "eager";
  image.decoding = "async";
  image.addEventListener("load", () => resolve(image), { once: true });
  image.addEventListener("error", () => resolve(null), { once: true });
  image.src = "assets/photos/" + file.split("/").map(encodeURIComponent).join("/");
});

if (projectStillsContainer && configuredProjects.length) {
  Promise.all(configuredProjects.map(async (project) => {
    const normalized = typeof project === "string"
      ? { title: "", images: [project] }
      : { title: project?.title || "", images: project?.images || (project?.file ? [project.file] : []) };
    const images = (await Promise.all(normalized.images.filter(Boolean).map(loadProjectImage))).filter(Boolean);
    return images.length ? { title: normalized.title, images } : null;
  })).then((loadedProjects) => {
    const projects = loadedProjects.filter(Boolean);
    if (!projects.length) return;

    const fragment = document.createDocumentFragment();
    projects.forEach(({ title, images }, projectIndex) => {
      const figure = document.createElement("figure");
      const number = document.createElement("span");
      const caption = document.createElement("figcaption");
      const controls = document.createElement("div");
      const previous = document.createElement("button");
      const counter = document.createElement("span");
      const next = document.createElement("button");
      let currentIndex = 0;

      figure.className = "project-still";
      number.className = "project-still-index";
      number.textContent = String(projectIndex + 1).padStart(2, "0");
      caption.className = "project-still-title";
      caption.textContent = title;
      controls.className = "project-still-controls";
      previous.type = next.type = "button";
      previous.className = next.className = "project-still-control";
      previous.textContent = "←";
      next.textContent = "→";
      previous.setAttribute("aria-label", title + " 이전 스틸컷");
      next.setAttribute("aria-label", title + " 다음 스틸컷");
      counter.className = "project-still-counter";
      counter.setAttribute("aria-live", "polite");

      const showImage = (index) => {
        currentIndex = (index + images.length) % images.length;
        images.forEach((image, imageIndex) => image.classList.toggle("is-active", imageIndex === currentIndex));
        counter.textContent = (currentIndex + 1) + " / " + images.length;
      };

      images.forEach((image, imageIndex) => {
        image.alt = title + " 프로젝트 스틸컷 " + (imageIndex + 1);
        image.className = "project-still-image";
        figure.append(image);
      });
      previous.addEventListener("click", () => showImage(currentIndex - 1));
      next.addEventListener("click", () => showImage(currentIndex + 1));
      controls.append(previous, counter, next);
      figure.append(number, caption);
      if (images.length > 1) figure.append(controls);
      showImage(0);
      fragment.append(figure);
    });
    projectStillsContainer.replaceChildren(fragment);
  });
}

const youtubeFrame = document.querySelector("[data-youtube-src]");
if (youtubeFrame) {
  if (window.location.protocol === "file:") {
    const videoLink = document.createElement("a");
    const thumbnail = document.createElement("img");
    const playLabel = document.createElement("span");
    videoLink.className = "video-local-fallback";
    videoLink.href = "https://www.youtube.com/watch?v=v3r9zT6NgGw";
    videoLink.target = "_blank";
    videoLink.rel = "noopener noreferrer";
    videoLink.setAttribute("aria-label", "YouTube에서 교육과정 영상 재생");
    thumbnail.src = "https://i.ytimg.com/vi/v3r9zT6NgGw/maxresdefault.jpg";
    thumbnail.alt = "버추얼 프로덕션 교육과정 영상 썸네일";
    playLabel.textContent = "YouTube에서 재생";
    videoLink.append(thumbnail, playLabel);
    youtubeFrame.replaceWith(videoLink);
  } else {
    youtubeFrame.src = youtubeFrame.dataset.youtubeSrc;
  }
}
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const closeMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "메뉴 열기");
  navigation?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "메뉴 닫기" : "메뉴 열기");
  navigation?.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
