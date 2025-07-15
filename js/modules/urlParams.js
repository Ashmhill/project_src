/**
 * urlParams.js
 * Module for handling URL parameters
 */

/**
 * Get a parameter value from the URL
 * @param {string} name - The name of the parameter to retrieve
 * @returns {string|null} The parameter value, or null if not found
 */
export function getUrlParameter(name) {
  // Use URLSearchParams API if available
  if (typeof URLSearchParams !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  } 
  
  // Fallback for older browsers
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Get all parameters from the URL as an object
 * @returns {Object} An object containing all URL parameters
 */
export function getAllUrlParameters() {
  const params = {};
  
  // Use URLSearchParams API if available
  if (typeof URLSearchParams !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    return params;
  }
  
  // Fallback for older browsers
  const queryString = window.location.search.substring(1);
  if (!queryString) return params;
  
  const pairs = queryString.split('&');
  
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    const key = decodeURIComponent(pair[0]);
    
    // Skip if key is empty
    if (!key) continue;
    
    const value = pair.length > 1 ? decodeURIComponent(pair[1].replace(/\+/g, ' ')) : '';
    params[key] = value;
  }
  
  return params;
}

/**
 * Add or update parameters in the current URL
 * @param {Object} params - An object containing parameter names and values
 * @returns {string} The new URL with updated parameters
 */
export function updateUrlParameters(params) {
  // Use URLSearchParams API if available
  if (typeof URLSearchParams !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    
    // Add or update each parameter
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    }
    
    // Build the new URL
    const newSearch = searchParams.toString();
    const newUrl = window.location.pathname + (newSearch ? '?' + newSearch : '') + window.location.hash;
    
    return newUrl;
  }
  
  // Fallback for older browsers
  const queryParams = getAllUrlParameters();
  
  // Update with new params
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      delete queryParams[key];
    } else {
      queryParams[key] = value;
    }
  }
  
  // Build query string
  const newQueryParts = [];
  for (const [key, value] of Object.entries(queryParams)) {
    newQueryParts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  }
  
  const newSearch = newQueryParts.length > 0 ? '?' + newQueryParts.join('&') : '';
  const newUrl = window.location.pathname + newSearch + window.location.hash;
  
  return newUrl;
}

/**
 * Navigate to a new URL with updated parameters
 * @param {Object} params - An object containing parameter names and values
 * @param {boolean} [replace=false] - Whether to replace the current history entry
 */
export function navigateWithParams(params, replace = false) {
  const newUrl = updateUrlParameters(params);
  
  if (replace) {
    window.history.replaceState({}, '', newUrl);
  } else {
    window.history.pushState({}, '', newUrl);
  }
}

/**
 * Create a URL with parameters
 * @param {string} baseUrl - The base URL
 * @param {Object} params - An object containing parameter names and values
 * @returns {string} The full URL with parameters
 */
export function createUrlWithParameters(baseUrl, params) {
  // Use URLSearchParams API if available
  if (typeof URLSearchParams !== 'undefined') {
    const searchParams = new URLSearchParams();
    
    // Add each parameter
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        searchParams.set(key, value);
      }
    }
    
    // Build the new URL
    const queryString = searchParams.toString();
    const separator = baseUrl.includes('?') ? '&' : '?';
    
    return queryString ? baseUrl + (baseUrl.includes('?') ? '&' : '?') + queryString : baseUrl;
  }
  
  // Fallback for older browsers
  const queryParts = [];
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      queryParts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }
  
  const queryString = queryParts.join('&');
  
  return queryString ? baseUrl + (baseUrl.includes('?') ? '&' : '?') + queryString : baseUrl;
}