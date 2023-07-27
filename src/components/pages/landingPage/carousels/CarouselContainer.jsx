import { useState, useEffect } from "react";
import { CarouselDesktop } from "./CarouselDesktop";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

export const CarouselContainer = () => {
  const [discountProducts, setDiscountedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      const queryAllProducts = collection(db, "products");
      const querySnapshot = await getDocs(queryAllProducts);
      const allProducts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filteredProductsMap = new Map();

      for (const product of allProducts) {
        if (product.discount) {
          const { userId, color } = product;
          const key = `${userId}-${color}`;

          // Check if the product's userId and color combination already exists in the filteredProductsMap
          if (!filteredProductsMap.has(key)) {
            // If not, add the product to the filteredProductsMap
            filteredProductsMap.set(key, product);
          }
        }
      }
      // Convert the Map values to an array of filtered products
      const filteredDiscountProducts = Array.from(filteredProductsMap.values());
      setDiscountedProducts(filteredDiscountProducts);
    };

    fetchDiscountedProducts();
  }, []);

  return <CarouselDesktop discountProducts={discountProducts} loading={loading} />;
};

