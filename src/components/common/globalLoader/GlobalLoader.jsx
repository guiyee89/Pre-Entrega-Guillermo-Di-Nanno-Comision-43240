// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import styled from "styled-components/macro";


// export const GlobalLoader = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   //Global "Flash" Conditional
//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 450);

//     return () => clearTimeout(timer);
//   }, [location]);


//   return loading ? (
//     <Wrapper>
//     </Wrapper>
//   ) : (
//     children
//   );
// };
// const Wrapper = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100%;
//     margin-left: 20px;
// `