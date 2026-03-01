# 🔐 Environment Variables Setup Guide

## Overview

This project uses environment variables to configure different aspects of the application. This allows you to have different configurations for development, production, and testing.

---

## Files Structure

```
.env                  # Local development (gitignored)
.env.production       # Production build
.env.example          # Template for other developers
src/config/env.js     # Centralized config access
```

---

## Required Variables

### 1. API Configuration

#### `REACT_APP_API_BASE_URL`
- **Description**: Base URL for the e-commerce API
- **Default**: `https://ecommerce.routemisr.com/api/v1`
- **Example**: `https://ecommerce.routemisr.com/api/v1`
- **Required**: Yes

---

### 2. App Configuration

#### `REACT_APP_NAME`
- **Description**: Application name
- **Default**: `FreshCart`
- **Example**: `FreshCart`
- **Required**: No

#### `REACT_APP_VERSION`
- **Description**: Application version
- **Default**: `1.0.0`
- **Example**: `1.0.0`
- **Required**: No

---

### 3. Payment Configuration

#### `REACT_APP_PAYMENT_REDIRECT_URL`
- **Description**: URL to redirect after payment
- **Default**: `http://localhost:3000` (development)
- **Production**: `https://your-domain.com`
- **Required**: Yes (for checkout)

**Important**: Update this in production!

---

### 4. Feature Flags

#### `REACT_APP_ENABLE_DEVTOOLS`
- **Description**: Enable Redux DevTools
- **Default**: `true` (development), `false` (production)
- **Values**: `true` or `false`
- **Required**: No

#### `REACT_APP_ENABLE_OFFLINE_MODE`
- **Description**: Enable offline support
- **Default**: `false`
- **Values**: `true` or `false`
- **Required**: No

---

## Optional Variables

### Analytics

#### `REACT_APP_GOOGLE_ANALYTICS_ID`
- **Description**: Google Analytics tracking ID
- **Example**: `UA-XXXXXXXXX-X`
- **Required**: No

### Error Tracking

#### `REACT_APP_SENTRY_DSN`
- **Description**: Sentry DSN for error tracking
- **Example**: `https://xxxxx@sentry.io/xxxxx`
- **Required**: No

---

## Setup Instructions

### 1. Initial Setup

```bash
# Copy example file
cp .env.example .env

# Edit with your values
nano .env  # or use any text editor
```

### 2. Development Setup

Create `.env` file in project root:

```env
REACT_APP_API_BASE_URL=https://ecommerce.routemisr.com/api/v1
REACT_APP_NAME=FreshCart
REACT_APP_VERSION=1.0.0
REACT_APP_PAYMENT_REDIRECT_URL=http://localhost:3000
NODE_ENV=development
REACT_APP_ENABLE_DEVTOOLS=true
```

### 3. Production Setup

Create `.env.production` file:

```env
REACT_APP_API_BASE_URL=https://ecommerce.routemisr.com/api/v1
REACT_APP_NAME=FreshCart
REACT_APP_VERSION=1.0.0
REACT_APP_PAYMENT_REDIRECT_URL=https://your-domain.com
NODE_ENV=production
REACT_APP_ENABLE_DEVTOOLS=false
```

**Important**: Replace `https://your-domain.com` with your actual domain!

---

## Usage in Code

### Method 1: Using Config File (Recommended)

```javascript
import config from './config/env';

// Use configuration
const apiUrl = config.apiBaseUrl;
const appName = config.appName;

// Check environment
if (config.isDevelopment) {
  console.log('Running in development mode');
}

// Check feature flags
if (config.enableDevTools) {
  // Enable DevTools
}
```

### Method 2: Direct Access

```javascript
// Access directly (not recommended)
const apiUrl = process.env.REACT_APP_API_BASE_URL;
```

---

## Important Rules

### 1. Naming Convention
- **Must** start with `REACT_APP_`
- Example: `REACT_APP_API_URL` ✅
- Example: `API_URL` ❌ (won't work)

### 2. Security
- **Never** commit `.env` to git
- **Always** use `.env.example` as template
- **Never** store secrets in environment variables
- Use backend for sensitive data

### 3. Restart Required
- Changes to `.env` require app restart
- Stop server (Ctrl+C)
- Start again: `npm start`

---

## Deployment

### Vercel

```bash
# Set environment variables in Vercel dashboard
# Or use CLI
vercel env add REACT_APP_API_BASE_URL
vercel env add REACT_APP_PAYMENT_REDIRECT_URL
```

### Netlify

```bash
# Set in Netlify dashboard: Site settings → Environment variables
# Or use netlify.toml
[build.environment]
  REACT_APP_API_BASE_URL = "https://ecommerce.routemisr.com/api/v1"
```

### GitHub Pages

```bash
# Create .env.production
# Build will use these values
npm run build
```

---

## Troubleshooting

### Problem: Environment variables not working

**Solution 1**: Check naming
```bash
# ❌ Wrong
API_URL=https://api.example.com

# ✅ Correct
REACT_APP_API_URL=https://api.example.com
```

**Solution 2**: Restart server
```bash
# Stop server (Ctrl+C)
npm start
```

**Solution 3**: Check file location
```bash
# .env must be in project root
project/
├── .env          ✅ Correct
├── src/
│   └── .env      ❌ Wrong
```

---

### Problem: Variables undefined in production

**Solution**: Create `.env.production`
```bash
# Create production env file
cp .env .env.production

# Update production values
nano .env.production
```

---

### Problem: Payment redirect not working

**Solution**: Update `REACT_APP_PAYMENT_REDIRECT_URL`
```env
# Development
REACT_APP_PAYMENT_REDIRECT_URL=http://localhost:3000

# Production
REACT_APP_PAYMENT_REDIRECT_URL=https://your-actual-domain.com
```

---

## Best Practices

### 1. Use Config File
```javascript
// ✅ Good
import config from './config/env';
const url = config.apiBaseUrl;

// ❌ Bad
const url = process.env.REACT_APP_API_BASE_URL;
```

### 2. Provide Defaults
```javascript
const apiUrl = process.env.REACT_APP_API_URL || 'https://default-api.com';
```

### 3. Validate Required Variables
```javascript
if (!process.env.REACT_APP_API_BASE_URL) {
  throw new Error('REACT_APP_API_BASE_URL is required');
}
```

### 4. Document All Variables
- Add to `.env.example`
- Document in this file
- Add comments in code

---

## Security Checklist

- [ ] `.env` is in `.gitignore`
- [ ] No secrets in environment variables
- [ ] `.env.example` has no real values
- [ ] Production variables are set in hosting platform
- [ ] API keys are not exposed to client
- [ ] Sensitive operations happen on backend

---

## Example: Adding New Variable

### Step 1: Add to `.env`
```env
REACT_APP_NEW_FEATURE=true
```

### Step 2: Add to `src/config/env.js`
```javascript
const config = {
  // ... existing config
  newFeature: process.env.REACT_APP_NEW_FEATURE === 'true',
};
```

### Step 3: Use in code
```javascript
import config from './config/env';

if (config.newFeature) {
  // Enable new feature
}
```

### Step 4: Document
- Add to `.env.example`
- Add to this file
- Add comments

---

## Quick Reference

| Variable | Development | Production | Required |
|----------|-------------|------------|----------|
| `REACT_APP_API_BASE_URL` | API URL | API URL | Yes |
| `REACT_APP_PAYMENT_REDIRECT_URL` | localhost:3000 | your-domain.com | Yes |
| `REACT_APP_ENABLE_DEVTOOLS` | true | false | No |
| `REACT_APP_NAME` | FreshCart | FreshCart | No |
| `REACT_APP_VERSION` | 1.0.0 | 1.0.0 | No |

---

## Need Help?

1. Check `.env.example` for template
2. Read this documentation
3. Check `src/config/env.js` for usage
4. Restart server after changes

---

**Remember**: 
- Always use `REACT_APP_` prefix
- Never commit `.env` to git
- Restart server after changes
- Update production values before deployment

Happy coding! 🚀
