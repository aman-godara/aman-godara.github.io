// Navbar module - imports CSS and handles hamburger menu functionality
import './navbar.css';

// Initialize navbar functionality
export function initNavbar() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.page-link-container');

  // Set active link based on current page (skip for wip page)
  const currentPath = window.location.pathname;
  const isWipPage = currentPath.includes('/wip/');
  
  if (!isWipPage) {
    const navLinks = document.querySelectorAll('.page-header a');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      // Normalize paths (remove trailing slashes and /index.html)
      const normalizedCurrent = currentPath.replace(/\/$/, '').replace(/\/index\.html$/, '') || '/';
      const normalizedLink = linkPath.replace(/\/$/, '').replace(/\/index\.html$/, '') || '/';
      
      // Match only exact paths
      if (normalizedCurrent === normalizedLink) {
        link.classList.add('active');
      }
    });
  }

  if (menuToggle && navMenu) {
    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const mobileNavLinks = navMenu.querySelectorAll('.page-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      const isClickInside = menuToggle.contains(event.target) || navMenu.contains(event.target);
      
      if (!isClickInside && navMenu.classList.contains('active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      }
    });
  }
}

// Auto-initialize on DOM load
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }
}

