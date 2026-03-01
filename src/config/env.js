/**
 * Environment Configuration
 * 
 * Centralized access to environment variables
 * All env vars must start with REACT_APP_ to be accessible
 */

const config = {
  // API Configuration
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://ecommerce.routemisr.com/api/v1',
  
  // App Configuration
  appName: process.env.REACT_APP_NAME || 'FreshCart',
  appVersion: process.env.REACT_APP_VERSION || '1.0.0',
  
  // Payment Configuration
  paymentRedirectUrl: process.env.REACT_APP_PAYMENT_REDIRECT_URL || window.location.origin,
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  
  // Feature Flags
  enableDevTools: process.env.REACT_APP_ENABLE_DEVTOOLS === 'true',
  enableOfflineMode: process.env.REACT_APP_ENABLE_OFFLINE_MODE === 'true',
  
  // Optional: Analytics
  googleAnalyticsId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
  
  // Optional: Error Tracking
  sentryDsn: process.env.REACT_APP_SENTRY_DSN,
};

// Validate required environment variables
const requiredEnvVars = ['REACT_APP_API_BASE_URL'];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} is not set in environment variables`);
  }
});

// Log configuration in development
if (config.isDevelopment) {
  console.log('🔧 App Configuration:', {
    apiBaseUrl: config.apiBaseUrl,
    appName: config.appName,
    appVersion: config.appVersion,
    environment: process.env.NODE_ENV,
  });
}

export default config;
