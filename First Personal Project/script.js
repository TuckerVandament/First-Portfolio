let currentSection = 1;
const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");
const section1Content = document.getElementById("section1-content");

// Global function to scroll to Section2
function goToSection2() {
  section1Content.style.transform = "scale(0.5)";
  section1Content.style.opacity = "0";

  section2.style.transform = "scale(1)";
  section2.style.opacity = "1";

  section2.scrollIntoView({ behavior: "smooth" });
  currentSection = 2;
}

// Global function to scroll back to Section1
function goToSection1() {
  section1Content.style.transform = "scale(1)";
  section1Content.style.opacity = "1";

  section2.style.transform = "scale(0.5)";
  section2.style.opacity = "0";

  section1.scrollIntoView({ behavior: "smooth" });
  currentSection = 1;
}

// Mouse wheel handling
window.addEventListener("wheel", (e) => {
  if (e.deltaY > 10 && currentSection === 1) {
    e.preventDefault();
    goToSection2();
  } else if (e.deltaY < -10 && currentSection === 2) {
    e.preventDefault();
    goToSection1();
  }
}, { passive: false });

// Keyboard handling
window.addEventListener("keydown", (e) => {
  if ((e.key === "ArrowDown" || e.key === "PageDown") && currentSection === 1) goToSection2();
  else if ((e.key === "ArrowUp" || e.key === "PageUp") && currentSection === 2) goToSection1();
});
// Touch handling for mobile
let touchStartY = 0;
window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  if (touchStartY > touchEndY + 50 && currentSection === 1) goToSection2();
  else if (touchStartY < touchEndY - 50 && currentSection === 2) goToSection1();
});