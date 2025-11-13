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
  
  // Update aria-current="page" on TOC links
  const tocLinks = document.querySelectorAll(".toc-link");
  tocLinks.forEach((link) => {
    link.removeAttribute("aria-current");
  });
  
  // Find and set aria-current="page" on the active TOC link
  const activeTocLink = document.querySelector(`.toc-link[href="#${sectionId}"]`);
  if (activeTocLink) {
    activeTocLink.setAttribute("aria-current", "page");
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

function initKnowledgeChecks() {
  const quizzes = document.querySelectorAll('.quiz');
  if (!quizzes.length) {
    return;
  }

  quizzes.forEach((quiz, index) => {
    const options = quiz.querySelectorAll('.quiz-option');
    if (!options.length) {
      return;
    }

    const hasCorrectOption = Array.from(options).some((option) => option.dataset.correct === 'true');
    if (!hasCorrectOption) {
      return;
    }

    const feedback = quiz.querySelector('.quiz-feedback');
    if (feedback) {
      feedback.setAttribute('aria-live', 'polite');
      feedback.setAttribute('aria-atomic', 'true');
      if (!feedback.id) {
        feedback.id = `quiz-feedback-${index + 1}`;
      }
    }

    options.forEach((button) => {
      button.type = 'button';
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-disabled', 'false');
      button.classList.remove('correct', 'incorrect', 'quiz-option-disabled');

      button.addEventListener('click', () => {
        handleKnowledgeCheckSelection(quiz, button, feedback);
      });

      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          button.click();
        }
      });
    });
  });
}

function handleKnowledgeCheckSelection(quiz, selectedButton, feedback) {
  if (quiz.dataset.quizComplete === 'true') {
    return;
  }

  const options = Array.from(quiz.querySelectorAll('.quiz-option'));
  const isCorrect = selectedButton.dataset.correct === 'true';

  options.forEach((option) => {
    option.disabled = true;
    option.setAttribute('aria-disabled', 'true');
    option.setAttribute('aria-pressed', option === selectedButton ? 'true' : 'false');
    option.classList.add('quiz-option-disabled');
    option.classList.remove('correct', 'incorrect');

    if (option.dataset.correct === 'true') {
      option.classList.add('correct');
    }
  });

  if (!isCorrect) {
    selectedButton.classList.add('incorrect');
  }

  const feedbackMessage = isCorrect ? '✅ Correct! You’re doing great.' : '❌ Not quite. Try again.';
  if (feedback) {
    feedback.textContent = feedbackMessage;
  }

  announceToScreenReader(feedbackMessage);

  quiz.dataset.quizComplete = 'true';
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

// Wire the "Read the Guide" CTA to the first section
document.getElementById('read-guide-cta')?.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('accessibility-overview');
  const main = document.getElementById('main');
  main?.focus();
  document.getElementById('accessibility-overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Table of Contents functionality
function generateTableOfContents() {
  const sections = document.querySelectorAll('main section');
  const sidebar = document.querySelector('.sidebar');
  const sidebarButtons = document.querySelector('.sidebar-buttons');
  
  if (!sections.length || !sidebar || !sidebarButtons) return;
  
  // Create TOC navigation element
  const tocNav = document.createElement('nav');
  const tocAriaLabel = getTranslation('sidebar.tableOfContents') || 'Table of contents';
  tocNav.setAttribute('aria-label', tocAriaLabel);
  tocNav.className = 'toc-nav';
  
  // Add heading for the TOC
  const tocHeading = document.createElement('h3');
  tocHeading.textContent = getTranslation('sidebar.tableOfContents') || 'Table of Contents';
  tocHeading.id = 'toc-heading';
  tocNav.appendChild(tocHeading);
  
  const tocList = document.createElement('ul');
  tocList.className = 'toc-list';
  
  sections.forEach(section => {
    const h2 = section.querySelector('h2');
    if (h2 && section.id) {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      
      link.href = `#${section.id}`;
      link.textContent = h2.textContent;
      link.className = 'toc-link';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(section.id);
        // Scroll to section smoothly
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    }
  });
  
  tocNav.appendChild(tocList);
  
  // Insert TOC after the intro paragraph but before the buttons
  const introParagraph = sidebar.querySelector('p');
  if (introParagraph) {
    introParagraph.insertAdjacentElement('afterend', tocNav);
  } else {
    sidebarButtons.insertAdjacentElement('beforebegin', tocNav);
  }
  
  return tocNav;
}

// IntersectionObserver for updating active TOC item
function setupTocIntersectionObserver() {
  const sections = document.querySelectorAll('main section');
  const tocLinks = document.querySelectorAll('.toc-link');
  
  if (!sections.length || !tocLinks.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove aria-current from all TOC links
        tocLinks.forEach(link => {
          link.removeAttribute('aria-current');
        });
        
        // Add aria-current to the corresponding TOC link
        const activeLink = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.setAttribute('aria-current', 'page');
        }
      }
    });
  }, {
    rootMargin: '-20% 0px -20% 0px', // Trigger when section is 20% visible
    threshold: 0.1
  });
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
}


// Copy code functionality
function copyCode(button) {
  const codeExample = button.closest('.code-example');
  const preElements = codeExample.querySelectorAll('pre');
  
  // Combine all pre elements' text content
  let codeText = '';
  preElements.forEach((pre, index) => {
    if (index > 0) codeText += '\n\n';
    codeText += pre.textContent;
  });
  
  // Copy to clipboard using modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(codeText).then(() => {
      showCopySuccess(button);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
      fallbackCopyTextToClipboard(codeText, button);
    });
  } else {
    // Fallback for older browsers or non-secure contexts
    fallbackCopyTextToClipboard(codeText, button);
  }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text, button) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopySuccess(button);
    } else {
      showCopyError(button);
    }
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
    showCopyError(button);
  }
  
  document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess(button) {
  const copyText = button.querySelector('.copy-text');
  const originalText = copyText.textContent;
  
  // Visual feedback on button
  button.classList.add('copied');
  button.setAttribute('aria-label', 'Code copied to clipboard');
  
  // Reset button after 2 seconds
  setTimeout(() => {
    button.classList.remove('copied');
    button.setAttribute('aria-label', 'Copy code to clipboard');
  }, 2000);
  
  // Show toast notification
  const feedback = document.getElementById('copy-feedback');
  feedback.textContent = getTranslation('accessibility.copied') || 'Copied!';
  feedback.classList.add('show');
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    feedback.classList.remove('show');
  }, 3000);
  
  // Announce to screen readers
  announceToScreenReader(getTranslation('accessibility.codeCopied') || 'Code copied to clipboard');
}

// Show copy error feedback
function showCopyError(button) {
  const feedback = document.getElementById('copy-feedback');
  feedback.textContent = 'Failed to copy';
  feedback.style.backgroundColor = '#dc3545';
  feedback.classList.add('show');
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    feedback.classList.remove('show');
    feedback.style.backgroundColor = '#28a745'; // Reset color
  }, 3000);
  
  // Announce to screen readers
  announceToScreenReader(getTranslation('accessibility.copyFailed') || 'Failed to copy code');
}

// Announce message to screen readers
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Back to Top Button Functionality
function initBackToTopButton() {
  const backToTopButton = document.getElementById('back-to-top');
  if (!backToTopButton) return;

  // Show/hide button based on scroll position
  function toggleBackToTopButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    if (scrollTop > windowHeight) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }

  // Smooth scroll to top and focus main element
  function scrollToTop() {
    const mainElement = document.getElementById('main');
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Focus main element after scroll completes
    setTimeout(() => {
      if (mainElement) {
        mainElement.focus();
      }
    }, 500); // Wait for smooth scroll to complete
  }

  // Add event listeners
  window.addEventListener('scroll', toggleBackToTopButton);
  backToTopButton.addEventListener('click', scrollToTop);
  
  // Handle keyboard navigation
  backToTopButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  });
}

// Smooth scrolling for section permalinks
function initSmoothScrolling() {
  // Add smooth scrolling behavior to all section links
  const sectionLinks = document.querySelectorAll('.section-link');
  
  sectionLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Update URL hash
        window.location.hash = targetId;
        
        // Show the correct section
        showSection(targetId);
        
        // Smooth scroll to the section
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Focus the heading after scroll completes
        setTimeout(() => {
          const heading = targetElement.querySelector('h2');
          if (heading) {
            heading.focus();
          }
        }, 500);
      }
    });
  });
}

// Contrast Checker Functionality
function initContrastChecker() {
  const foregroundInput = document.getElementById('text-color');
  const backgroundInput = document.getElementById('background-color');
  
  if (!foregroundInput || !backgroundInput) return;
  
  // Calculate contrast ratio and update results
  function updateContrastResults() {
    const foregroundColor = foregroundInput.value;
    const backgroundColor = backgroundInput.value;
    
    const ratio = calculateContrastRatio(foregroundColor, backgroundColor);
    const aaCompliant = ratio >= 4.5; // WCAG AA for normal text
    const aaaCompliant = ratio >= 7; // WCAG AAA for normal text
    
    // Update ratio display
    const ratioElement = document.getElementById('ratio-value');
    if (ratioElement) {
      ratioElement.textContent = ratio.toFixed(2);
    }
    
    // Update WCAG compliance status
    updateComplianceStatus('aa-status', aaCompliant);
    updateComplianceStatus('aaa-status', aaaCompliant);
    
    // Announce results to screen readers
    announceContrastResults(ratio, aaCompliant, aaaCompliant);
  }
  
  // Calculate contrast ratio between two colors
  function calculateContrastRatio(color1, color2) {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }
  
  // Get relative luminance of a color
  function getLuminance(color) {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    const { r, g, b } = rgb;
    
    // Convert to relative luminance
    const rsRGB = r / 255;
    const gsRGB = g / 255;
    const bsRGB = b / 255;
    
    const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
    
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  }
  
  // Convert hex color to RGB
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  // Update compliance status display
  function updateComplianceStatus(elementId, isCompliant) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.className = `compliance-status ${isCompliant ? 'pass' : 'fail'}`;
    element.textContent = isCompliant ? '✓ Pass' : '✗ Fail';
  }
  
  // Announce contrast results to screen readers
  function announceContrastResults(ratio, aaCompliant, aaaCompliant) {
    const aaText = aaCompliant ? 'passes' : 'fails';
    const aaaText = aaaCompliant ? 'passes' : 'fails';
    const message = `Contrast ratio ${ratio.toFixed(2)}. WCAG AA ${aaText}, WCAG AAA ${aaaText}.`;
    
    announceToScreenReader(message);
  }
  
  // Add event listeners
  foregroundInput.addEventListener('input', updateContrastResults);
  backgroundInput.addEventListener('input', updateContrastResults);
  
  // Initial calculation
  updateContrastResults();
}

// Reading Progress Bar Functionality
function initReadingProgress() {
  const progressBar = document.getElementById('read-progress');
  const mainElement = document.getElementById('main');
  
  if (!progressBar || !mainElement) return;
  
  function updateProgress() {
    const mainRect = mainElement.getBoundingClientRect();
    const mainTop = mainRect.top;
    const mainHeight = mainRect.height;
    const viewportHeight = window.innerHeight;
    
    // Calculate the total scrollable height of the main content
    const mainScrollHeight = mainHeight - viewportHeight + mainTop;
    
    if (mainScrollHeight <= 0) {
      // Content is shorter than viewport, show 100%
      progressBar.style.width = '100%';
      progressBar.setAttribute('aria-valuenow', '100');
      return;
    }
    
    // Calculate progress based on how much of the main content has been scrolled past
    const viewportBottom = viewportHeight;
    const scrolledPast = Math.max(0, viewportBottom - mainTop);
    const progress = Math.min(100, Math.max(0, (scrolledPast / mainScrollHeight) * 100));
    
    // Update progress bar
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', Math.round(progress));
  }
  
  // Update progress on scroll and resize
  let ticking = false;
  function requestUpdate() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestUpdate);
  window.addEventListener('resize', requestUpdate);
  
  // Initial update
  updateProgress();
  
  // Update immediately if user jumps via hash/permalink
  window.addEventListener('hashchange', () => {
    setTimeout(updateProgress, 100);
  });
  
  // Update when sections are shown/hidden
  const originalShowSection = window.showSection;
  if (originalShowSection) {
    window.showSection = function(sectionId) {
      originalShowSection(sectionId);
      setTimeout(updateProgress, 100);
    };
  }
}

// i18n Translation System
let currentTranslations = {};
let currentLanguage = 'en';

// Load translations from JSON file
async function loadTranslations(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Translation file not found for ${lang}`);
    }
    const translations = await response.json();
    
    // Fallback to English if key is missing
    if (lang !== 'en') {
      try {
        const enResponse = await fetch('lang/en.json');
        const enTranslations = await enResponse.json();
        currentTranslations = mergeTranslations(translations, enTranslations);
      } catch (e) {
        currentTranslations = translations;
      }
    } else {
      currentTranslations = translations;
    }
    
    applyTranslations();
    return translations;
  } catch (error) {
    console.warn(`Failed to load translations for ${lang}, falling back to English:`, error);
    // Fallback to English
    if (lang !== 'en') {
      return loadTranslations('en');
    }
    return {};
  }
}

// Merge translations with English fallback
function mergeTranslations(translations, enTranslations) {
  const merged = JSON.parse(JSON.stringify(enTranslations));
  
  function deepMerge(target, source) {
    for (const key in source) {
      if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  
  deepMerge(merged, translations);
  return merged;
}

// Get nested translation value (helper function)
function getTranslation(key) {
  const keys = key.split('.');
  let value = currentTranslations;
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return null;
    }
  }
  return value;
}

// Apply translations to elements with data-i18n attributes
function applyTranslations() {
  // Apply text content translations
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getTranslation(key);
    if (translation) {
      element.textContent = translation;
    }
  });
  
  // Apply placeholder translations
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = getTranslation(key);
    if (translation) {
      element.setAttribute('placeholder', translation);
    }
  });
  
  // Apply aria-label translations
  document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria-label');
    const translation = getTranslation(key);
    if (translation) {
      element.setAttribute('aria-label', translation);
    }
  });
  
  // Apply title translations
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    const translation = getTranslation(key);
    if (translation) {
      element.setAttribute('title', translation);
    }
  });
  
  // Update language switcher aria-label
  const languageSwitcher = document.getElementById('language-switcher');
  const languageLabel = getTranslation('language.label');
  if (languageSwitcher && languageLabel) {
    languageSwitcher.setAttribute('aria-label', languageLabel);
  }
  
  // Update search input aria-label
  const searchInput = document.getElementById('guide-search');
  const searchLabel = getTranslation('sidebar.searchLabel');
  if (searchInput && searchLabel) {
    searchInput.setAttribute('aria-label', searchLabel);
  }
  
  // Update sidebar button aria-labels
  const readGuideBtn = document.getElementById('read-guide-cta');
  const readGuideText = getTranslation('sidebar.readGuide');
  if (readGuideBtn && readGuideText) {
    readGuideBtn.setAttribute('aria-label', readGuideText);
  }
  
  const viewGitHubBtn = document.querySelector('a[href*="github.com"].btn-secondary');
  const viewGitHubText = getTranslation('sidebar.viewOnGitHub');
  if (viewGitHubBtn && viewGitHubText) {
    viewGitHubBtn.setAttribute('aria-label', viewGitHubText);
  }
  
  // Update font size reset button aria-label
  const fontResetBtn = document.getElementById('font-size-reset');
  const resetText = getTranslation('sidebar.reset');
  if (fontResetBtn && resetText) {
    fontResetBtn.setAttribute('aria-label', `Reset text size to 100 percent`);
  }
  
  // Update Table of Contents heading if it exists
  const tocHeading = document.getElementById('toc-heading');
  const tocText = getTranslation('sidebar.tableOfContents');
  if (tocHeading && tocText) {
    tocHeading.textContent = tocText;
  }
  
  // Update document lang attribute
  document.documentElement.setAttribute('lang', currentLanguage);
}

// Handle language change
async function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('lang', lang);
  
  await loadTranslations(lang);
  
  // Announce language change to screen readers
  const announcement = document.getElementById('language-announcement');
  const langNames = {
    'en': 'English',
    'tr': 'Türkçe',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'ja': '日本語'
  };
  const langName = langNames[lang] || lang;
  const changeMessage = getTranslation('language.changed')?.replace('{lang}', langName) || `Language changed to ${langName}`;
  
  if (announcement) {
    announcement.textContent = changeMessage;
    // Clear after announcement
    setTimeout(() => {
      announcement.textContent = '';
    }, 1000);
  }
}

// Initialize language on page load
async function initLanguage() {
  // Get saved language preference or detect from browser
  const savedLang = localStorage.getItem('lang');
  const browserLang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2);
  
  // Supported languages
  const supportedLangs = ['en', 'tr', 'es', 'fr', 'de', 'ja'];
  
  // Determine initial language
  let initialLang = 'en';
  if (savedLang && supportedLangs.includes(savedLang)) {
    initialLang = savedLang;
  } else if (supportedLangs.includes(browserLang)) {
    initialLang = browserLang;
  }
  
  // Set language switcher value
  const languageSwitcher = document.getElementById('language-switcher');
  if (languageSwitcher) {
    languageSwitcher.value = initialLang;
    
    // Add event listener for language changes
    languageSwitcher.addEventListener('change', (event) => {
      changeLanguage(event.target.value);
    });
  }
  
  // Load translations
  await loadTranslations(initialLang);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  await initLanguage();
  generateTableOfContents();
  setupTocIntersectionObserver();
  initBackToTopButton();
  initSmoothScrolling();
  initContrastChecker();
  initHashHandling();
  initSearch();
  initReadingProgress();
  initFontSizeControls();
  initFeedbackWidget();
  initKnowledgeChecks();
});

// Handle hash changes and initial hash
function initHashHandling() {
  // Handle initial hash if present
  if (window.location.hash) {
    const sectionId = window.location.hash.substring(1);
    showSection(sectionId);
  }
  
  // Handle hash changes
  window.addEventListener('hashchange', (event) => {
    const sectionId = event.newURL.split('#')[1];
    if (sectionId) {
      showSection(sectionId);
    }
  });
}

// Live Playground Functionality
const playgroundSnippets = {
  'pg-code-keyboard': `<div class="modal" role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Keyboard Navigation Demo</h2>
  <p>Use Tab to navigate, Enter to activate, Escape to close.</p>
  <button onclick="alert('Button 1 clicked')">Button 1</button>
  <button onclick="alert('Button 2 clicked')">Button 2</button>
  <button onclick="alert('Close modal')">Close</button>
</div>
<style>
.modal { 
  border: 2px solid #007bff; 
  padding: 20px; 
  margin: 10px; 
  background: #f8f9fa; 
}
button { 
  margin: 5px; 
  padding: 10px 15px; 
  background: #007bff; 
  color: white; 
  border: none; 
  border-radius: 4px; 
}
button:focus { 
  outline: 3px solid #ffcc00; 
  outline-offset: 2px; 
}
</style>`,
  'pg-code-aria': `<div>
  <h3>ARIA Live Region Demo</h3>
  <p>Click buttons to see live announcements:</p>
  <button onclick="updateLiveRegion('pg-live-demo', 'Message updated!')">Update Message</button>
  <button onclick="updateLiveRegion('pg-live-demo', 'New content loaded!')">Load Content</button>
  <div id="pg-live-demo" aria-live="polite">Initial message</div>
</div>
<style>
button { 
  margin: 5px; 
  padding: 10px 15px; 
  background: #28a745; 
  color: white; 
  border: none; 
  border-radius: 4px; 
}
button:focus { 
  outline: 3px solid #ffcc00; 
  outline-offset: 2px; 
}
#pg-live-demo { 
  margin: 10px 0; 
  padding: 10px; 
  background: #e9ecef; 
  border-radius: 4px; 
}
</style>
<script>
function updateLiveRegion(id, message) {
  document.getElementById(id).textContent = message;
}
</script>`,
  'pg-code-form': `<form onsubmit="validateForm(event)">
  <h3>Accessible Form Demo</h3>
  <div>
    <label for="pg-name">Name (required):</label>
    <input type="text" id="pg-name" aria-describedby="pg-name-error" required>
    <div id="pg-name-error" aria-live="polite"></div>
  </div>
  <div>
    <label for="pg-email">Email:</label>
    <input type="email" id="pg-email" aria-describedby="pg-email-error">
    <div id="pg-email-error" aria-live="polite"></div>
  </div>
  <button type="submit">Submit</button>
</form>
<style>
label { display: block; margin: 10px 0 5px 0; font-weight: bold; }
input { 
  width: 100%; 
  padding: 8px; 
  border: 2px solid #ddd; 
  border-radius: 4px; 
  margin-bottom: 5px; 
}
input:focus { 
  outline: none; 
  border-color: #007bff; 
}
input:invalid { 
  border-color: #dc3545; 
}
button { 
  padding: 10px 20px; 
  background: #007bff; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  margin-top: 10px; 
}
button:focus { 
  outline: 3px solid #ffcc00; 
  outline-offset: 2px; 
}
.error { 
  color: #dc3545; 
  font-size: 14px; 
  margin-top: 5px; 
}
</style>
<script>
function validateForm(event) {
  event.preventDefault();
  const name = document.getElementById('pg-name');
  const email = document.getElementById('pg-email');
  const nameError = document.getElementById('pg-name-error');
  const emailError = document.getElementById('pg-email-error');
  
  nameError.textContent = '';
  emailError.textContent = '';
  
  if (!name.value.trim()) {
    nameError.textContent = 'Name is required';
    name.focus();
    return;
  }
  
  if (email.value && !email.value.includes('@')) {
    emailError.textContent = 'Please enter a valid email address';
    email.focus();
    return;
  }
  
  alert('Form submitted successfully!');
}
</script>`
};

function runPlayground(textareaId, iframeId) {
  const textarea = document.getElementById(textareaId);
  const iframe = document.getElementById(iframeId);
  const statusId = textareaId.replace('pg-code-', 'pg-status-');
  const statusElement = document.getElementById(statusId);
  
  if (!textarea || !iframe) return;
  
  try {
    const htmlContent = textarea.value;
    
    // Create a complete HTML document with basic styling
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playground Output</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      margin: 0; 
      padding: 20px; 
      background: #fff; 
      color: #333; 
      line-height: 1.6; 
    }
    * { 
      box-sizing: border-box; 
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;
    
    // Write content to iframe
    iframe.srcdoc = fullHtml;
    
    // Update status
    if (statusElement) {
      statusElement.textContent = 'Updated preview';
    }
    
    // Announce to screen readers
    announceToScreenReader('Playground updated');
    
  } catch (error) {
    console.error('Error running playground:', error);
    if (statusElement) {
      statusElement.textContent = 'Error: Invalid HTML';
    }
  }
}

function resetPlayground(textareaId, iframeId) {
  const textarea = document.getElementById(textareaId);
  const iframe = document.getElementById(iframeId);
  const statusId = textareaId.replace('pg-code-', 'pg-status-');
  const statusElement = document.getElementById(statusId);
  
  if (!textarea || !iframe) return;
  
  // Reset to original snippet
  if (playgroundSnippets[textareaId]) {
    textarea.value = playgroundSnippets[textareaId];
  }
  
  // Clear iframe
  iframe.srcdoc = '';
  
  // Update status
  if (statusElement) {
    statusElement.textContent = 'Reset to original';
  }
  
  // Announce to screen readers
  announceToScreenReader('Playground reset');
}

// Search Functionality
function initSearch() {
  const searchInput = document.getElementById('guide-search');
  const searchResultsAnnouncement = document.getElementById('search-results-announcement');
  
  if (!searchInput || !searchResultsAnnouncement) return;
  
  let searchTimeout;
  
  // Debounced search function
  function performSearch(searchTerm) {
    const sections = document.querySelectorAll('main section');
    const tocLinks = document.querySelectorAll('.toc-link');
    let visibleCount = 0;
    
    if (!searchTerm.trim()) {
      // Show all sections and TOC items
      sections.forEach(section => {
        section.classList.remove('hidden');
      });
      tocLinks.forEach(link => {
        link.closest('li').style.display = '';
      });
      announceSearchResults(sections.length, 'All sections visible');
      return;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    
    sections.forEach(section => {
      const heading = section.querySelector('h2');
      const content = section.textContent.toLowerCase();
      
      // Check if search term matches heading or content
      const matchesHeading = heading && heading.textContent.toLowerCase().includes(searchTermLower);
      const matchesContent = content.includes(searchTermLower);
      
      if (matchesHeading || matchesContent) {
        section.classList.remove('hidden');
        visibleCount++;
      } else {
        section.classList.add('hidden');
      }
    });
    
    // Filter TOC items based on visible sections
    tocLinks.forEach(link => {
      const sectionId = link.getAttribute('href').substring(1);
      const correspondingSection = document.getElementById(sectionId);
      
      if (correspondingSection && !correspondingSection.classList.contains('hidden')) {
        link.closest('li').style.display = '';
      } else {
        link.closest('li').style.display = 'none';
      }
    });
    
    // Announce results to screen readers
    const resultText = visibleCount === 1 ? '1 section found' : `${visibleCount} sections found`;
    announceSearchResults(visibleCount, resultText);
  }
  
  // Announce search results to screen readers
  function announceSearchResults(count, message) {
    if (searchResultsAnnouncement) {
      searchResultsAnnouncement.textContent = message;
    }
  }
  
  // Handle search input
  searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Debounce search by 200ms
    searchTimeout = setTimeout(() => {
      performSearch(searchTerm);
    }, 200);
  });
  
  // Handle search input focus
  searchInput.addEventListener('focus', () => {
    // Ensure search input is accessible
    searchInput.setAttribute('aria-describedby', 'search-results-announcement');
  });
  
  // Handle keyboard navigation
  searchInput.addEventListener('keydown', (event) => {
    // Allow Escape to clear search
    if (event.key === 'Escape') {
      searchInput.value = '';
      performSearch('');
      searchInput.blur();
    }
  });
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

// Font Size Controls
function initFontSizeControls() {
  const slider = document.getElementById('font-size-slider');
  const resetBtn = document.getElementById('font-size-reset');
  const status = document.getElementById('text-size-status');

  if (!slider || !resetBtn || !status) return;

  const storageKey = 'a11y-font-size';
  const applySize = (percent) => {
    const clamped = Math.min(130, Math.max(90, Number(percent) || 100));
    document.documentElement.style.setProperty('--base-font-size', clamped + '%');
    slider.setAttribute('aria-valuenow', String(clamped));
    slider.value = String(clamped);
    status.textContent = `Text size set to ${clamped}%`;
  };

  // Load saved preference
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    applySize(saved);
  } else {
    applySize(slider.value || 100);
  }

  // Update on input
  slider.addEventListener('input', (e) => {
    const val = (e.target || slider).value;
    applySize(val);
    localStorage.setItem(storageKey, String(val));
  });

  // Keyboard interaction is handled by native range, but keep ARIA and storage in sync on change
  slider.addEventListener('change', () => {
    localStorage.setItem(storageKey, String(slider.value));
  });

  // Reset button
  resetBtn.addEventListener('click', () => {
    applySize(100);
    localStorage.removeItem(storageKey);
  });
}

// Feedback Widget Functionality
function initFeedbackWidget() {
  const toggleBtn = document.getElementById('feedback-toggle');
  const panel = document.getElementById('feedback-panel');
  const closeBtn = document.getElementById('feedback-close');
  const form = document.getElementById('feedback-form');
  const messageTextarea = document.getElementById('fb-message');
  const statusDiv = document.getElementById('fb-status');
  
  if (!toggleBtn || !panel || !closeBtn || !form) return;
  
  let previouslyFocusedElement = null;
  let focusableElements = null;
  
  // Get all focusable elements within the panel
  function getFocusableElements() {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(panel.querySelectorAll(focusableSelectors))
      .filter(el => !el.disabled && el.offsetParent !== null);
  }
  
  // Trap focus within the panel
  function trapFocus(event) {
    if (!panel.classList.contains('hidden')) {
      focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  }
  
  // Open panel
  function openPanel() {
    panel.classList.remove('hidden');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', 'Close feedback panel');
    
    // Store previously focused element
    previouslyFocusedElement = document.activeElement;
    
    // Focus the panel title
    const title = document.getElementById('feedback-title');
    if (title) {
      title.setAttribute('tabindex', '-1');
      title.focus();
    }
    
    // Add focus trap listener
    panel.addEventListener('keydown', trapFocus);
  }
  
  // Close panel
  function closePanel() {
    panel.classList.add('hidden');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Open feedback panel');
    
    // Remove focus trap listener
    panel.removeEventListener('keydown', trapFocus);
    
    // Return focus to toggle button
    if (previouslyFocusedElement) {
      toggleBtn.focus();
      previouslyFocusedElement = null;
    }
  }
  
  // Handle escape key
  function handleEscape(event) {
    if (event.key === 'Escape' && !panel.classList.contains('hidden')) {
      closePanel();
    }
  }
  
  // Toggle panel
  toggleBtn.addEventListener('click', () => {
    if (panel.classList.contains('hidden')) {
      openPanel();
    } else {
      closePanel();
    }
  });
  
  // Close button
  closeBtn.addEventListener('click', closePanel);
  
  // Escape key handler
  document.addEventListener('keydown', handleEscape);
  
  // Form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Validate required textarea
    const messageValue = messageTextarea.value.trim();
    
    if (!messageValue) {
      // Show validation error
      messageTextarea.setAttribute('aria-invalid', 'true');
      messageTextarea.focus();
      statusDiv.textContent = 'Please enter a message.';
      statusDiv.classList.remove('sr-only');
      setTimeout(() => {
        statusDiv.classList.add('sr-only');
      }, 3000);
      return;
    }
    
    // Clear any previous errors
    messageTextarea.setAttribute('aria-invalid', 'false');
    
    // Show success message
    statusDiv.textContent = 'Thanks for your feedback!';
    statusDiv.classList.remove('sr-only');
    
    // Clear the form
    form.reset();
    messageTextarea.removeAttribute('aria-invalid');
    
    // Hide status message after a delay (but keep it accessible for screen readers)
    setTimeout(() => {
      statusDiv.textContent = '';
      statusDiv.classList.add('sr-only');
    }, 5000);
  });
}

// Accessibility Checker
function initAccessibilityChecker() {
  const codeTextarea = document.getElementById('ac-code');
  const runButton = document.getElementById('ac-run');
  const clearButton = document.getElementById('ac-clear');
  const resultsDiv = document.getElementById('ac-results');

  if (!codeTextarea || !runButton || !clearButton || !resultsDiv) {
    return;
  }

  // Clear button handler
  clearButton.addEventListener('click', () => {
    codeTextarea.value = '';
    resultsDiv.innerHTML = '';
    resultsDiv.setAttribute('aria-label', 'Analysis results');
    codeTextarea.focus();
  });

  // Analyze button handler
  runButton.addEventListener('click', () => {
    const htmlCode = codeTextarea.value.trim();
    
    if (!htmlCode) {
      resultsDiv.innerHTML = '<p class="ac-message ac-info">Please paste some HTML to analyze.</p>';
      resultsDiv.setAttribute('aria-label', 'Analysis results: Please paste some HTML to analyze.');
      return;
    }

    const issues = analyzeAccessibility(htmlCode);
    renderResults(issues, resultsDiv);
  });

  // Allow Enter+Ctrl/Cmd to analyze
  codeTextarea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runButton.click();
    }
  });
}

function analyzeAccessibility(htmlCode) {
  const issues = [];
  const parser = new DOMParser();
  
  // Parse HTML into a detached document
  const doc = parser.parseFromString(htmlCode, 'text/html');
  
  // Check 1: Missing or empty/useless img alt
  const images = doc.querySelectorAll('img');
  images.forEach((img) => {
    const alt = img.getAttribute('alt');
    if (alt === null) {
      issues.push({
        type: 'error',
        message: 'Image missing alt text.',
        element: img,
        tag: 'img'
      });
    } else if (alt === '' || /^(image|picture|photo|img)$/i.test(alt.trim())) {
      issues.push({
        type: 'warning',
        message: `Image has empty or generic alt text: "${alt}". Provide a descriptive alt text.`,
        element: img,
        tag: 'img'
      });
    }
  });

  // Check 2: Links without discernible text
  const links = doc.querySelectorAll('a');
  links.forEach((link) => {
    const text = link.textContent.trim();
    const ariaLabel = link.getAttribute('aria-label');
    const ariaLabelledBy = link.getAttribute('aria-labelledby');
    const title = link.getAttribute('title');
    const hasImageWithAlt = link.querySelector('img[alt]');
    
    if (!text && !ariaLabel && !ariaLabelledBy && !title && !hasImageWithAlt) {
      issues.push({
        type: 'error',
        message: 'Link without discernible text. Add text content, aria-label, aria-labelledby, or title.',
        element: link,
        tag: 'a'
      });
    }
  });

  // Check 3: Form controls without associated label
  const formControls = doc.querySelectorAll('input, textarea, select');
  formControls.forEach((control) => {
    const id = control.getAttribute('id');
    const ariaLabel = control.getAttribute('aria-label');
    const ariaLabelledBy = control.getAttribute('aria-labelledby');
    const type = control.getAttribute('type');
    
    // Skip hidden inputs
    if (type === 'hidden') {
      return;
    }
    
    let hasLabel = false;
    if (id) {
      const label = doc.querySelector(`label[for="${id}"]`);
      if (label) {
        hasLabel = true;
      }
    }
    
    // Check if label wraps the control
    const parentLabel = control.closest('label');
    if (parentLabel) {
      hasLabel = true;
    }
    
    if (!hasLabel && !ariaLabel && !ariaLabelledBy) {
      issues.push({
        type: 'error',
        message: 'Form control without associated label. Add a <label>, aria-label, or aria-labelledby.',
        element: control,
        tag: control.tagName.toLowerCase()
      });
    }
  });

  // Check 4: Buttons/links with role but no name
  const interactiveElements = doc.querySelectorAll('[role="button"], [role="link"]');
  interactiveElements.forEach((el) => {
    const text = el.textContent.trim();
    const ariaLabel = el.getAttribute('aria-label');
    const ariaLabelledBy = el.getAttribute('aria-labelledby');
    const title = el.getAttribute('title');
    
    if (!text && !ariaLabel && !ariaLabelledBy && !title) {
      issues.push({
        type: 'error',
        message: `Element with role="${el.getAttribute('role')}" has no accessible name. Add text, aria-label, aria-labelledby, or title.`,
        element: el,
        tag: el.tagName.toLowerCase()
      });
    }
  });

  // Check 5: Heading level skipping
  const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  if (headings.length > 0) {
    let previousLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      if (previousLevel > 0 && level > previousLevel + 1) {
        issues.push({
          type: 'warning',
          message: `Heading level skipped: previous was h${previousLevel}, found h${level}. Headings should not skip levels.`,
          element: heading,
          tag: heading.tagName.toLowerCase()
        });
      }
      previousLevel = level;
    });
  }

  // Check 6: Positive tabindex
  const positiveTabindex = doc.querySelectorAll('[tabindex]');
  positiveTabindex.forEach((el) => {
    const tabindex = parseInt(el.getAttribute('tabindex'));
    if (tabindex > 0) {
      issues.push({
        type: 'warning',
        message: `Element has positive tabindex="${tabindex}". Avoid positive tabindex values as they can disrupt natural tab order.`,
        element: el,
        tag: el.tagName.toLowerCase()
      });
    }
  });

  // Check 7: Inline style contrast note
  const styledElements = doc.querySelectorAll('[style*="color"], [style*="background-color"]');
  if (styledElements.length > 0) {
    issues.push({
      type: 'info',
      message: 'Elements with inline color/background-color styles detected. Use the Contrast Checker tool above to verify contrast ratios.',
      element: styledElements[0],
      tag: styledElements[0].tagName.toLowerCase()
    });
  }

  return issues;
}

function renderResults(issues, resultsDiv) {
  if (issues.length === 0) {
    resultsDiv.innerHTML = '<p class="ac-message ac-success">✓ No accessibility issues found!</p>';
    resultsDiv.setAttribute('aria-label', 'Analysis results: No accessibility issues found.');
    return;
  }

  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;
  const infoCount = issues.filter(i => i.type === 'info').length;

  let summary = '';
  if (errorCount > 0) {
    summary += `${errorCount} error${errorCount !== 1 ? 's' : ''}`;
  }
  if (warningCount > 0) {
    if (summary) summary += ', ';
    summary += `${warningCount} warning${warningCount !== 1 ? 's' : ''}`;
  }
  if (infoCount > 0) {
    if (summary) summary += ', ';
    summary += `${infoCount} note${infoCount !== 1 ? 's' : ''}`;
  }

  let html = `<div class="ac-summary" role="status" aria-live="polite">${summary} found.</div>`;
  html += '<ul class="ac-issues-list">';

  issues.forEach((issue, index) => {
    const badgeClass = `ac-badge ac-badge-${issue.type}`;
    const badgeText = issue.type === 'error' ? 'Error' : issue.type === 'warning' ? 'Warning' : 'Info';
    
    // Get element snippet (truncate if too long)
    let snippet = '';
    if (issue.element) {
      const outerHTML = issue.element.outerHTML || `<${issue.tag}>`;
      snippet = outerHTML.length > 100 
        ? outerHTML.substring(0, 100) + '...' 
        : outerHTML;
    } else {
      snippet = `<${issue.tag}>`;
    }

    html += `
      <li class="ac-issue-item" tabindex="0" id="ac-issue-${index}">
        <div class="ac-issue-header">
          <span class="${badgeClass}">${badgeText}</span>
        </div>
        <div class="ac-issue-message">${escapeHtml(issue.message)}</div>
        <div class="ac-issue-snippet">
          <code>${escapeHtml(snippet)}</code>
        </div>
      </li>
    `;
  });

  html += '</ul>';
  resultsDiv.innerHTML = html;
  resultsDiv.setAttribute('aria-label', `Analysis results: ${summary} found.`);
  
  // Focus first issue for keyboard users
  const firstIssue = resultsDiv.querySelector('.ac-issue-item');
  if (firstIssue) {
    setTimeout(() => firstIssue.focus(), 100);
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize accessibility checker when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccessibilityChecker);
} else {
  initAccessibilityChecker();
}