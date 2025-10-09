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
  tocNav.setAttribute('aria-label', 'Table of contents');
  tocNav.className = 'toc-nav';
  
  // Add heading for the TOC
  const tocHeading = document.createElement('h3');
  tocHeading.textContent = 'Table of Contents';
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
  feedback.textContent = 'Copied!';
  feedback.classList.add('show');
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    feedback.classList.remove('show');
  }, 3000);
  
  // Announce to screen readers
  announceToScreenReader('Code copied to clipboard');
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
  announceToScreenReader('Failed to copy code');
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

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  generateTableOfContents();
  setupTocIntersectionObserver();
  initBackToTopButton();
  initSmoothScrolling();
  initContrastChecker();
  initHashHandling();
  initSearch();
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