# Contributing to Web Accessibility Guide

Welcome! 🎉 We're thrilled you're interested in contributing to the Web Accessibility Guide. This project aims to make web accessibility knowledge accessible to everyone, and your contributions help us achieve that goal.

## First Time Contributing? You're Welcome Here!

Whether you're a seasoned developer or just starting your journey with web accessibility, we value your input. This guide will walk you through everything you need to know to contribute effectively.

## How to Contribute

### 1. Fork the Repository
- Click the "Fork" button in the top-right corner of this repository
- This creates your own copy of the project

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/web-accessibility-guide.git
cd web-accessibility-guide
```

### 3. Create a Branch
Always create a new branch for your changes:
```bash
git checkout -b feature/your-feature-name
```

**Branch Naming Examples:**
- `feature/add-keyboard-navigation-example`
- `fix/contrast-checker-calculation`
- `docs/improve-readme-instructions`
- `chore/update-dependencies`

### 4. Make Your Changes
- Edit the files you need to modify
- Test your changes locally (see testing section below)
- Follow our coding style guidelines

### 5. Commit Your Changes
Use clear, descriptive commit messages following this convention:

**Commit Message Format:**
```
type(scope): brief description

Optional longer description explaining what and why.
```

**Types:**
- `feat`: New features or examples
- `fix`: Bug fixes
- `chore`: Maintenance tasks, dependency updates
- `docs`: Documentation changes

**Examples:**
```
feat(examples): add accessible modal dialog example
fix(contrast): correct WCAG AAA calculation threshold
docs(readme): update installation instructions
chore(deps): update accessibility testing tools
```

### 6. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub with:
- Clear title describing your changes
- Detailed description of what you've done
- Reference any related issues

## Coding Style Guidelines

### HTML
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, etc.)
- Always include proper ARIA attributes where needed
- Ensure proper heading hierarchy (h1 → h2 → h3)
- Use descriptive alt text for images

### CSS
- Use consistent indentation (2 spaces)
- Group related properties together
- Use CSS custom properties (variables) for colors and sizes
- Include focus-visible styles for interactive elements
- Support dark mode and high contrast themes

### JavaScript
- Use modern ES6+ features
- Write descriptive function and variable names
- Include error handling where appropriate
- Add comments for complex logic
- Ensure keyboard accessibility for interactive elements

### General
- Keep lines under 100 characters when possible
- Use consistent spacing and formatting
- Test your changes across different browsers
- Ensure your changes are accessible

## Testing Your Changes Locally

Use **[docs/testing.md](docs/testing.md)** as the source of truth for QA before opening a PR.

Minimum expectation for this repo:

1. Keyboard-only pass (Tab/Shift+Tab/Enter/Space/Escape)
2. Screen reader sanity check (NVDA or VoiceOver at minimum)
3. Zoom/reflow check at 200%
4. Automated checks where possible (`pa11y-ci` + link check)

Quick local start:

```bash
npx http-server -p 8080 -c-1 .
```

Then open `http://127.0.0.1:8080/index.html` and run the checklist in `docs/testing.md`.

## Translations

Translations are community-driven. You can start small—just the UI and section headings.

### How to translate

1. **Pick a language file** under `/lang` (e.g., `es.json`, `fr.json`). To add a new language, create a new file like `lang/xx.json` where `xx` is the [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
2. **Use `en.json` as a base.** Copy `lang/en.json`, rename it to your language code, and translate the string values only.
3. **Keep keys unchanged.** Translate only the text; do not rename or remove keys. The app uses these keys to find each string.
4. **Test locally.** Switch the language in the site’s language switcher and click through all sections to ensure nothing is broken or missing.
5. **Open a PR** with your new or updated language file.

### Translation guidelines

- **Use plain language.** Prefer short, clear phrases so the guide stays easy to understand.
- **Avoid changing meaning.** Stay close to the original intent; do not add opinions or change technical meaning.
- **Keep accessibility terms consistent.** Use the same translation for terms like “screen reader,” “focus,” “aria-label,” etc., across the file. If your language has a standard (e.g. from W3C or local accessibility bodies), follow that when possible.
- **Missing keys fall back to English.** If a key is absent in your language file, the site shows the English text. When you see English in a translated locale, add that key to your language file to complete the translation. There is no need to change the i18n code—just add the missing key and translation.

### Adding a new language to the switcher

After your language file is merged:

1. In `index.html`, find the `<select id="language-switcher">` and add an `<option>`:
   ```html
   <option value="xx" lang="xx">Your Language (XX)</option>
   ```
2. Replace `xx` with the ISO 639-1 code and set `lang="xx"` for the option.
3. Submit a follow-up PR or ask a maintainer to add the option when your language file is merged.

## Good First Issues

Looking for ideas? Check out our [Good First Issues](https://github.com/arzucaner/web-accessibility-guide/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) for beginner-friendly tasks!

Here are some great ways to contribute:

### 🆕 New Examples
- Add a new accessibility pattern (e.g., accessible tabs, accordions)
- Create examples for specific disabilities or assistive technologies
- Add real-world case studies

### 🌍 Translations
- Translate the guide to other languages
- Improve existing translations
- Add language-specific accessibility considerations

### 📚 Documentation
- Improve existing explanations
- Add more detailed code comments
- Create video tutorials or GIFs
- Write blog posts about accessibility topics

### 🐛 Bug Fixes
- Fix contrast calculation issues
- Improve keyboard navigation
- Fix screen reader compatibility
- Resolve mobile responsiveness issues

### ✨ Enhancements
- Add new interactive examples
- Improve the search functionality
- Add more theme options
- Create printable versions

### 🧪 Testing
- Test with different screen readers
- Verify keyboard-only navigation
- Test with high contrast mode
- Check mobile accessibility

## Getting Help

Don't hesitate to ask for help! We're here to support you:

### 💬 GitHub Discussions
- Use GitHub Discussions for questions, ideas, and general conversation
- Great for asking "how to" questions or discussing potential contributions

### 🐛 GitHub Issues
- Report bugs or request new features
- Use the issue templates when available
- Include steps to reproduce bugs

### 📧 Contact
- Open an issue with the "question" label
- Tag maintainers in discussions: @arzucaner

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for everyone. Please:

- Be respectful and kind
- Use inclusive language
- Welcome newcomers
- Focus on constructive feedback
- Respect different perspectives and experiences

## Recognition

Contributors will be:
- Listed in the project's README
- Mentioned in release notes for significant contributions
- Credited in any presentations or articles about the project

## Thank You!

Your contributions make web accessibility more accessible to developers worldwide. Every pull request, issue report, and discussion helps improve this resource for the community.

Ready to get started? Pick an issue, create a branch, and let's make the web more accessible together! 🚀

---

*Questions? Feel free to open an issue or start a discussion. We're excited to see what you'll contribute!*
