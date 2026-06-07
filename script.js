const progress = document.querySelector(".scroll-progress");
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const glow = document.querySelector(".cursor-glow");

function updateProgress() {
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progress.style.width = `${scrolled * 100}%`;
  nav.classList.toggle("scrolled", window.scrollY > 48);
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

toggle?.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    glow.style.opacity = "1";
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16,
  rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = Number(el.dataset.target || 0);
    const duration = 1150;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = `${value}+`;

      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = `${target}+`;
    }

    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.65 });

document.querySelectorAll(".count").forEach((el) => countObserver.observe(el));

document.querySelectorAll(".case-row").forEach((card) => {
  const video = card.querySelector("video");
  if (!video) return;

  card.addEventListener("mouseenter", () => {
    video.play().catch(() => {});
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
  });
});

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;

    document.querySelectorAll("details").forEach((other) => {
      if (other !== detail) other.removeAttribute("open");
    });
  });
});



/* ===== KM MEDIA V5.4 SCROLL-REACTIVE BACKGROUND ===== */
const ambientOrbs = document.querySelectorAll(".ambient-orb");

function updateAmbientBackground() {
  if (!ambientOrbs.length) return;

  const y = window.scrollY || 0;
  ambientOrbs.forEach((orb, index) => {
    const speed = [0.035, -0.025, 0.018][index] || 0.02;
    const horizontal = [0.012, -0.018, 0.01][index] || 0.01;
    orb.style.transform = `translate3d(${y * horizontal}px, ${y * speed}px, 0)`;
  });
}

window.addEventListener("scroll", updateAmbientBackground, { passive: true });
updateAmbientBackground();


/* ===== KM MEDIA V21 FORM STATE ===== */
document.querySelector(".contact-form")?.addEventListener("submit", () => {
  const button = document.querySelector(".contact-form button[type='submit']");
  if (button) button.textContent = "Sender...";
});
