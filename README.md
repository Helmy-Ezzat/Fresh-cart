# FreshCart E-Commerce

Modern e-commerce application built with React, TypeScript, and Zustand.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Zustand** - State management
- **React Router** - Navigation
- **TanStack Query** - Data fetching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Formik + Yup** - Forms & validation

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your API URL
REACT_APP_API_BASE_URL=https://your-api-url.com/api/v1
```

### Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Type check
npm run type-check
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── layout/      # Layout components (Navbar, Footer)
│   ├── ui/          # UI components (ProductCard, Button)
│   └── sliders/     # Slider components
├── pages/           # Page components
├── stores/          # Zustand stores
│   ├── userStore.ts
│   ├── cartStore.ts
│   └── wishlistStore.ts
├── hooks/           # Custom React hooks
├── config/          # Configuration files
├── types/           # TypeScript type definitions
└── Assets/          # Images and static files
```

## State Management

Using Zustand for simple and efficient state management:

```typescript
// Using stores
import { useUserStore, useCartStore } from './stores';

function MyComponent() {
  const userToken = useUserStore((state) => state.userToken);
  const addToCart = useCartStore((state) => state.addProductToCart);
  
  // Use them...
}
```

## Environment Variables

Required variables in `.env`:

```env
REACT_APP_API_BASE_URL=https://api.example.com/api/v1
REACT_APP_PAYMENT_REDIRECT_URL=http://localhost:3000
```

## Features

- User authentication (login/register)
- Product browsing and search
- Shopping cart management
- Wishlist functionality
- Order history
- Payment integration
- Responsive design

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run type-check` - Check TypeScript types

## License

MIT
