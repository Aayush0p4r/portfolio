# Portfolio Website

A modern, engineering-focused portfolio website built with pure HTML, CSS, and JavaScript. Features time-based theming, accessibility-first design, and performance optimization.

## 🚀 Features

### Core Functionality
- **Time-based Theming**: Automatic theme phases based on local time (Morning, Afternoon, Evening, Night)
- **Theme Toggle**: Manual override with Auto → Light → Dark cycling
- **Responsive Design**: Mobile-first approach with seamless adaptation across devices
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **Performance**: Optimized for fast loading and smooth interactions

### Design System
- **Minimal Base**: Clean, engineering-focused design with purposeful styling
- **Accent Styles**: Soft glassmorphism, neobrutalism, and cyber accents used sparingly
- **Phase-based Colors**: Dynamic color schemes that change based on time of day
- **Typography**: System fonts with micro-typography adjustments per phase

### Pages
- **Home**: Hero section with gradient borders and highlight cards
- **Projects**: Filterable grid with search functionality and tech tags
- **About**: Professional timeline, skills matrix, and certifications
- **Contact**: Accessible form with validation and fallback options
- **404**: Friendly error page with navigation aids

## 🎨 Design Tokens

### Color Phases
```css
/* Morning (05:00-10:00) */
--accent-1: #14b8a6; /* Teal */
--accent-2: #22d3ee; /* Cyan */

/* Afternoon (10:00-16:00) */
--accent-1: #06b6d4; /* Electric Cyan */
--accent-2: #3b82f6; /* Neon Blue */

/* Evening (16:00-19:00) */
--accent-1: #6366f1; /* Indigo */
--accent-2: #a78bfa; /* Violet */

/* Night (19:00-05:00) */
--accent-1: #00e5ff; /* Cyber Cyan */
--accent-2: #2979ff; /* Electric Blue */
```

### Theme Colors
```css
/* Light Theme */
--bg: #fafafa;
--surface: #ffffff;
--text: #18181b;

/* Dark Theme */
--bg: #09090b;
--surface: #18181b;
--text: #f4f4f5;
```

## 🛠 Technical Implementation

### Theme System
- Pre-paint script prevents theme flash
- Automatic phase transitions at exact time boundaries
- LocalStorage persistence across page loads
- System preference detection and integration

### Accessibility Features
- Semantic HTML structure
- Proper ARIA labels and roles
- Visible focus indicators
- Reduced motion support
- AA contrast compliance

### Performance Optimizations
- Minimal CSS with efficient selectors
- Optimized JavaScript with event delegation
- Lazy loading considerations
- Efficient DOM manipulation

## 📁 File Structure

```
portfolio-website/
├── index.html          # Homepage with hero and featured work
├── projects.html       # Project grid with filtering
├── about.html          # Professional background and skills
├── contact.html        # Contact form and information
├── 404.html           # Error page with navigation aids
├── styles.css         # Complete design system and components
├── theme.js           # Time-based theming and interactions
└── assets/            # Placeholder for images and icons
```

## 🚀 Getting Started

1. **Clone or download** the repository
2. **Open `index.html`** in a web browser
3. **Test the theme toggle** in the header
4. **Navigate between pages** to see consistent theming
5. **Try different times** by temporarily modifying the phase logic

### Development
- No build tools required - pure HTML/CSS/JS
- Use a local server for development (e.g., `python -m http.server` or Live Server extension)
- Test across different screen sizes and devices
- Verify accessibility with screen readers

## ✨ Customization

### Adding Custom Fonts
```css
:root {
  --font-sans: 'Your Font', system-ui, sans-serif;
  --font-mono: 'Your Mono Font', 'SF Mono', monospace;
}
```

### Extending Color Phases
Add new phase definitions in both CSS and JavaScript:
```css
[data-phase="custom"] {
  --accent-1: #color1;
  --accent-2: #color2;
  --accent-solid: #solid-color;
  --accent-glow: 15%;
}
```

### Adding Components
Follow the established patterns in `styles.css`:
```css
.new-component {
  /* Base styles */
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  
  /* Interactive states */
  transition: all var(--transition);
}

.new-component:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

## 🧪 Testing Checklist

### Theme System
- [ ] Themes persist across page reloads
- [ ] Toggle cycles through Auto → Light → Dark
- [ ] Phase transitions work at boundaries (05:00, 10:00, 16:00, 19:00)
- [ ] System theme changes are detected in auto mode

### Accessibility
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Screen reader navigation works properly
- [ ] Color contrast meets AA standards
- [ ] Reduced motion preferences are respected

### Responsive Design
- [ ] Layout adapts smoothly across screen sizes
- [ ] Touch targets are appropriately sized
- [ ] Text remains readable at all sizes
- [ ] Navigation works on mobile devices

### Performance
- [ ] Pages load quickly without theme flash
- [ ] Animations are smooth and performant
- [ ] No console errors or warnings
- [ ] Works without JavaScript (graceful degradation)

## 🎯 Browser Support

- **Modern Browsers**: Full support for all features
- **Legacy Browsers**: Graceful degradation with fallbacks
- **CSS Features**: Uses feature detection for backdrop-filter, color-mix
- **JavaScript**: ES6+ with fallbacks for older environments

## 📝 Notes

### Design Decisions
- **No Frameworks**: Pure technologies for maximum control and performance
- **Minimal Dependencies**: Self-contained with no external libraries
- **Engineering Focus**: Clean, purposeful design that showcases technical skills
- **Time-based Theming**: Unique feature that demonstrates advanced CSS/JS integration

### Extensibility
The codebase is designed for easy extension:
- Modular CSS with clear component boundaries
- Documented JavaScript functions
- Consistent naming conventions
- Comprehensive commenting

---

Built with ❤️ and modern web technologies. No frameworks, no bloat, just clean engineering.