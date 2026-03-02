/**
 * Environment Configuration
 * 
 * Centralized access to environment variables
 */

const config = {
  // API Configuration
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://ecommerce.routemisr.com/api/v1',
};

// Validate required environment variables
if (!process.env.REACT_APP_API_BASE_URL) {
  console.warn('Warning: REACT_APP_API_BASE_URL is not set in environment variables');
}

// Log configuration in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 App Configuration:', {
    apiBaseUrl: config.apiBaseUrl,
    environment: process.env.NODE_ENV,
  });
}

export default config;
