// Set initial theme based on system preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light");
document.documentElement.setAttribute("data-theme", currentTheme);      
const themeRadio = document.querySelector(`input[type="radio"][value="${currentTheme}"]`);
if (themeRadio) {
    themeRadio.checked = true;
}

// Update theme on radio button change
document.querySelectorAll('input[type="radio"][name="color-scheme"]').forEach(input => {
  input.addEventListener("change", (event) => {
    const selectedTheme = event.target.value;
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  });
}); 

// Toggle submenu visibility
document.querySelectorAll('.button-theme').forEach(button => {
  button.addEventListener('click', () => {
    const submenu = button.nextElementSibling;
    if (submenu) {
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    }
  });
});

// Close submenu when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.button-theme')) {
    document.querySelectorAll('.submenu').forEach(submenu => {
      submenu.style.display = 'none';
    });
  }
});
