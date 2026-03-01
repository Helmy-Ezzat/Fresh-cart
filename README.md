# FreshCart - E-commerce Application

A modern, responsive e-commerce application built with React and Zustand for state management.

## 🚀 Features

- **User Authentication** - Login/Register with JWT
- **Product Catalog** - Browse products with categories and brands
- **Shopping Cart** - Add/remove items with real-time updates
- **Wishlist** - Save favorite products
- **Order Management** - View order history
- **Payment Integration** - Secure checkout process
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI** - Clean interface with Lucide icons

## 🛠️ Tech Stack

- **React** - UI library
- **Zustand** - State management
- **React Router** - Navigation
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Slick** - Carousels
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
src/
├── pages/              # Page components (routes)
├── components/         # Reusable components
│   ├── layout/        # Layout components (Navbar, Footer, etc.)
│   ├── ui/            # UI components (ProductCard, Buttons, etc.)
│   └── sliders/       # Slider components
├── stores/            # Zustand stores
├── hooks/             # Custom React hooks
├── config/            # Configuration files
└── assets/            # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Helmy-Ezzat/Fresh-cart.git
cd Fresh-cart
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Update environment variables in `.env`
```
REACT_APP_API_BASE_URL=https://ecommerce.routemisr.com/api/v1
REACT_APP_PAYMENT_REDIRECT_URL=http://localhost:3000
```

5. Start development server
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🎨 Key Features Implementation

### State Management (Zustand)
- User authentication state
- Shopping cart management
- Wishlist management
- Persistent storage with localStorage

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly UI elements

### Performance Optimizations
- Code splitting with React.lazy
- Memoization with useMemo
- Optimized re-renders
- Image lazy loading

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | Backend API URL | - |
| `REACT_APP_PAYMENT_REDIRECT_URL` | Payment redirect URL | - |

## 📝 Documentation

- [Zustand Best Practices](./ZUSTAND_BEST_PRACTICES.md)
- [Migration Guide](./ZUSTAND_MIGRATION.md)
- [Folder Structure](./FOLDER_STRUCTURE.md)
- [Environment Setup](./ENV_SETUP.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Helmy Ezzat**
- GitHub: [@Helmy-Ezzat](https://github.com/Helmy-Ezzat)

## 🙏 Acknowledgments

- [Route Academy](https://www.routemisr.com/) for the API
- React community for amazing tools and libraries
