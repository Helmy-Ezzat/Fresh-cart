import React, { createContext, useState } from "react";

import axios from "axios";
export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);

  async function addToWishList(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: productId },
        { headers: { token: localStorage.getItem("userToken") } },
      );
      if (data.status === "success") {
        setNumOfWishlistItems(data.data.length);
      }
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function deleteproduct(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: { token: localStorage.getItem("userToken") },
        },
      );
      if (data.status === "success") {
        setNumOfWishlistItems(data.data.length);
      }
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getWishlist() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token: localStorage.getItem("userToken") } },
      );
      if (data.status === "success") {
        setNumOfWishlistItems(data.count || 0);
      }
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <WishListContext.Provider
      value={{ addToWishList, deleteproduct, getWishlist, numOfWishlistItems }}
    >
      {children}
    </WishListContext.Provider>
  );
}
