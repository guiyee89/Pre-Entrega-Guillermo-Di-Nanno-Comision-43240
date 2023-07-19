// import {collection,getDocs,limit,orderBy,query,where,} from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../../../../firebaseConfig";
// import { CarouselDesktop } from "./CarouselDesktop";
// import { BarLoader } from "react-spinners";
// import styled from "styled-components/macro";


// export const CarouselContainer = () => {

//   const [loading, setLoading] = useState(true);

//   const [discountedProducts, setDiscountedProducts] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     const fetchDiscountedProducts = async () => {
//       const q = query(
//         collection(db, "products"),
//         where("discount", "!=", null),
//         orderBy("discount"),
//         limit(8)
//       );

//       const querySnapshot = await getDocs(q);
//       const products = querySnapshot.docs.map((doc) => doc.data());
//       setDiscountedProducts(products);
//     }
//     fetchDiscountedProducts();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <LoaderWrapper>
//           <BarLoader color="#12352e" width={250} />
//         </LoaderWrapper>
//       ) : (
//         <CarouselDesktop discountedProducts={discountedProducts} />
//       )}
//     </>
//   );
// };
// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 538px;
//   margin-left: 35px;
// `;

