// Portfolio Section Scrolling + Goals Fade-In

// Track which section is currently visible
let currentSection = 1;

// Grab references to the sections and content
const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");
const section1Content = document.getElementById("section1-content");

// Array to store pending staggered animation timeouts
let staggerTimeouts = [];

// Function to instantly reset heading + goals (flash-proof)
function resetGoalsInstantly() {
  const heading = document.querySelector('.goal-of-website');
  const goals = document.querySelectorAll('.goals-list li');

  // Temporarily disable transitions for instant reset
  heading.style.transition = 'none';
  goals.forEach(goal => goal.style.transition = 'none');

  // Reset opacity and transform immediately
  heading.style.opacity = 0;
  heading.style.transform = 'translateY(20px)';
  goals.forEach(goal => {
    goal.style.opacity = 0;
    goal.style.transform = 'translateY(20px)';
  });

  // Force browser repaint, then re-enable transitions for next animation
  requestAnimationFrame(() => {
    heading.style.transition = 'opacity 1s ease, transform 1s ease';
    goals.forEach(goal => {
      goal.style.transition = 'opacity 1s ease, transform 1s ease';
    });
  });
}

// Scroll to Section 2 and trigger fade-ins
function goToSection2() {
  // Shrink Section 1 content
  section1Content.style.transform = "scale(0.5)";
  section1Content.style.opacity = "0";

  // Expand Section 2
  section2.style.transform = "scale(1)";
  section2.style.opacity = "1";

  // Scroll into view smoothly
  section2.scrollIntoView({ behavior: "smooth" });
  currentSection = 2;

  // Clear any pending stagger timeouts
  staggerTimeouts.forEach(id => clearTimeout(id));
  staggerTimeouts = [];

  // Reset heading + goals instantly (flash-proof)
  resetGoalsInstantly();

  const heading = document.querySelector('.goal-of-website');
  const goals = document.querySelectorAll('.goals-list li');

  // Use requestAnimationFrame to start stagger after reset
  requestAnimationFrame(() => {
    // Animate heading first
    const headingTimeout = setTimeout(() => {
      heading.style.opacity = 1;
      heading.style.transform = 'translateY(0)';
    }, 100); // small delay
    staggerTimeouts.push(headingTimeout);

    // Animate goals with stagger
    goals.forEach((goal, index) => {
      const timeoutId = setTimeout(() => {
        goal.style.opacity = 1;
        goal.style.transform = 'translateY(0)';
      }, 600 + index * 600); // 400ms after heading + 400ms per goal
      staggerTimeouts.push(timeoutId);
    });
  });
}

// Scroll back to Section 1 and reset fade-ins
function goToSection1() {
  // Expand Section 1 content
  section1Content.style.transform = "scale(1)";
  section1Content.style.opacity = "1";

  // Shrink Section 2
  section2.style.transform = "scale(0.5)";
  section2.style.opacity = "0";

  // Scroll into view smoothly
  section1.scrollIntoView({ behavior: "smooth" });
  currentSection = 1;

  // Clear any pending timeouts
  staggerTimeouts.forEach(id => clearTimeout(id));
  staggerTimeouts = [];

  // Reset heading + goals instantly (flash-proof)
  resetGoalsInstantly();
}

// Mouse wheel navigation between sections
window.addEventListener("wheel", (e) => {
  // Scroll down from Section 1 to Section 2
  if (e.deltaY > 10 && currentSection === 1) {
    e.preventDefault(); // prevent default scrolling
    goToSection2();
  }
  // Scroll up from Section 2 to Section 1
  else if (e.deltaY < -10 && currentSection === 2) {
    e.preventDefault(); // prevent default scrolling
    goToSection1();
  }
}, { passive: false });

// Keyboard handling
window.addEventListener("keydown", (e) => {
  if ((e.key === "ArrowDown" || e.key === "PageDown") && currentSection === 1) {
    goToSection2();
  }
  else if ((e.key === "ArrowUp" || e.key === "PageUp") && currentSection === 2) {
    goToSection1();
  }
});
// Touch handling for mobile
let touchStartY = 0;
window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});
// Touch handling for touchpad/trackpad
window.addEventListener("touchend", (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  if (touchStartY > touchEndY + 50 && currentSection === 1) {
    goToSection2();
  }
  else if (touchStartY < touchEndY - 50 && currentSection === 2) {
    goToSection1();
  }
});