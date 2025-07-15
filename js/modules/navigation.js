/**
 * navigation.js
 * Module for handling navigation functionality
 */

/**
 * Initialize navigation components
 */
export function initNavigation() {
    // Initialize dropdown menus
    initDropdown();
    
    // Highlight current page in navigation
    highlightCurrentPage();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
}

/**
 * Initialize dropdown menus
 */
function initDropdown() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        const menu = toggle.querySelector('.dropdown-menu');
        
        // Add click handler
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            
            // Add or remove the show class
            if (menu) {
                if (expanded) {
                    menu.classList.remove('show');
                } else {
                    menu.classList.add('show');
                }
            }
        });
        
        // Add hover functionality
        toggle.addEventListener('mouseenter', () => {
            toggle.setAttribute('aria-expanded', 'true');
            if (menu) {
                menu.classList.add('show');
            }
        });
        
        // Close when mouse leaves the dropdown area
        const parentLi = toggle.closest('li');
        if (parentLi) {
            parentLi.addEventListener('mouseleave', () => {
                toggle.setAttribute('aria-expanded', 'false');
                if (menu) {
                    menu.classList.remove('show');
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', event => {
        if (!event.target.closest('.dropdown-toggle')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
                const parent = menu.closest('.dropdown-toggle');
                if (parent) {
                    parent.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
}

/**
 * Toggle mobile menu
 */
export function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!menuToggle || !mobileMenu) return;
    
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    if (isExpanded) {
        mobileMenu.classList.remove('show');
    } else {
        mobileMenu.classList.add('show');
    }
    
    // Toggle hamburger icon
    const iconBars = menuToggle.querySelectorAll('.icon-bar');
    if (iconBars.length >= 3) {
        if (isExpanded) {
            iconBars[0].style.transform = '';
            iconBars[1].style.opacity = '';
            iconBars[2].style.transform = '';
        } else {
            iconBars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            iconBars[1].style.opacity = '0';
            iconBars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        }
    }
}

/**
 * Highlight current page in navigation
 */
function highlightCurrentPage() {
    // Get current page path
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    // If on index page or empty path
    if (currentPage === '' || currentPage === 'index.html') {
        const homeLink = document.querySelector('nav a[href="index.html"]');
        if (homeLink) {
            homeLink.setAttribute('aria-current', 'page');
        }
        return;
    }
    
    // Find and highlight current page link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Add smooth scrolling for anchor links
 */
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            // Ignore dropdown toggles
            if (this.parentElement.classList.contains('dropdown-toggle')) {
                return;
            }
            
            // Ignore if not a valid selector
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            event.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for header height
                behavior: 'smooth'
            });
            
            // Update URL but don't scroll
            history.pushState(null, null, targetId);
        });
    });
}
