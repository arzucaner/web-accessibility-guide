function showSection(sectionId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.remove("hidden");
    } else {
      section.classList.add("hidden");
    }
  });

  // Update aria-current="page" on navigation links
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.removeAttribute("aria-current");
  });
  
  // Find and set aria-current="page" on the active navigation link
  const activeLink = document.querySelector(`nav a[onclick="showSection('${sectionId}')"]`);
  if (activeLink) {
    activeLink.setAttribute("aria-current", "page");
  }

  // Update document title with active section's heading text
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    const heading = activeSection.querySelector('h2');
    if (heading) {
      document.title = `Web Accessibility Guide — ${heading.textContent}`;
    }
  }

  // Move focus to main content area after toggling visibility
  const mainElement = document.getElementById('main');
  if (mainElement) {
    // Ensure main element is focusable
    if (!mainElement.hasAttribute('tabindex')) {
      mainElement.setAttribute('tabindex', '-1');
    }
    mainElement.focus();
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  document.body.style.setProperty(
    "--background-color",
    document.body.classList.contains("dark-mode") ? "#121212" : "#f4f4f4"
  );
  document.body.style.setProperty(
    "--text-color",
    document.body.classList.contains("dark-mode") ? "#f4f4f4" : "#333"
  );
}

function toggleContrast() {
  document.body.classList.toggle("high-contrast");
}

function updateLiveRegion() {
  const liveRegion = document.getElementById("live-region");
  liveRegion.textContent = "The content has been updated!";
}

function validateEmail(event) {
  event.preventDefault();
  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("error-message");

  if (!emailInput.value.includes("@")) {
    errorMessage.textContent = "Please enter a valid email address.";
  } else {
    errorMessage.textContent = "Email is valid!";
    errorMessage.style.color = "green";
  }
}

function startAnimation() {
  const box = document.getElementById("animated-box");
  box.style.animation = "move 2s infinite";
}


const languageSelect = document.getElementById('language-select');
const helloWorldText = document.getElementById('hello-world-text');

const translations = {
  en: 'Hello World ',
  fr: 'Bonjour le monde',
  ja: 'こんにちは世界'
};

languageSelect.addEventListener('change', (event) => {
  const selectedLang = event.target.value;
  helloWorldText.lang = selectedLang;
  helloWorldText.textContent = translations[selectedLang];
});

const userLang = navigator.language || navigator.userLanguage;
if (translations[userLang.slice(0, 2)]) {
  languageSelect.value = userLang.slice(0, 2);
  languageSelect.dispatchEvent(new Event('change'));
}

// Slider Functionality
function updateSliderValue(slider) {
  const value = slider.value;
  slider.setAttribute("aria-valuenow", value);
  document.getElementById("slider-value").textContent = value;
}

function handleSliderKeydown(event, slider) {
  if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    slider.stepUp();
    updateSliderValue(slider);
  } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    slider.stepDown();
    updateSliderValue(slider);
  }
}

// Date Picker Functionality
const today = new Date();
const calendarBody = document.getElementById("calendar-body");
const dateInput = document.getElementById("date-input");

function toggleCalendar() {
  const calendar = document.getElementById("calendar");
  const isActive = calendar.classList.toggle("active");
  dateInput.setAttribute("aria-expanded", isActive);
  if (isActive) {
    generateCalendar(today);
  }
}

function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarBody.innerHTML = "";
  let row = document.createElement("tr");

  // Create empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement("td"));
  }

  // Create cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    if (row.children.length === 7) {
      calendarBody.appendChild(row);
      row = document.createElement("tr");
    }

    const cell = document.createElement("td");
    cell.textContent = day;
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
    }
    cell.addEventListener("click", () => selectDate( day, month, year,));
    row.appendChild(cell);
  }

  // Append remaining row
  if (row.children.length > 0) {
    calendarBody.appendChild(row);
  }
}

function selectDate(day, month, year) {
  const selectedDate = new Date(year, month, day); 
  const formattedDate = `${String(day).padStart(2, "0")}-${String(month + 1).padStart(2, "0")}-${year}`; 
  dateInput.value = formattedDate;
  toggleCalendar();
}

/* Add Accessible Notifications */

function showNotification(message) {
  const notification = document.createElement('div');
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'assertive');
  notification.className = 'toast-notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Guard against duplicate GitHub buttons script loading
(function() {
  // Check if GitHub buttons script is already loaded or being loaded
  const existingScript = document.querySelector('script[src="https://buttons.github.io/buttons.js"]');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://buttons.github.io/buttons.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
})();