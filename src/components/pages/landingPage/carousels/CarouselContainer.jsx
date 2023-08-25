import { useState, useEffect } from "react";
import { CarouselDesktop } from "./CarouselDesktop";
import { collection, getDocs, limit } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

export const CarouselContainer = () => {
  const [discountProducts, setDiscountedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      console.log("fetching discount");
      try {
        const queryAllProducts = collection(db, "products");
        const querySnapshot = await getDocs(queryAllProducts);
  
        const filteredDiscountProducts = [];
        const filteredProductsMap = new Map();
  
        for (const doc of querySnapshot.docs) {
          const product = doc.data();
          if (product.discount) {
            const { userId, color } = product;
            const key = `${userId}-${color}`;
  
            // Check if the product's userId and color combination already exists in the filteredProductsMap
            if (!filteredProductsMap.has(key)) {
              // If not, add the product to the filteredProductsMap
              filteredProductsMap.set(key, product);
              filteredDiscountProducts.push({ ...product, id: doc.id });
            }
            // Stop adding items to the filteredDiscountProducts once you reach 12
            if (filteredDiscountProducts.length === 12) {
              break;
            }
          }
        }
        setDiscountedProducts(filteredDiscountProducts);
      } catch (error) {
        console.error("Error fetching discounted products:", error);
      }
    };
    fetchDiscountedProducts();
  }, []);
  
  

  return <CarouselDesktop discountProducts={discountProducts} loading={loading} />;
};

