/**
 * Theme Management & Time-based Theming
 * 
 * This script handles:
 * - Time-based theme phases (morning, afternoon, evening, night)
 * - Theme mode cycling (auto, light, dark)
 * - localStorage persistence
 * - System theme preference detection
 * - Phase boundary scheduling
 */

(function() {
  'use strict';

  // Theme configuration
  const THEME_KEY = 'portfolio-theme-mode';
  const THEME_MODES = ['auto', 'light', 'dark'];
  
  // Phase time boundaries (24-hour format)
  const PHASE_BOUNDARIES = {
    morning: { start: 5, end: 10 },
    afternoon: { start: 10, end: 16 },
    evening: { start: 16, end: 19 },
    night: { start: 19, end: 5 } // wraps around midnight
  };

  let currentTimeout = null;
  let mediaQuery = null;

  /**
   * Get current phase based on local time
   */
  function getCurrentPhase() {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 16) return 'afternoon';
    if (hour >= 16 && hour < 19) return 'evening';
    return 'night'; // 19-5 (wraps around)
  }

  /**
   * Get stored theme mode or default to 'auto'
   */
  function getStoredThemeMode() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      return THEME_MODES.includes(stored) ? stored : 'auto';
    } catch (e) {
      return 'auto';
    }
  }

  /**
   * Store theme mode in localStorage
   */
  function storeThemeMode(mode) {
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch (e) {
      // localStorage not available, continue without persistence
    }
  }

  /**
   * Get system theme preference
   */
  function getSystemTheme() {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  /**
   * Determine effective theme based on mode and system preference
   */
  function getEffectiveTheme(mode) {
    if (mode === 'auto') {
      return getSystemTheme();
    }
    return mode;
  }

  /**
   * Apply theme and phase to HTML element
   */
  function applyTheme(mode, phase) {
    const html = document.documentElement;
    const effectiveTheme = getEffectiveTheme(mode);
    
    html.setAttribute('data-mode', mode);
    html.setAttribute('data-theme', effectiveTheme);
    html.setAttribute('data-phase', phase);
  }

  /**
   * Update theme toggle label
   */
  function updateThemeLabel(mode, phase) {
    const label = document.getElementById('theme-label');
    if (!label) return;

    let labelText;
    switch (mode) {
      case 'auto':
        labelText = `Auto • ${phase}`;
        break;
      case 'light':
        labelText = 'Light';
        break;
      case 'dark':
        labelText = 'Dark';
        break;
      default:
        labelText = 'Auto';
    }
    
    label.textContent = labelText;
  }

  /**
   * Calculate milliseconds until next phase boundary
   */
  function getTimeUntilNextPhase() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    
    // Phase boundaries in hours
    const boundaries = [5, 10, 16, 19];
    
    // Find next boundary
    let nextBoundary = boundaries.find(hour => hour > currentHour);
    
    // If no boundary found today, use first boundary tomorrow
    if (!nextBoundary) {
      nextBoundary = boundaries[0] + 24; // Next day
    }
    
    // Calculate time difference
    const targetTime = new Date();
    targetTime.setHours(nextBoundary % 24, 0, 0, 0);
    
    // If boundary is tomorrow, add a day
    if (nextBoundary >= 24) {
      targetTime.setDate(targetTime.getDate() + 1);
    }
    
    const diff = targetTime.getTime() - now.getTime();
    return Math.max(diff, 1000); // Minimum 1 second
  }

  /**
   * Schedule next phase update
   */
  function schedulePhaseUpdate() {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    
    const timeUntilNext = getTimeUntilNextPhase();
    
    currentTimeout = setTimeout(() => {
      updateTheme();
      schedulePhaseUpdate(); // Reschedule for next boundary
    }, timeUntilNext);
  }

  /**
   * Handle theme toggle click
   */
  function handleThemeToggle() {
    const currentMode = getStoredThemeMode();
    const currentIndex = THEME_MODES.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % THEME_MODES.length;
    const nextMode = THEME_MODES[nextIndex];
    
    storeThemeMode(nextMode);
    updateTheme();
  }

  /**
   * Handle system theme changes (when in auto mode)
   */
  function handleSystemThemeChange() {
    const currentMode = getStoredThemeMode();
    if (currentMode === 'auto') {
      updateTheme();
    }
  }

  /**
   * Main theme update function
   */
  function updateTheme() {
    const mode = getStoredThemeMode();
    const phase = getCurrentPhase();
    
    applyTheme(mode, phase);
    updateThemeLabel(mode, phase);
  }

  /**
   * Set navigation active state based on current page
   */
  function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      // Remove any existing aria-current
      link.removeAttribute('aria-current');
      
      // Check if this is the current page
      if (currentPath === linkPath || 
          (currentPath === '/' && linkPath.endsWith('/index.html')) ||
          (currentPath.endsWith('/index.html') && linkPath === '/') ||
          (currentPath.includes(linkPath) && linkPath !== '/')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Initialize theme system
   */
  function initializeTheme() {
    // Apply initial theme immediately (before CSS loads)
    updateTheme();
    
    // Set up theme toggle event listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', handleThemeToggle);
    }
    
    // Set up system theme change listener
    try {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
      } else if (mediaQuery.addListener) {
        // Fallback for older browsers
        mediaQuery.addListener(handleSystemThemeChange);
      }
    } catch (e) {
      // matchMedia not supported
    }
    
    // Schedule phase updates
    schedulePhaseUpdate();
    
    // Set active navigation
    setActiveNavigation();
  }

  /**
   * Pre-paint theme application (inline script version)
   * This function is also available for use in inline <script> tags
   */
  function prePaintTheme() {
    const getPhase = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 10) return 'morning';
      if (hour >= 10 && hour < 16) return 'afternoon';
      if (hour >= 16 && hour < 19) return 'evening';
      return 'night';
    };
    
    const getMode = () => {
      try {
        const stored = localStorage.getItem('portfolio-theme-mode');
        return ['auto', 'light', 'dark'].includes(stored) ? stored : 'auto';
      } catch (e) {
        return 'auto';
      }
    };
    
    const getTheme = (mode) => {
      if (mode === 'auto') {
        try {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } catch (e) {
          return 'light';
        }
      }
      return mode;
    };
    
    const mode = getMode();
    const phase = getPhase();
    const theme = getTheme(mode);
    
    document.documentElement.setAttribute('data-mode', mode);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-phase', phase);
  }

  // Export for inline script usage
  window.prePaintTheme = prePaintTheme;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
  } else {
    initializeTheme();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    if (mediaQuery && mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  });

})();