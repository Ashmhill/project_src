/** 
 * project-details.js
 * Module for handling project details display and navigation
 */

import { fetchProjects } from './projectsData.js';
import { trackViewedProject } from './storage.js';
import { getUrlParameter } from './urlParams.js';

/**
 * Load project details from URL parameter
 */
export async function loadProjectDetails() {
    const projectId = getUrlParameter('id');
    if (!projectId) {
        showError('Project ID not specified');
        return;
    }
    
    try {
        const projects = await fetchProjects();
        const project = projects.find(p => p.id === projectId);
        
        if (!project) {
            showError('Project not found');
            return;
        }
        
        // Render project details
        renderProjectDetails(project);
        
        // Track this project view
        trackViewedProject(projectId);
        
        // Load related projects
        loadRelatedProjects(projects, project);
        
        // Setup navigation buttons
        setupProjectNavigation(projects, projectId);
        
    } catch (error) {
        console.error('Error loading project details:', error);
        showError('Failed to load project details');
    }
}

/**
 * Render project details to the page
 * @param {Object} project - Project data
 */
function renderProjectDetails(project) {
    // Update project title and short description
    const titleContainer = document.getElementById('project-title-container');
    if (titleContainer) {
        titleContainer.innerHTML = `<h1>${project.title}</h1>
                                  <p>${project.shortDescription}</p>`;
    }
    
    // Display project details
    const projectContainer = document.getElementById('project-container');
    if (projectContainer) {
        projectContainer.innerHTML = `
            <div class="project-meta">
                <div class="project-meta-item">
                    <h3>Course</h3>
                    <p>${project.course}</p>
                </div>
                <div class="project-meta-item">
                    <h3>Technologies</h3>
                    <p>${project.technologies.join(', ')}</p>
                </div>
                <div class="project-meta-item">
                    <h3>Completed</h3>
                    <p>${project.completionDate || 'Ongoing'}</p>
                </div>
            </div>
            <div class="project-description">
                <p>${project.description}</p>
            </div>
            <div class="project-screenshots">
                <figure>
                    <img src="${project.thumbnail}" alt="${project.title} Screenshot">
                    <figcaption>Project Screenshot</figcaption>
                </figure>
            </div>
            <div class="project-links">
                ${project.liveUrl ? `<a href="${project.liveUrl}" class="btn" target="_blank">View Live Project</a>` : ''}
                ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn btn-outline" target="_blank">View Code</a>` : ''}
            </div>
        `;
    }
}

/**
 * Load related projects based on same course or technologies
 * @param {Array} projects - All projects
 * @param {Object} currentProject - Current project data
 */
function loadRelatedProjects(projects, currentProject) {
    // Find projects from same course or with similar technologies
    const relatedProjects = projects.filter(p => 
        p.id !== currentProject.id && 
        (p.course === currentProject.course || 
         p.technologies.some(tech => currentProject.technologies.includes(tech)))
    ).slice(0, 3); // Limit to 3 related projects

    const relatedContainer = document.getElementById('related-projects-container');
    if (relatedContainer) {
        if (relatedProjects.length === 0) {
            relatedContainer.innerHTML = '<p>No related projects found.</p>';
            return;
        }
        
        let relatedHTML = '';
        relatedProjects.forEach(project => {
            relatedHTML += `
                <div class="project-card">
                    <div class="project-image">
                        <img src="${project.thumbnail}" alt="${project.title}">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p class="project-course">${project.course}</p>
                        <p class="project-description">${project.shortDescription}</p>
                        <div class="project-technologies">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <a href="project-details.html?id=${project.id}" class="btn">View Details</a>
                    </div>
                </div>
            `;
        });
        
        relatedContainer.innerHTML = relatedHTML;
    }
}

/**
 * Set up previous/next project navigation
 * @param {Array} projects - All projects
 * @param {string} currentProjectId - Current project ID
 */
function setupProjectNavigation(projects, currentProjectId) {
    const currentIndex = projects.findIndex(p => p.id === currentProjectId);
    
    if (currentIndex === -1) return;
    
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
    
    const prevLink = document.getElementById('prev-project');
    const nextLink = document.getElementById('next-project');
    
    if (prevLink) {
        if (prevProject) {
            prevLink.href = `project-details.html?id=${prevProject.id}`;
            prevLink.innerHTML = `<span>← Previous Project</span>`;
            prevLink.style.display = 'inline-block';
        } else {
            prevLink.style.display = 'none';
        }
    }
    
    if (nextLink) {
        if (nextProject) {
            nextLink.href = `project-details.html?id=${nextProject.id}`;
            nextLink.innerHTML = `<span>Next Project →</span>`;
            nextLink.style.display = 'inline-block';
        } else {
            nextLink.style.display = 'none';
        }
    }
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    const titleContainer = document.getElementById('project-title-container');
    if (titleContainer) {
        titleContainer.innerHTML = `<h1>Error</h1>`;
    }
    
    const container = document.getElementById('project-container');
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <a href="projects.html" class="btn">Back to Projects</a>
            </div>
        `;
    }
}
