const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!motionOff && "IntersectionObserver" in window) {
  document.body.classList.add("reveal-ready");
  const revealItems = document.querySelectorAll(".section, .bio-grid, .manifesto, .project-card, .project-cta");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const portrait = document.querySelector(".portrait-frame");
if (portrait && !motionOff && window.matchMedia("(pointer: fine)").matches) {
  const movePortrait = (event) => {
    const bounds = portrait.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    portrait.parentElement.style.transform = `translate(${x * 7}px, ${y * 7}px)`;
  };
  portrait.addEventListener("pointermove", movePortrait);
  portrait.addEventListener("pointerleave", () => { portrait.parentElement.style.transform = ""; });
}
