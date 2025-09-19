// Set initial theme based on system preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme =
  localStorage.getItem("theme") ||
  (prefersDarkScheme.matches ? "dark" : "light");
document.documentElement.setAttribute("data-theme", currentTheme);
const themeRadio = document.querySelector(
  `input[type="radio"][value="${currentTheme}"]`,
);
if (themeRadio) {
  themeRadio.checked = true;
}

// Update theme on radio button change with smooth transition
document
  .querySelectorAll('input[type="radio"][name="color-scheme"]')
  .forEach((input) => {
    input.addEventListener("change", (event) => {
      const selectedTheme = event.target.value;

      // Add transition class for smooth effect
      document.documentElement.classList.add("theme-transitioning");

      // Apply the new theme
      document.documentElement.setAttribute("data-theme", selectedTheme);
      localStorage.setItem("theme", selectedTheme);

      // Remove transition class after animation completes
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 300);
    });
  });

// Toggle submenu visibility with smooth animation
document.querySelectorAll(".button-theme").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const submenu = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    if (submenu) {
      if (isExpanded) {
        // Hide submenu
        submenu.classList.remove("show");
        setTimeout(() => {
          submenu.style.display = "none";
        }, 200);
        button.setAttribute("aria-expanded", "false");
      } else {
        // Show submenu
        submenu.style.display = "block";
        submenu.classList.add("show");
        button.setAttribute("aria-expanded", "true");
      }
    }
  });
});

// Close submenu when clicking outside with smooth animation
document.addEventListener("click", (event) => {
  if (!event.target.closest(".theme-switcher-menu")) {
    document.querySelectorAll(".submenu").forEach((submenu) => {
      if (submenu.classList.contains("show")) {
        submenu.classList.remove("show");
        setTimeout(() => {
          submenu.style.display = "none";
        }, 200);
      }
    });

    // Update aria-expanded for all theme buttons
    document.querySelectorAll(".button-theme").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  }
});
