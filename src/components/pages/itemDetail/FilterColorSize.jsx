import { useState } from "react";

export const FilterColorSize = ({ relatedItems }) => {
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  console.log(selectedColors);
  console.log(selectedSizes);

  // Function to handle color selection
  const handleColorClick = (color) => {
    setSelectedColors((prevColors) => ({
      [color]: !prevColors[color], // Toggle the selected color
    }));
    // Reset other color selections
    for (const prevColor in selectedColors) {
      if (prevColor !== color) {
        setSelectedColors((prevColors) => ({
          ...prevColors,
          [prevColor]: false,
        }));
      }
    }
  };

  // Function to handle size selection
  const handleSizeClick = (size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [size]: !prevSizes[size],
    }));
  };

 // Filter items based on selected color and size options
const filteredItems = relatedItems.filter((item) => {
  const color = item.color;
  const size = item.size;

  const colorSelected = selectedColors[color];
  const sizeSelected = selectedSizes[size];

  // Check if the color or size is selected, and filter accordingly
  if (Object.keys(selectedColors).length > 0) {
    return colorSelected && (!Object.keys(selectedSizes).length || sizeSelected);
  } else if (Object.keys(selectedSizes).length > 0) {
    return sizeSelected && (!Object.keys(selectedColors).length || colorSelected);
  }

  return true; // If no filters are selected, return all items
});
console.log(filteredItems);


   //Render all Colors and Sizes
    const uniqueColors = Array.from(new Set(relatedItems.map((item) => item.color)));
    const uniqueSizes = Array.from(new Set(relatedItems.map((item) => item.size)));
  
  return (
    <>
      {/* Color filter */}
      <select value="" onChange={(e) => handleColorClick(e.target.value)}>
        <option value="">All Colors</option>
        {uniqueColors.map((color) => (
          <option key={color} value={color} selected={selectedColors[color]}>
            {color}
          </option>
        ))}
      </select>

      {/* Size filter */}
      <select value="" onChange={(e) => handleSizeClick(e.target.value)}>
        <option value="">All Sizes</option>
        {uniqueSizes.map((size) => (
          <option key={size} value={size} selected={selectedSizes[size]}>
            {size}
          </option>
        ))}
      </select>
    </>
  );
};



// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
// `;
// const ColorFilterWrapper = styled.div`
//   display: flex;
//   width: 100%;
// `;
// const SizeFilterWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   text-transform: uppercase;
// `;
// const Images = styled.img`
//   width: 75px;
//   margin-left: 10px;
// `;
// const Size = styled.h2`
//   border: 1px solid black;
//   width: 35px;
//   height: 35px;
//   border-radius: 50%;
//   margin-left: 10px;
//   padding-top: 2px;
//   padding-left: 1px;
//   font-size: 1.2rem;
//   text-align: center;
// `;

// import { useEffect, useState } from "react";
// import styled from "styled-components/macro";

// export const FilterColorSize = ({ onFilterChange }) => {
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
//     onFilterChange(filteredStock);
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

// Just to refresh the memory, it was something like this:   import { useEffect, useState } from "react";
// import styled from "styled-components/macro";

// export const FilterColorSize = ({ onFilterChange }) => {
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
//     onFilterChange(filteredStock);
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
//         I will create a new component called FilterColorSize.jsx that will have a similar logic and similar functionality, but not quite the same.  The idea is to pass the selectedItem thru the handle event from ItemDetailContainer: import { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { ItemDetail } from "./ItemDetail";
// import { CartContext } from "../../context/CartContext";
// import { db } from "../../../firebaseConfig";
// import { collection, getDoc, doc } from "firebase/firestore";
// import styled from "styled-components/macro";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BarLoader } from "react-spinners";

// export const ItemDetailContainer = () => {
//   //Guardamos los items (objetos)
//   const [selectedItem, setSelectedItem] = useState({});

//   //PROVEEMOS EL "CONTEXTO"
//   const { addToCart } = useContext(CartContext);

//   const { id } = useParams();

//   //Obtener cantidades por ID para pasar la data
//   // const quantityId = getTotalQuantityById(id);

//   //AGREGAMOS PRODUCTOS AL CARRITO
//   const onAdd = (quantity) => {
//     let data = {
//       ...selectedItem,
//       quantity: quantity,
//     };
//      //Agregamos la "data" de los productos con la funcion de contexto
//     addToCart(data);
//     setSelectedItem({ ...selectedItem, quantity: 1 }); //Reset count inicial a 1
//   };

//   //ENCONTRAMOS PRODUCTOS POR "ID" Y RESOLVEMOS PROMISE PARA RENDERIZAR
//   useEffect(() => {
//     let itemCollection = collection(db, "products");
//     let refDoc = doc(itemCollection, id);

//     setTimeout(() => {
//       getDoc(refDoc).then((response) => {
//         setSelectedItem({
//           ...response.data(),
//           id: response.id,
//         });
//       });
//     }, 800);
//   }, [id]);

//   const handleFilter = () => {
//     //create handle event here
//   }

//   return (
//     <>
//       <ToastContainer
//         position="bottom-right"
//         autoClose={1000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//       {selectedItem.id ? (
//         <ItemDetail
//           selectedItem={selectedItem}
//           onAdd={onAdd}
//           addToCart={addToCart}
//           onFilterChange={handleFilter}
//         />
//       ) : (
//         <LoaderWrapper>
//           <BarLoader color="#12352e"  width={250}/>
//         </LoaderWrapper>
//       )}
//     </>
//   );
// };      to the rendering component ItemDetail:  import styled from "styled-components/macro";
// import { ItemCount } from "../../common/itemCount/ItemCount";
// import { FilterColorSize } from "./FilterColorSize";

// export const ItemDetail = ({ selectedItem, onAdd, onFilterChange }) => {
//   const hasDiscount = "discount" in selectedItem;

//   return (
//     <Wrapper>
//       <ImgWrapper>
//         <Image src={selectedItem.img} id={selectedItem.id} />
//       </ImgWrapper>
//       <InsideWrapper>
//         <Title>{selectedItem.title}</Title>
//         <SubTitle>{selectedItem.subtitle}</SubTitle>
//         <FilterWrapper>
//           <FilterColorSize onFilterChange={onFilterChange}/>
//         </FilterWrapper>
//         <Stock>
//           in stock <Num>{selectedItem.stock}</Num>
//         </Stock>
//         {hasDiscount ? (
//           <ItemPrice hasDiscount={hasDiscount}>
//             <DiscountPrice>$ {selectedItem.discountPrice} </DiscountPrice> ${" "}
//             {selectedItem.price}
//           </ItemPrice>
//         ) : (
//           <ItemPrice>$ {selectedItem.price}</ItemPrice>
//         )}
//         <ItemCountWrapper>
//           <ItemCount stock={selectedItem.stock} initial={1} onAdd={onAdd} />
//         </ItemCountWrapper>
//         <Description>{selectedItem.description}</Description>
//         <ReferenceWrapper>
//           <SizeReference>Reference Size Model</SizeReference>
//         </ReferenceWrapper>
//       </InsideWrapper>
//     </Wrapper>
//   );
// };          ...  So basically from the FilterColorSize component, I want to
