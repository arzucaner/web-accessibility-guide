function showSection(sectionId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.remove("hidden");
    } else {
      section.classList.add("hidden");
    }
  });
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
