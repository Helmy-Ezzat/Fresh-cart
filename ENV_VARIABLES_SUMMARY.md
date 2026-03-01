# 🔐 Environment Variables - Quick Summary

## ✅ What Was Created

### Files Created:
1. `.env` - Development environment variables
2. `.env.production` - Production environment variables
3. `.env.example` - Template for other developers
4. `src/config/env.js` - Centralized configuration
5. `ENV_SETUP.md` - Complete documentation

### Files Updated:
1. `.gitignore` - Added `.env` to ignore list
2. `src/stores/cartStore.js` - Now uses config
3. `src/stores/wishlistStore.js` - Now uses config

---

## 📋 Environment Variables List

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | API base URL | `https://ecommerce.routemisr.com/api/v1` |
| `REACT_APP_PAYMENT_REDIRECT_URL` | Payment redirect URL | `http://localhost:3000` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_NAME` | App name | `FreshCart` |
| `REACT_APP_VERSION` | App version | `1.0.0` |
| `REACT_APP_ENABLE_DEVTOOLS` | Enable DevTools | `true` |
| `REACT_APP_ENABLE_OFFLINE_MODE` | Enable offline | `false` |

---

## 🚀 Quick Start

### 1. Copy Example File
```bash
cp .env.example .env
```

### 2. Your `.env` File Should Look Like:
```env
REACT_APP_API_BASE_URL=https://ecommerce.routemisr.com/api/v1
REACT_APP_NAME=FreshCart
REACT_APP_VERSION=1.0.0
REACT_APP_PAYMENT_REDIRECT_URL=http://localhost:3000
NODE_ENV=development
REACT_APP_ENABLE_DEVTOOLS=true
```

### 3. Restart Server
```bash
# Stop server (Ctrl+C)
npm start
```

---

## 💻 How to Use in Code

### Method 1: Using Config (Recommended)
```javascript
import config from './config/env';

// Get API URL
const apiUrl = config.apiBaseUrl;

// Check environment
if (config.isDevelopment) {
  console.log('Dev mode');
}

// Check feature flags
if (config.enableDevTools) {
  // Enable DevTools
}
```

### Method 2: Direct Access
```javascript
const apiUrl = process.env.REACT_APP_API_BASE_URL;
```

---

## ⚠️ Important Rules

### 1. Naming
- ✅ Must start with `REACT_APP_`
- ❌ Variables without prefix won't work

### 2. Security
- ✅ `.env` is in `.gitignore`
- ❌ Never commit `.env` to git
- ✅ Use `.env.example` as template

### 3. Changes
- ⚠️ Restart server after changing `.env`
- ⚠️ Changes don't apply automatically

---

## 🌐 Deployment

### Before Deploying:

1. **Update `.env.production`**
```env
REACT_APP_PAYMENT_REDIRECT_URL=https://your-actual-domain.com
```

2. **Set Variables in Hosting Platform**
   - Vercel: Dashboard → Settings → Environment Variables
   - Netlify: Site settings → Environment variables
   - GitHub Pages: Use `.env.production`

---

## 🐛 Troubleshooting

### Problem: Variables not working
**Solution**: 
1. Check naming (must start with `REACT_APP_`)
2. Restart server
3. Check file is in project root

### Problem: Undefined in production
**Solution**: 
1. Create `.env.production`
2. Set variables in hosting platform

### Problem: Payment redirect fails
**Solution**: 
Update `REACT_APP_PAYMENT_REDIRECT_URL` with your domain

---

## 📚 Full Documentation

For complete documentation, see: `ENV_SETUP.md`

---

## ✅ Checklist

Before committing:
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` has no real values
- [ ] All required variables are set
- [ ] Server restarted after changes

Before deploying:
- [ ] `.env.production` created
- [ ] Production URL updated
- [ ] Variables set in hosting platform
- [ ] Tested in production build

---

**Quick Reference**: All variables must start with `REACT_APP_` and require server restart!
