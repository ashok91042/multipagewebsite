# Northstar Studio Website

A responsive, multi-page static website for Northstar Studio, an independent design studio focused on making complex ideas clear and useful.

## 📌 About the Project

This project is a professional studio website built with HTML, CSS, and JavaScript. It presents Northstar Studio's approach, services, contact information, and a custom 404 page.

The project demonstrates how to create a polished static website without a backend, database, or framework.

## ✨ Features

- 🏠 Home page with studio introduction and service overview
- 👋 About page describing the studio and its working approach
- 🛠️ Services page covering strategy, brand identity, and digital design
- 📧 Contact page with email, phone, and working hours
- 🚫 Custom 404 page
- 📱 Responsive layout for desktop and mobile devices
- ♿ Accessible navigation, skip links, ARIA attributes, and visible focus states
- ☰ Mobile navigation menu powered by JavaScript
- 🔗 Working relative navigation links
- 🧭 Active page navigation indicators
- 📅 Automatically updated footer year
- 🔍 SEO titles and descriptions on every page
- 🌐 Open Graph metadata for social sharing
- 🎨 Custom SVG favicon
- 🌓 Reduced-motion support for users who prefer less animation

## 🛠️ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- Google Fonts:
  - DM Sans
  - Space Grotesk
- Python HTTP server for local development

No frameworks, libraries, backend, or database are used.

## 📚 Concepts Used

- Semantic HTML elements
- Responsive web design
- CSS custom properties
- CSS Grid and Flexbox
- Media queries
- Accessible navigation
- Skip links
- Keyboard-friendly controls
- ARIA attributes
- DOM selection and event handling
- JavaScript attribute manipulation
- SEO metadata
- Open Graph metadata
- Relative file paths
- Reduced-motion accessibility preferences

## 📂 Project Structure

```text
web/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services page
├── contact.html        # Contact page
├── 404.html            # Custom not-found page
├── README.md           # Project documentation
├── styles.css          # Shared styles for every page
├── script.js           # Mobile menu and dynamic footer year
└── assets/
    └── favicon.svg     # Website favicon
```

## 🚀 How to Run

### Option 1: Open Directly

Open `index.html` in a web browser.

### Option 2: Run a Local Server

1. Open a terminal in the project folder.
2. Start Python's built-in HTTP server:

```bash
python -m http.server 4173
```

3. Open the website at:

```text
http://localhost:4173/index.html
```

Python is only needed for the local development server. No package installation is required.

## 💻 Usage

- Use the navigation menu to move between the Home, About, Services, and Contact pages.
- On smaller screens, use the **Menu** button to open and close the navigation.
- Use the contact page's email or phone links to start a conversation.
- The custom 404 page provides a link back to the home page.
- The footer year updates automatically using JavaScript.

## 🌐 Live Demo

https://your-live-demo-link.com

## 📸 Screenshots

Screenshots can be added here.

```text
screenshots/
├── home.png
├── about.png
├── services.png
└── contact.png
```

## 🔮 Future Improvements

- Add real project case studies or portfolio content
- Replace placeholder contact details with official studio information
- Add a contact form connected to a suitable form service
- Add a real social sharing image for Open Graph previews
- Configure server-level routing for automatic 404 handling
- Add automated HTML and accessibility testing
- Deploy the website to a static hosting provider

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-change
```

3. Make your changes.
4. Test the pages locally.
5. Commit your changes:

```bash
git commit -m "Add your change"
```

6. Push the branch and open a pull request.

## 📄 License

No license has been added yet. A suitable open-source license can be added later.

## 👨‍💻 Author

ashok91042

## ⭐ Support

If you find this project useful, please consider starring the repository.

