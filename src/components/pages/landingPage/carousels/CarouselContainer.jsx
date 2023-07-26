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



//LOGICA ANTERIOR DE CAROUSEL FETCHEANDO ITEMS X ID Y FILTRANDO DISCOUNT

// import { useState, useEffect } from "react";
// import Carousel from "react-bootstrap/Carousel";
// import styled from "styled-components/macro";
// import { collection, getDocs} from "firebase/firestore";
// import { db } from "../../../../firebaseConfig";
// import { Link } from "react-router-dom";
// import { ClipLoader } from "react-spinners";

// export const CarouselDesktop = () => {
//   const [discountProducts, setDiscountedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setLoading(false);
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       const queryAllProducts = collection(db, "products"); //Usar "query" para usar metodos de filtrado: "discount" "orderBy" "limit", etc
//       const querySnapshot = await getDocs(queryAllProducts);
//       const allProducts = querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));

//       const filterDiscountProducts = allProducts.filter((product) => product.discount);
//       setDiscountedProducts(filterDiscountProducts);
//     };
//     fetchAllProducts();
//   }, []);

//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };
//   return (
//     <Wrapper>
//       {loading ? (
//         <LoaderWrapper>
//           <ClipLoader color="#194f44" size={80} />
//         </LoaderWrapper>
//       ) : (
//         <StyledCarousel
//           activeIndex={index}
//           onSelect={handleSelect}
//           interval={5200}
//         >
//           <CarouselItem>
//             <CarouselInner>
//               {discountProducts.slice(0, 4).map((product) => (
//                 <ItemWrapper key={product.id}>
//                   <LinkWrapper to={`/item-details/${product.id}`}>
//                     <ItemCard>
//                       <CarouselImg
//                         className="d-block w-100"
//                         src={product.img}
//                         alt={product.title}
//                       />
//                       <Discount>-{product.discount}%</Discount>
//                       <InfoWrapper>
//                         <ItemTitle>{product.title}</ItemTitle>
//                         <ItemSubTitle>{product.subtitle}</ItemSubTitle>
//                         <ItemPrice hasDiscount={"discount" in product}>
//                           <DiscountPrice>
//                             $ {product.discountPrice}
//                           </DiscountPrice>{" "}
//                           ${product.price}
//                         </ItemPrice>
//                       </InfoWrapper>
//                     </ItemCard>
//                   </LinkWrapper>
//                 </ItemWrapper>
//               ))}
//             </CarouselInner>
//           </CarouselItem>

//           <CarouselItem>
//             <CarouselInner>
//               {discountProducts.slice(4, 8).map((product) => (
//                 <ItemWrapper key={product.id}>
//                   <LinkWrapper to={`/item-details/${product.id}`}>
//                     <ItemCard>
//                       <CarouselImg
//                         className="d-block w-100"
//                         src={product.img}
//                         alt={product.title}
//                       />
//                       <Discount>-{product.discount}%</Discount>
//                       <InfoWrapper>
//                         <ItemTitle>{product.title}</ItemTitle>
//                         <ItemSubTitle>{product.subtitle}</ItemSubTitle>
//                         <ItemPrice hasDiscount={"discount" in product}>
//                           <DiscountPrice>
//                             $ {product.discountPrice}
//                           </DiscountPrice>{" "}
//                           ${product.price}
//                         </ItemPrice>
//                       </InfoWrapper>
//                     </ItemCard>
//                   </LinkWrapper>
//                 </ItemWrapper>
//               ))}
//             </CarouselInner>
//           </CarouselItem>
//         </StyledCarousel>
//       )}
//     </Wrapper>
//   );
// };
