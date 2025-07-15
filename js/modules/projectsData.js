/** 
 * projectsData.js
 * Module for handling project data fetching and display 
 */

/**
 * Fetch projects data from JSON file
 * @returns {Promise<Array>} A promise that resolves to an array of project objects
 */
export async function fetchProjects() {
    try {
        const response = await fetch('./data/projects.json');
        
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.projects || [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        // Return fallback projects if fetch fails
        return [];
    }
}

/**
 * Display projects in the specified container
 * @param {string} containerId - The ID of the container element
 * @param {Array} projects - Array of project objects
 * @param {number} limit - Maximum number of projects to display (optional)
 */
export function displayProjects(containerId, projects, limit = null) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }
    
    // Clear loading indicator
    container.innerHTML = '';
    
    // If no projects, show message
    if (!projects || projects.length === 0) {
        container.innerHTML = '<p class="no-projects">No projects found.</p>';
        return;
    }
    
    // Limit the number of projects if specified
    const projectsToDisplay = limit ? projects.slice(0, limit) : projects;
    
    // Create project cards
    projectsToDisplay.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
}

/**
 * Create a project card element
 * @param {Object} project - Project data object
 * @returns {HTMLElement} The project card element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    card.dataset.category = project.course;
    
    const projectImage = document.createElement('div');
    projectImage.className = 'project-image';
    
    const img = document.createElement('img');
    img.src = project.thumbnail;
    img.alt = project.title;
    projectImage.appendChild(img);
    
    const projectInfo = document.createElement('div');
    projectInfo.className = 'project-info';
    
    const title = document.createElement('h3');
    title.textContent = project.title;
    
    const course = document.createElement('p');
    course.className = 'project-course';
    course.textContent = project.course;
    
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.shortDescription;
    
    const techContainer = document.createElement('div');
    techContainer.className = 'project-technologies';
    
    project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });
    
    const viewLink = document.createElement('a');
    viewLink.href = project.detailsUrl || `project-details.html?id=${project.id}`;
    viewLink.className = 'btn';
    viewLink.textContent = 'View Details';
    
    // Append all elements
    projectInfo.appendChild(title);
    projectInfo.appendChild(course);
    projectInfo.appendChild(description);
    projectInfo.appendChild(techContainer);
    projectInfo.appendChild(viewLink);
    
    card.appendChild(projectImage);
    card.appendChild(projectInfo);
    
    return card;
}

/**
 * Filter projects by category
 * @param {Array} projects - Array of project objects
 * @param {string} category - Category to filter by
 * @param {string} value - Value to filter for
 * @returns {Array} Filtered array of projects
 */
export function filterProjects(projects, category, value) {
    if (!category || value === 'all') {
        return projects;
    }
    
    return projects.filter(project => {
        if (category === 'course') {
            return project.course === value;
        } else if (category === 'technology') {
            return project.technologies.includes(value);
        }
        return true;
    });
}

/**
 * Apply filter to projects display
 * @param {string} filterType - Type of filter (course, technology)
 * @param {string} filterValue - Value to filter for
 */
export async function applyProjectFilter(filterType, filterValue) {
    const projects = await fetchProjects();
    const filteredProjects = filterProjects(projects, filterType, filterValue);
    
    // Update URL with filter parameters
    const url = new URL(window.location.href);
    url.searchParams.set('filter', filterType);
    url.searchParams.set('value', filterValue);
    window.history.pushState({}, '', url);
    
    // Display filtered projects
    displayProjects('projects-container', filteredProjects);
}

/**
 * Initialize projects from URL parameters
 */
export async function initProjectsFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterType = urlParams.get('filter');
    const filterValue = urlParams.get('value');
    
    const projects = await fetchProjects();
    
    if (filterType && filterValue) {
        const filteredProjects = filterProjects(projects, filterType, filterValue);
        displayProjects('projects-container', filteredProjects);
    } else {
        displayProjects('projects-container', projects);
    }
}

/**
 * Load project details based on URL parameter
 * This is now handled by project-details.js
 */
export async function loadProjectDetails() {
    console.log('This function is now in project-details.js');
    // This is just a stub that remains for backward compatibility
}

/**
 * Navigate to previous or next project
 * @param {string} direction - Either 'prev' or 'next'
 */
export function navigateProjects(direction) {
    // Get current project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = urlParams.get('id');
    
    if (!currentId) return;
    
    // Get all projects
    fetchProjects().then(projects => {
        // Find current project index
        const currentIndex = projects.findIndex(project => project.id === currentId);
        
        if (currentIndex === -1) return;
        
        let newIndex;
        if (direction === 'prev') {
            // Go to previous project or wrap to the end
            newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
        } else {
            // Go to next project or wrap to the beginning
            newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
        }
        
        // Navigate to the new project
        window.location.href = `project-details.html?id=${projects[newIndex].id}`;
    });
}
