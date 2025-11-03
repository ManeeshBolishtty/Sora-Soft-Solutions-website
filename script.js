document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("modeToggle");

  toggleBtn.addEventListener("click", () => {
    const root = document.documentElement;
    const currentBg = getComputedStyle(root).getPropertyValue("--bg-color").trim();

    if (currentBg === "#0f172a") {
      root.style.setProperty("--bg-color", "#f5f5f5");
      root.style.setProperty("--text-color", "#333");
    } else {
      root.style.setProperty("--bg-color", "#0f172a");
      root.style.setProperty("--text-color", "#f0f0f0");
    }
  });
});
// Scroll animation for About Us section
window.addEventListener("scroll", () => {
  const aboutSection = document.querySelector(".about-us");
  const sectionTop = aboutSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight - 100) {
    aboutSection.classList.add("visible");
  }
});
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



