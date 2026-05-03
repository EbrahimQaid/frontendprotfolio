# ✈️ ProFly — Professional Portfolio Platform

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, responsive portfolio showcase platform built with pure HTML, CSS, and JavaScript.**

[🔗 Live Demo](https://ebrahimqaid.github.io/ProFly/) 

</div>

---

## 📋 About

**ProFly** is a professional platform designed to showcase skills and profiles. Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies. Features a modern glassmorphism design, fully responsive layout, dark mode support, and a complete dashboard for managing profiles.

## ✨ Features

- 🎨 **Modern UI/UX** — Glassmorphism design with smooth animations and micro-interactions
- 🌙 **Dark Mode** — Full dark/light theme toggle with system preference detection
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🖼️ **Image Slider** — Auto-playing hero slider with navigation dots
- 👥 **Profile Cards** — Dynamic profile cards with social links
- 🔐 **Authentication** — Login system with session management
- 📊 **Dashboard** — Complete admin panel to add, edit, and delete profiles
- 🎨 **Theme Customization** — Customizable brand colors from settings
- 📨 **Contact Form** — Form with validation and toast notifications
- 💾 **LocalStorage** — Data persistence using browser storage

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic structure & SEO |
| **CSS3** | Design system with CSS variables, animations, glassmorphism |
| **JavaScript** | DOM manipulation, routing, state management |
| **Font Awesome** | Icon library |
| **Google Fonts** | Outfit font family |

## 📁 Project Structure

```
frontendprotfolio/
├── index.html              # Landing page (Home)
├── README.md               # Project documentation
├── LICENSE                  # MIT License
├── .gitignore              # Git ignore rules
│
├── css/
│   ├── style.css           # Main design system & global styles
│   └── dashboard.css       # Dashboard-specific styles
│
├── html/
│   ├── about.html          # About page
│   ├── contact.html        # Contact form page
│   ├── dashboard.html      # Admin dashboard
│   ├── gallery.html        # Profile gallery
│   ├── login.html          # Authentication page
│   └── question.html       # FAQ / Question page
│
├── js/
│   ├── app.js              # Core app logic (theme, auth, mobile menu)
│   ├── components.js       # Shared header & footer components
│   ├── contact.js          # Contact form validation
│   ├── dashboard.js        # Dashboard CRUD operations
│   └── main.js             # Gallery card rendering & modal
│
└── image/                  # Static assets (avatars, logos, icons)
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local server (optional, for best experience)

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/EbrahimQaid/frontendprotfolio.git
   ```

2. **Navigate to the project**
   ```bash
   cd frontendprotfolio
   ```

3. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     npx serve .
     ```

### Demo Credentials
| Email | Password |
|-------|----------|
| `admin@profly.com` | `12345` |

## 📸 Pages Overview

| Page | Description |
|------|-------------|
| **Home** | Hero section, image slider, top talent cards, CTA |
| **Gallery** | Dynamic profile cards from localStorage |
| **About** | Platform information |
| **Contact** | Contact form with validation |
| **Login** | Authentication portal |
| **Dashboard** | Profile management (CRUD), settings |
| **FAQ** | Question submission form |

## 🎨 Design System

The project uses a comprehensive CSS design system with:
- **CSS Custom Properties** for consistent theming
- **Responsive breakpoints** at 480px, 768px, and 992px
- **Smooth transitions** using cubic-bezier easing
- **Glassmorphism** effects with backdrop blur
- **Shadow system** (sm, md, lg) for depth hierarchy

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ebrahim Qaid**

- GitHub: [@EbrahimQaid](https://github.com/EbrahimQaid)

---

<div align="center">

⭐ **Star this repo if you found it useful!** ⭐

</div>
