const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav-menu");
const projectGrid = document.querySelector("#project-grid");
const reelsGrid = document.querySelector("#reels-grid");
const projects = Array.isArray(window.WESTIN_PROJECTS)
  ? window.WESTIN_PROJECTS
  : [];
const reelCollections = Array.isArray(window.WESTIN_REELS)
  ? window.WESTIN_REELS
  : [];

menuButton?.addEventListener("click", () => {
  const open = menu?.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(Boolean(open)));
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

function youtubeEmbedUrl(videoId) {
  const pageOrigin =
    window.location.origin && window.location.origin !== "null"
      ? window.location.origin
      : "https://www.youtube.com";
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    playsinline: "1",
    origin: pageOrigin,
    widget_referrer: window.location.href,
  });

  return `https://www.youtube.com/embed/${videoId}?${params}`;
}

function openProject(project, trigger) {
  if (!project.videos?.length) return;

  const modal = document.createElement("dialog");
  modal.className = "video-modal";
  modal.setAttribute("aria-labelledby", `modal-title-${project.id}`);

  const panel = document.createElement("div");
  panel.className = "video-modal-panel";

  const closeButton = document.createElement("button");
  closeButton.className = "video-modal-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close project player");
  closeButton.textContent = "Close ×";

  const heading = document.createElement("div");
  heading.className = "video-modal-heading";

  const headingMeta = document.createElement("p");
  headingMeta.className = "section-label light";
  headingMeta.textContent = `${project.category} · ${project.videos.length} films`;

  const title = document.createElement("h2");
  title.id = `modal-title-${project.id}`;
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  heading.append(headingMeta, title, description);

  const playerFrame = document.createElement("div");
  playerFrame.className = "video-player-frame";

  const player = document.createElement("iframe");
  player.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  player.referrerPolicy = "strict-origin-when-cross-origin";
  player.allowFullscreen = true;
  playerFrame.append(player);

  const youtubeLink = document.createElement("a");
  youtubeLink.className = "youtube-fallback";
  youtubeLink.target = "_blank";
  youtubeLink.rel = "noopener";
  youtubeLink.textContent = "Having trouble? Watch on YouTube ↗";

  const videoList = document.createElement("div");
  videoList.className = "video-list";
  videoList.setAttribute("aria-label", `${project.title} films`);

  const videoButtons = project.videos.map((video, index) => {
    const button = document.createElement("button");
    button.className = "video-choice";
    button.type = "button";

    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");

    const name = document.createElement("strong");
    name.textContent = video.title;

    const action = document.createElement("span");
    action.className = "video-choice-action";
    action.textContent = "Play ↗";

    button.append(number, name, action);
    button.addEventListener("click", () => selectVideo(index));
    videoList.append(button);
    return button;
  });

  function selectVideo(index) {
    const video = project.videos[index];
    player.src = youtubeEmbedUrl(video.youtubeId);
    player.title = `${project.title}: ${video.title}`;
    youtubeLink.href = `https://www.youtube.com/watch?v=${video.youtubeId}`;

    videoButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  closeButton.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
  modal.addEventListener("close", () => {
    player.src = "about:blank";
    document.body.classList.remove("modal-open");
    modal.remove();
    trigger.focus();
  });

  panel.append(closeButton, heading, playerFrame, youtubeLink, videoList);
  modal.append(panel);
  document.body.append(modal);
  document.body.classList.add("modal-open");
  modal.showModal();
  selectVideo(0);
  closeButton.focus();
}

function renderProjects() {
  if (!projectGrid) return;

  projectGrid.classList.toggle("single-project", projects.length === 1);

  if (!projects.length) {
    const message = document.createElement("p");
    message.className = "projects-message";
    message.textContent = "New work is coming soon.";
    projectGrid.append(message);
    return;
  }

  projects.forEach((project, index) => {
    const article = document.createElement("article");
    article.className = "project reveal";

    const button = document.createElement("button");
    button.className = "project-button";
    button.type = "button";
    button.setAttribute("aria-label", `Watch ${project.title}`);

    const imageFrame = document.createElement("span");
    imageFrame.className = "project-image landscape";

    const image = document.createElement("img");
    image.src = project.thumbnail;
    image.alt = `${project.title} project thumbnail`;
    image.loading = "lazy";
    image.decoding = "async";

    const play = document.createElement("span");
    play.className = "play";
    play.setAttribute("aria-hidden", "true");
    play.textContent = "▶";

    const number = document.createElement("span");
    number.className = "project-number";
    number.textContent = `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

    const count = document.createElement("span");
    count.className = "project-film-count";
    count.textContent = `${project.videos.length} films`;

    imageFrame.append(image, play, number, count);

    const meta = document.createElement("span");
    meta.className = "project-meta";

    const details = document.createElement("span");
    const projectTitle = document.createElement("strong");
    projectTitle.className = "project-title";
    projectTitle.textContent = project.title;
    const category = document.createElement("span");
    category.className = "project-category";
    category.textContent = project.category;
    details.append(projectTitle, category);

    const prompt = document.createElement("span");
    prompt.className = "project-prompt";
    prompt.textContent = "View project ↗";

    meta.append(details, prompt);
    button.append(imageFrame, meta);
    button.addEventListener("click", () => openProject(project, button));
    article.append(button);
    projectGrid.append(article);
  });
}

function renderReels() {
  if (!reelsGrid) return;

  reelsGrid.innerHTML = "";

  reelCollections.forEach((collection) => {
    collection.reels.forEach((reel) => {
      const item = document.createElement("div");
      item.className = "instagram-reel-item";

      if (reel.instagramUrl) {
        item.innerHTML = `
          <h3>${reel.title}</h3>
          <blockquote
            class="instagram-media"
            data-instgrm-permalink="${reel.instagramUrl}"
            data-instgrm-version="14">
          </blockquote>
        `;
      }

      if (reel.youtubeId) {
        item.innerHTML = `
          <h3>${reel.title}</h3>
          <div class="youtube-reel">
            <iframe
              src="https://www.youtube.com/embed/${reel.youtubeId}?rel=0&playsinline=1"
              title="${reel.title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        `;
      }

      reelsGrid.appendChild(item);
    });
  });

  const processEmbeds = () => window.instgrm?.Embeds.process();

  if (window.instgrm) {
    processEmbeds();
  } else if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
    const instagramScript = document.createElement("script");
    instagramScript.src = "https://www.instagram.com/embed.js";
    instagramScript.async = true;
    instagramScript.onload = processEmbeds;
    document.body.appendChild(instagramScript);
  }
}

renderProjects();
renderReels();

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (reducedMotion) {
  document
    .querySelectorAll(".reveal")
    .forEach((item) => item.classList.add("visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
