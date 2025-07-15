/**
 * main.js
 * Main JavaScript file for Ashley Hillstead's portfolio
 */

// Import necessary modules
import { fetchProjects, displayProjects, initProjectsFromUrl, loadProjectDetails, applyProjectFilter, navigateProjects } from './modules/projectsData.js';
import { validateForm, setupFormListeners } from './modules/formHandler.js';
import { initNavigation, toggleMobileMenu } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { getUrlParameter, getAllUrlParameters } from './modules/urlParams.js';
import { getPreferences, savePreferences, trackViewedProject, getViewedProjects, clearAllStorage } from './modules/storage.js';

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Initialize the application
 */
function initializeApp() {
    // Initialize navigation components
    initNavigation();
    
    // Setup mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Initialize animations
    initAnimations();
    
    // Initialize page-specific functionality
    initPageSpecificFunctions();
    
    // Setup filter listeners
    setupFilterListeners();
}

/**
 * Initialize functionality specific to current page
 */
function initPageSpecificFunctions() {
    // Get the current page ID from body
    const pageId = document.body.id || '';
    
    switch (pageId) {
        case 'home':
            loadHomePage();
            break;
        case 'projects':
            loadProjectsPage();
            break;
        case 'project-details':
            loadProjectDetailsPage();
            break;
        case 'project-gallery':
            loadGalleryPage();
            break;
        case 'contact':
            loadContactPage();
            break;
        case 'settings':
            loadSettingsPage();
            break;
        case 'about':
            loadAboutPage();
            break;
        case 'courses':
            loadCoursesPage();
            break;
        default:
            // Default initialization for any other page
            break;
    }
}

/**
 * Load home page functionality
 */
async function loadHomePage() {
    // Check if project cards already exist
    const existingCards = document.querySelectorAll('#recent-projects .project-card');
    if (existingCards.length > 0) {
        // Projects already in HTML, don't overwrite
        return;
    }
    
    // Otherwise, load featured projects
    const projects = await fetchProjects();
    const featuredProjects = projects.filter(project => project.featured);
    displayProjects('recent-projects', featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3));
}


/**
 * Load projects page functionality
 */
function loadProjectsPage() {
    // Initialize projects from URL parameters
    initProjectsFromUrl();
    
    // Setup load more button
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProjects);
    }
    
    // Setup view toggle buttons
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', () => {
            document.getElementById('projects-container').className = 'projects-grid';
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            savePreferences({ viewMode: 'grid' });
        });
        
        listViewBtn.addEventListener('click', () => {
            document.getElementById('projects-container').className = 'projects-list';
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            savePreferences({ viewMode: 'list' });
        });
    }
}

/**
 * Load more projects
 */
async function loadMoreProjects() {
    // Get currently displayed projects
    const displayedProjects = document.querySelectorAll('.project-card').length;
    
    // Get all projects
    const projects = await fetchProjects();
    
    // Apply any active filters
    const urlParams = new URLSearchParams(window.location.search);
    const filterType = urlParams.get('filter');
    const filterValue = urlParams.get('value');
    
    let filteredProjects = projects;
    if (filterType && filterValue) {
        filteredProjects = projects.filter(project => {
            if (filterType === 'course') {
                return project.course === filterValue;
            } else if (filterType === 'technology') {
                return project.technologies.includes(filterValue);
            }
            return true;
        });
    }
    
    // Display the next batch of projects
    const nextBatch = filteredProjects.slice(displayedProjects, displayedProjects + 6);
    
    if (nextBatch.length > 0) {
        const container = document.getElementById('projects-container');
        nextBatch.forEach(project => {
            const card = createProjectCard(project);
            container.appendChild(card);
        });
        
        // Hide load more button if all projects are displayed
        if (displayedProjects + nextBatch.length >= filteredProjects.length) {
            document.getElementById('load-more').style.display = 'none';
        }
    } else {
        document.getElementById('load-more').style.display = 'none';
    }
}

/**
 * Load project details page functionality
 */
function loadProjectDetailsPage() {
    /**
 * Load project details from URL parameter
 */
    /** * Load project details page functionality */
        // In main.js, update the loadProjectDetailsPage function:
    // In main.js, update the loadProjectDetailsPage function:
    import('./modules/project-details.js')
        .then(module => {
            module.loadProjectDetails();
        })
        .catch(error => {
            console.error('Error loading project details module:', error);
        });
}


/**
 * Load gallery page functionality
 */
async function loadGalleryPage() {
    const projects = await fetchProjects();
    displayProjects('gallery-container', projects);
    
    // Setup filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            if (filter === 'all') {
                displayProjects('gallery-container', projects);
            } else {
                const filtered = projects.filter(project => 
                    project.course === filter || 
                    project.technologies.includes(filter)
                );
                displayProjects('gallery-container', filtered);
            }
        });
    });
}

/**
 * Load contact page functionality
 */
function loadContactPage() {
    // Setup form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        setupFormListeners(contactForm);
    }
}

/**
 * Load settings page functionality
 */
function loadSettingsPage() {
    // Load user preferences
    const preferences = getPreferences();
    
    // Set form values based on preferences
    setFormValues('settings-form', preferences);
    
    // Setup theme selector
    const themeSelector = document.getElementById('theme-selector');
    if (themeSelector) {
        themeSelector.addEventListener('change', () => {
            const theme = themeSelector.value;
            document.body.className = theme;
            savePreferences({ theme });
        });
        
        // Set initial theme
        if (preferences.theme) {
            themeSelector.value = preferences.theme;
            document.body.className = preferences.theme;
        }
    }
    
    // Setup accent color selection
    const colorOptions = document.querySelectorAll('input[name="accentColor"]');
    colorOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (option.checked) {
                document.documentElement.style.setProperty('--primary-color', getColorValue(option.value));
                savePreferences({ accentColor: option.value });
            }
        });
        
        // Set initial color
        if (preferences.accentColor && option.value === preferences.accentColor) {
            option.checked = true;
            document.documentElement.style.setProperty('--primary-color', getColorValue(option.value));
        }
    });
    
    // Setup font size buttons
    const fontSizeButtons = document.querySelectorAll('.font-size-btn');
    fontSizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const size = button.dataset.size;
            
            // Update active button
            fontSizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Apply font size
            document.body.style.fontSize = getFontSizeValue(size);
            savePreferences({ fontSize: size });
        });
        
        // Set initial font size
        if (preferences.fontSize && button.dataset.size === preferences.fontSize) {
            button.click();
        }
    });
    
    // Display stats
    const viewedProjectsCount = document.getElementById('viewed-projects-count');
    if (viewedProjectsCount) {
        viewedProjectsCount.textContent = getViewedProjects().length;
    }
    
    // Setup clear data buttons
    const clearButtons = document.querySelectorAll('.clear-btn');
    clearButtons.forEach(button => {
        button.addEventListener('click', () => {
            showConfirmationModal(() => {
                const dataType = button.dataset.clear;
                clearStorageItem(dataType);
                
                // Update display
                if (dataType === 'viewedProjects') {
                    viewedProjectsCount.textContent = '0';
                }
                
                showMessage('Data cleared successfully!');
            });
        });
    });
    
    // Setup clear all data button
    const clearAllBtn = document.getElementById('clear-all-data');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            showConfirmationModal(() => {
                clearAllStorage();
                
                // Update display
                viewedProjectsCount.textContent = '0';
                
                showMessage('All data cleared successfully!');
            });
        });
    }
    
    // Setup form submission
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', event => {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(settingsForm);
            const preferences = {};
            
            // Convert FormData to object
            for (const [key, value] of formData.entries()) {
                if (key === 'showDescriptions' || key === 'enableAnimations' || key === 'showTechnologies' || key === 'highContrastMode') {
                    preferences[key] = true;
                } else {
                    preferences[key] = value;
                }
            }
            
            // Add unchecked checkboxes (they don't appear in FormData)
            const checkboxes = ['showDescriptions', 'enableAnimations', 'showTechnologies', 'highContrastMode'];
            checkboxes.forEach(checkbox => {
                if (!preferences[checkbox]) {
                    preferences[checkbox] = false;
                }
            });
            
            // Save preferences
            savePreferences(preferences);
            
            // Show confirmation
            showMessage('Settings saved successfully!');
        });
    }
}

/**
 * Load about page functionality
 */
function loadAboutPage() {
    // Initialize skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const level = bar.parentNode.parentNode.dataset.level || '0';
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, 500);
    });
}

/**
 * Load courses page functionality
 */
function loadCoursesPage() {
    // Any courses page specific functionality
}

/**
 * Setup event listeners for project filters
 */
function setupFilterListeners() {
    // Course filter
    const courseFilter = document.getElementById('course-filter');
    if (courseFilter) {
        courseFilter.addEventListener('change', () => {
            const filterValue = courseFilter.value;
            applyProjectFilter('course', filterValue);
        });
    }
    
    // Technology filter
    const techFilter = document.getElementById('tech-filter');
    if (techFilter) {
        techFilter.addEventListener('change', () => {
            const filterValue = techFilter.value;
            applyProjectFilter('technology', filterValue);
        });
    }
    
    // Filter links in dropdown menu
    const filterLinks = document.querySelectorAll('.project-filter');
    filterLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            
            const filterType = link.dataset.filterType;
            const filterValue = link.dataset.filterValue;
            
            // Redirect to projects page with filter
            window.location.href = `projects.html?filter=${filterType}&value=${filterValue}`;
        });
    });
}

/**
 * Set form values based on an object
 * @param {string} formId - The ID of the form
 * @param {Object} values - Object containing values
 */
function setFormValues(formId, values) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Loop through all form elements
    Array.from(form.elements).forEach(element => {
        if (element.name && values[element.name] !== undefined) {
            if (element.type === 'checkbox') {
                element.checked = values[element.name];
            } else if (element.type === 'radio') {
                element.checked = (element.value === values[element.name]);
            } else {
                element.value = values[element.name];
            }
        }
    });
}

/**
 * Get CSS color value from color name
 * @param {string} colorName - Name of the color
 * @returns {string} CSS color value
 */
function getColorValue(colorName) {
    const colors = {
        'blue': '#3E64FF',
        'green': '#4CAF50',
        'orange': '#FFA726',
        'purple': '#9c27b0'
    };
    
    return colors[colorName] || colors['blue'];
}

/**
 * Get CSS font size value from size name
 * @param {string} sizeName - Name of the size
 * @returns {string} CSS font size value
 */
function getFontSizeValue(sizeName) {
    const sizes = {
        'small': '0.9rem',
        'medium': '1rem',
        'large': '1.1rem'
    };
    
    return sizes[sizeName] || sizes['medium'];
}

/**
 * Clear a specific item from localStorage
 * @param {string} itemKey - Key of the item to clear
 */
function clearStorageItem(itemKey) {
    localStorage.removeItem(`portfolio_${itemKey}`);
}

/**
 * Show confirmation modal
 * @param {Function} onConfirm - Function to call on confirmation
 */
function showConfirmationModal(onConfirm) {
    const modal = document.getElementById('confirm-modal');
    if (!modal) return;
    
    // Show modal
    modal.style.display = 'flex';
    
    // Setup buttons
    const yesBtn = document.getElementById('confirm-yes');
    const noBtn = document.getElementById('confirm-no');
    
    if (yesBtn) {
        yesBtn.onclick = () => {
            modal.style.display = 'none';
            if (typeof onConfirm === 'function') {
                onConfirm();
            }
        };
    }
    
    if (noBtn) {
        noBtn.onclick = () => {
            modal.style.display = 'none';
        };
    }
    
    // Close when clicking outside
    modal.onclick = event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

/**
 * Show a message
 * @param {string} message - Message to show
 */
function showMessage(message) {
    const confirmation = document.getElementById('settings-confirmation');
    if (!confirmation) return;
    
    confirmation.textContent = message;
    confirmation.style.display = 'block';
    
    setTimeout(() => {
        confirmation.style.display = 'none';
    }, 3000);
}

// Make filter function available globally for direct use in HTML
window.applyProjectFilter = applyProjectFilter;