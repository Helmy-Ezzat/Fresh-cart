import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";

import { Layout, ProtectedRoute } from "./components";
import {
  Home,
  Brands,
  Cart,
  Categories,
  Login,
  NotFound,
  Payment,
  ProductDetails,
  Products,
  Register,
  WishList,
  Orders,
} from "./pages";
import { useStoreInitializer } from "./hooks/useStoreInitializer";

// Create router outside component to prevent recreation on every render
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// Create QueryClient outside component
const queryClient = new QueryClient();

export default function App() {
  useStoreInitializer();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen="false" position="bottom-right" /> */}
      </QueryClientProvider>
      <Toaster />
      <Offline>
        <div className="fixed inset-x-0 top-0 z-40 py-1 text-xs text-center text-white bg-gray-900 sm:text-sm">
          Your Internet Connection has been corrupted
        </div>
      </Offline>
    </>
  );
}
