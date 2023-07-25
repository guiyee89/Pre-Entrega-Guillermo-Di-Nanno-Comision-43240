// import { useEffect, useState } from "react";
// import styled from "styled-components/macro";

// export const FilterStock = ({ selectedItem, onFilterStockChange }) => {
//   const [sizeFilters, setSizeFilters] = useState({
//     XS: false,
//     S: false,
//     M: false,
//     L: false,
//     XL: false,
//   });
//   const [colorFilters, setColorFilters] = useState({
//     White: false,
//     Black: false,
//     Red: false,
//     Purple: false,
//     Blue: false,
//     Yellow: false,
//     Green: false,
//     Orange: false,
//     Brown: false,
//   });

//   // Get the stock for the selected size and color
//   const getStock = () => {
//     const selectedSize = Object.keys(sizeFilters).find((size) => sizeFilters[size]);
//     const selectedColor = Object.keys(colorFilters).find((color) => colorFilters[color]);

//     if (selectedSize && selectedColor && isPropertyExists(selectedSize, selectedColor)) {
//       const stock = selectedItem.stock[selectedSize][selectedColor];
//       if (stock) {
//         return stock;
//       } else {
//         return "No stock available";
//       }
//     }
//     // If either size or color is not selected, do not show the stock value
//     return null;
//   };

//   // Handle filtering stock and pass data to parent component
//   const handleFilterStock = () => {
//     const filteredStock = getStock();
//     onFilterStockChange(filteredStock);
//   };

//     // useEffect to trigger the filter when sizeFilters or colorFilters change
//     useEffect(() => {
//       handleFilterStock();
//     }, [sizeFilters, colorFilters]);
  

//   // Update the filter when the size or color checkbox changes
//   const handleFilterChange = (key, checked) => {
//     if (key in sizeFilters) {
//       // If a size checkbox is checked, uncheck the other size checkboxes
//       setSizeFilters((prev) => ({
//         ...Object.keys(prev).reduce((acc, size) => {
//           acc[size] = size === key ? checked : false;
//           return acc;
//         }, {}),
//       }));

//       // If the checked size has no available colors, uncheck all color checkboxes
//       if (checked) {
//         const availableColorsForSelectedSize = Object.keys(colorFilters).filter((color) =>
//           isPropertyExists(key, color)
//         );
//         setColorFilters((prev) => ({
//           ...Object.keys(prev).reduce((acc, color) => {
//             acc[color] = availableColorsForSelectedSize.includes(color) ? prev[color] : false;
//             return acc;
//           }, {}),
//         }));
//       }
//     } else if (key in colorFilters) {
//       // If a color checkbox is checked, uncheck the other color checkboxes
//       setColorFilters((prev) => ({
//         ...Object.keys(prev).reduce((acc, color) => {
//           acc[color] = color === key ? checked : false;
//           return acc;
//         }, {}),
//       }));
//     }
//   };

//   // Check if a property exists in selectedItem.stock
//   const isPropertyExists = (size, color) => {
//     return selectedItem.stock[size]?.[color] !== undefined;
//   };

//   // Filter out sizes that have no stock available for any color
//   const availableSizes = Object.keys(sizeFilters).filter((size) =>
//     Object.keys(colorFilters).some((color) => isPropertyExists(size, color))
//   );

//   // Filter out colors that have no stock available for the selected size
//   const availableColors = Object.keys(colorFilters).filter((color) =>
//     isPropertyExists(availableSizes.find((size) => sizeFilters[size]), color)
//   );

//   return (
//     <>
//       <Wrapper>
//         {/* Size filter */}
//         <SizeWrapper>
//           {availableSizes.map((size) => (
//             <CheckboxContainer key={size}>
//               <Checkbox
//                 type="checkbox"
//                 checked={sizeFilters[size]}
//                 onChange={(e) => handleFilterChange(size, e.target.checked)}
//               />
//               <CheckboxLabel>{size}</CheckboxLabel>
//             </CheckboxContainer>
//           ))}
//         </SizeWrapper>
//         {/* Color filter */}
//         <ColorWrapper>
//           {availableColors.map((color) => (
//             <CheckboxContainer key={color}>
//               <Checkbox
//                 type="checkbox"
//                 checked={colorFilters[color]}
//                 onChange={(e) => handleFilterChange(color, e.target.checked)}
//               />
//               <CheckboxLabel>{color}</CheckboxLabel>
//             </CheckboxContainer>
//           ))}
//         </ColorWrapper>
//       </Wrapper>
//     </>
//   );
// };

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `
// const SizeWrapper = styled.div`
//   display: flex;
// `
// const ColorWrapper = styled.div`
//   display: flex;
// `
// const CheckboxContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 5px;
// `;

// const Checkbox = styled.input`
//   margin-right: 5px;
// `;

// const CheckboxLabel = styled.span``;