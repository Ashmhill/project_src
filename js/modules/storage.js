/**
 * storage.js
 * Module for handling local storage operations
 */

// Storage key prefix to avoid collisions with other applications
const STORAGE_PREFIX = 'portfolio_';

/**
 * Save data to localStorage with the portfolio prefix
 * @param {string} key - The key to store the data under
 * @param {any} value - The data to store (will be JSON stringified)
 */
export function saveToLocalStorage(key, value) {
  try {
    // Add prefix to key
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    
    // Stringify objects/arrays, leave primitives as-is
    const valueToStore = typeof value === 'object'
       ? JSON.stringify(value)
       : value;
    
    // Store in localStorage
    localStorage.setItem(prefixedKey, valueToStore);
    
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
    return false;
  }
}

/**
 * Get data from localStorage
 * @param {string} key - The key to retrieve
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} The retrieved data, parsed from JSON if needed
 */
export function getFromLocalStorage(key, defaultValue = null) {
  try {
    // Add prefix to key
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    
    // Get from localStorage
    const item = localStorage.getItem(prefixedKey);
    
    // Return default if item doesn't exist
    if (item === null) {
      return defaultValue;
    }
    
    // Try to parse as JSON, return as-is if parsing fails
    try {
      return JSON.parse(item);
    } catch (e) {
      // If it's not valid JSON, return the raw value
      return item;
    }
  } catch (error) {
    console.error(`Error getting from localStorage: ${error}`);
    return defaultValue;
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - The key to remove
 */
export function removeFromLocalStorage(key) {
  try {
    // Add prefix to key
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    
    // Remove from localStorage
    localStorage.removeItem(prefixedKey);
    
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${error}`);
    return false;
  }
}

/**
 * Clear all portfolio-related items from localStorage
 */
export function clearAllStorage() {
  try {
    // Get all keys in localStorage
    const keys = Object.keys(localStorage);
    
    // Filter keys that start with our prefix
    const portfolioKeys = keys.filter(key => key.startsWith(STORAGE_PREFIX));
    
    // Remove each matching key
    portfolioKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
    return false;
  }
}

/**
 * Save user preferences to localStorage
 * @param {Object} preferences - User preferences object
 */
export function savePreferences(preferences) {
  return saveToLocalStorage('preferences', preferences);
}

/**
 * Get user preferences from localStorage
 * @returns {Object} User preferences
 */
export function getPreferences() {
  return getFromLocalStorage('preferences', {});
}

/**
 * Check if localStorage is available in the browser
 * @returns {boolean} True if localStorage is available
 */
export function isStorageAvailable() {
  try {
    const testKey = `${STORAGE_PREFIX}test`;
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get all projects that have been viewed
 * @returns {Array} Array of project IDs
 */
export function getViewedProjects() {
  return getFromLocalStorage('viewedProjects', []);
}

/**
 * Track a project as viewed
 * @param {string} projectId - The ID of the project to track
 */
export function trackViewedProject(projectId) {
  const viewedProjects = getViewedProjects();
  
  if (!viewedProjects.includes(projectId)) {
    viewedProjects.push(projectId);
    saveToLocalStorage('viewedProjects', viewedProjects);
  }
}

// Add this export to match what's being imported in projectsData.js
export const trackProjectView = trackViewedProject;