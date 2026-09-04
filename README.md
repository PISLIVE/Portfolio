# 👨‍💻 Prince — Frontend Developer Portfolio

> A stunning, premium personal portfolio website built with pure **HTML**, **CSS**, and **JavaScript** — zero dependencies, zero frameworks.

[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-fbbf24?style=flat-square)](https://github.com/prince)
[![License](https://img.shields.io/badge/License-MIT-gold?style=flat-square)](LICENSE)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Premium Dark Theme** | Deep dark background with gold/amber accent palette |
| ⚡ **Interactive Particles** | Canvas-based particle system with mouse repulsion |
| 🖱️ **Custom Cursor** | Smooth animated cursor with hover/click states |
| 🌀 **3D Tilt Cards** | Mouse-tracked 3D perspective on project & glass cards |
| ✍️ **Typewriter Effect** | Cycling role titles in the hero section |
| 🔢 **Counter Animations** | Animated number counters triggered on scroll |
| 🛤️ **Scroll Animations** | IntersectionObserver-based section reveal animations |
| 📊 **Skill Bars** | Animated progress bars that trigger on viewport entry |
| 🔀 **Projects Filter** | Smooth filter by category with animated transitions |
| 💬 **Testimonials Slider** | Auto-playing slider with swipe & keyboard support |
| 📬 **Contact Form** | Client-side validated form with success feedback |
| 📱 **Fully Responsive** | Mobile-first responsive design |
| ♿ **Accessible** | ARIA labels, semantic HTML, keyboard navigation |
| 🚀 **SEO Ready** | Meta tags, OG tags, semantic structure |

---

## 📁 Project Structure

```
Prince Portfolio/
├── index.html              # Main HTML entry point
├── assets/
│   ├── images/
│   │   ├── hero_bg.png     # Hero background image
│   │   └── avatar.png      # Profile avatar
│   └── Prince_Resume.pdf   # Downloadable resume
├── css/
│   ├── variables.css       # CSS design tokens
│   ├── reset.css           # CSS reset
│   ├── base.css            # Base styles & utilities
│   ├── navbar.css          # Navigation bar
│   ├── hero.css            # Hero section
│   ├── about.css           # About section
│   ├── skills.css          # Skills & tech orbit
│   ├── experience.css      # Timeline / Work history
│   ├── projects.css        # Projects grid & filter
│   ├── education.css       # Education & certifications
│   ├── testimonials.css    # Testimonials slider
│   ├── blog.css            # Blog articles
│   ├── contact.css         # Contact form
│   ├── footer.css          # Footer & back-to-top
│   ├── animations.css      # Scroll animations
│   ├── cursor.css          # Custom cursor
│   └── loader.css          # Page loader
└── js/
    ├── particles.js        # Canvas particle system
    ├── cursor.js           # Custom cursor logic
    ├── loader.js           # Page loader
    ├── navbar.js           # Navbar scroll & hamburger
    ├── typewriter.js       # Typewriter text effect
    ├── counter.js          # Animated number counters
    ├── tilt.js             # 3D tilt on cards
    ├── scroll-animations.js # IntersectionObserver anims
    ├── projects-filter.js  # Projects category filter
    ├── testimonials.js     # Testimonials slider
    ├── contact-form.js     # Form validation
    ├── back-to-top.js      # Back to top button
    └── main.js             # Orchestrator & misc effects
```

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/prince/portfolio.git
   cd portfolio
   ```

2. **Open in browser**
   ```bash
   # Option 1: Just open index.html directly
   open index.html

   # Option 2: Use a local server (recommended)
   npx serve .
   # or
   python -m http.server 8000
   ```

3. **Customize** — Update your info in `index.html`:
   - Replace name, bio, email, social links
   - Add your real project links
   - Update tech skills and percentages
   - Swap `assets/images/avatar.png` with your photo
   - Add `assets/Prince_Resume.pdf`

---

## 🌐 Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to `main` branch, `/ (root)`
4. Your portfolio will be live at `https://yourusername.github.io/portfolio`

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure, accessibility
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No dependencies, pure ES6+
- **Canvas API** — Particle system
- **IntersectionObserver** — Scroll animations
- **Google Fonts** — Outfit + JetBrains Mono

---

## 📄 License

MIT © 2025 Prince

---

*Built with ❤️ from India*
