import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Select from "@mui/material/Select";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
} from "@mui/material";

export const MultiFilter = ({ items, onFilterChange }) => {
  //////////           ////////////           ////////////           ///////////
  //                       STATE FOR DIFFERENT FILTERS                        //
  const [detailsFilters, setDetailsFilters] = useState({
    category: "",
    size: "",
    color: "",
    orderBy: "",
  });
  const { categoryName } = useParams();
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

  //////////           ////////////           ////////////           ///////////
  //                MAPING COLORS AND QUANTITY OF THAT COLOR                  //
  const uniqueColors = Array.from(new Set(items.map((item) => item.color))); //Find all the colors

  const colorUserMap = {}; //Track unique colors

  items.forEach((item) => {
    // Iterate through the items to populate the colorUserMap
    if (!colorUserMap[item.color]) {
      colorUserMap[item.color] = new Set();
    }
    colorUserMap[item.color].add(item.userId); // Add the "userId" property to set that color
  });

  const colorQuantityMap = {}; // Create a colorQuantityMap. Filter quantity of color by "userId" of items
  Object.keys(colorUserMap).forEach((color) => {
    const userSet = colorUserMap[color];
    colorQuantityMap[color] = userSet.size;
  });

  //////////           ////////////           ////////////           ///////////
  //                     FILTERING LOGIC FOR ALL ITEMS                       //
  const applyDetailsFilters = (items, filters) => {
    let filteredItems = items;
    if (filters.category) {
      //category
      filteredItems = filteredItems.filter(
        (item) => item.category === filters.category
      );
    }
    if (filters.size) {
      //size
      filteredItems = filteredItems.filter(
        (item) => item.size === filters.size
      );
    }
    // if (filters.color) {
    //   //color
    //   filteredItems = filteredItems.filter(
    //     (item) => item.color === filters.color
    //   );
    // }
    if (filters.color && filters.color.length > 0) {
      // color
      filteredItems = filteredItems.filter(
        (item) => filters.color.includes(item.color)
      );
    } 
    if (filters.orderBy === "discount") {
      //discount
      filteredItems = filteredItems.filter(
        (item) => item.discount !== undefined
      );
    }
    if (filters.orderBy === "lowPrice") {
      //lower price
      filteredItems.sort((a, b) => {
        const priceA = "discountPrice" in a ? a.discountPrice : a.price;
        const priceB = "discountPrice" in b ? b.discountPrice : b.price;
        return priceA - priceB;
      });
    } else if (filters.orderBy === "highPrice") {
      //higher price
      filteredItems.sort((a, b) => {
        const priceA = "discountPrice" in a ? a.discountPrice : a.price;
        const priceB = "discountPrice" in b ? b.discountPrice : b.price;
        return priceB - priceA;
      });
    }
    return filteredItems;
  };

  //Handle each filter change
  const handleDetailsFilterChange = (filterName, value) => {
    setDetailsFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setHasAppliedFilters(false);
  };

  //Apply filters. Pass the value to ItemList component -> onFilterChange
  useEffect(() => {
    if (hasAppliedFilters) {
      return;
    }
    const filteredItems = applyDetailsFilters(items, detailsFilters);
    onFilterChange(filteredItems, detailsFilters);
    setHasAppliedFilters(true);
  }, [detailsFilters, items, hasAppliedFilters, onFilterChange]);

  //////////           ////////////           ////////////           ///////////
  return (
    <>
      <FilterWrapper>
        <FilterBy>Filter by :</FilterBy>
        {/* Size filter */}
        {categoryName === "shoes" ? (
          <FilterDetailsBtn
            value={detailsFilters.size}
            onChange={(e) => handleDetailsFilterChange("size", e.target.value)}
          >
            <option value="">Shoe Sizes</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
          </FilterDetailsBtn>
        ) : categoryName === "pants" || categoryName === "shirts" ? (
          // For "pants" and "shirts" categories, render string sizes options
          <FilterDetailsBtn
            value={detailsFilters.size}
            onChange={(e) => handleDetailsFilterChange("size", e.target.value)}
          >
            <option value="">Sizes</option>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
          </FilterDetailsBtn>
        ) : (
          // For "all products" and when categoryName is not defined, render both options
          <>
            {/* Category filter */}
            <FilterDetailsBtn
              value={detailsFilters.category}
              onChange={(e) =>
                handleDetailsFilterChange("category", e.target.value)
              }
            >
              <option value="">Categories</option>
              <option value="pants">Pants</option>
              <option value="shirts">Shirts</option>
              <option value="shoes">Shoes</option>
            </FilterDetailsBtn>
            {/* Numeric sizes */}
            <FilterDetailsBtn
              value={detailsFilters.size}
              onChange={(e) =>
                handleDetailsFilterChange("size", e.target.value)
              }
            >
              <option value="">Shoe Sizes</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
            </FilterDetailsBtn>

            {/* String sizes */}
            <FilterDetailsBtn
              value={detailsFilters.size}
              onChange={(e) =>
                handleDetailsFilterChange("size", e.target.value)
              }
            >
              <option value="">Sizes</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
            </FilterDetailsBtn>
          </>
        )}

        {/* Color filter */}
        {/* <FilterDetailsBtn
          value={detailsFilters.color}
          onChange={(e) => handleDetailsFilterChange("color", e.target.value)}
        >
          <ColorOption value="">Colors</ColorOption>
          {uniqueColors.map((color, index) => (
            <ColorOption key={index} value={color} index={index}>
              {`${color}  (${colorQuantityMap[color] || 0})`}
            </ColorOption>
          ))}
        </FilterDetailsBtn> */}
        <FormControlx sx={{ m: 1, minWidth: 128, width: 165 }}>
          <InputLabel id="color-select-label">Colors</InputLabel>
          <Select
            labelId="color-select-label"
            id="color-select"
            multiple
            value={detailsFilters.color || []} // Ensure detailsFilters.color is an array
            onChange={(e) => handleDetailsFilterChange("color", e.target.value)}
            input={<OutlinedInput label="Colors" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {uniqueColors.map((color, index) => (
              <MenuItem key={index} value={color}>
                <Checkbox checked={detailsFilters.color.includes(color)} />
                <ListItemText
                  primary={`${color} (${colorQuantityMap[color] || 0})`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControlx>
      </FilterWrapper>

      {/* Discount filter */}
      <GeneralFilterBtn
        value={detailsFilters.orderBy}
        onChange={(e) => handleDetailsFilterChange("orderBy", e.target.value)}
      >
        <option value="">Order by</option>
        <option value="discount">Discount</option>
        <option value="lowPrice">Lower Price</option>
        <option value="highPrice">Higher Price</option>
      </GeneralFilterBtn>
    </>
  );
};

const FilterWrapper = styled.div`
  display: flex;
  width: 65%;
  max-width: 800px;
  align-items: center;
`;
const FilterDetailsBtn = styled.select`
  margin: 0 10px;
  border: 1px #c6bdbd solid;
  border-top: none;
  border-left: none;
  width: 130px;
  min-width: 110px;
  margin: 0px 16px;
  border-bottom-right-radius: 8px;
  justify-content: center;
  background-color: rgb(243, 239, 239);
  text-transform: capitalize;
`;

const GeneralFilterBtn = styled.select`
  border-right: 1px solid rgb(198, 189, 189);
  border-bottom: 1px solid rgb(198, 189, 189);
  border-image: initial;
  border-top: none;
  border-left: none;
  width: 134px;
  margin: 0px 30px;
  border-bottom-right-radius: 8px;
  font-weight: 600;
  background-color: rgb(243, 239, 239);
`;
const FilterBy = styled.p`
  font-weight: bold;
  margin-right: 10px;
  min-width: 78px;
`;

//MATERIAL UI STYLES
const FormControlx = styled(FormControl)`
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input{
    padding: 5px;
  }
  .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root{
    top: -10px;
  }
  .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root{//label
    font-weight: 500;
    font-size: 1.1rem;
    padding-left: 15px;
  }
  .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root{
    left: 37px;
    top: -8px;
   
  }
  .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {//label focus
    color: #977a75;
    left: 37px;
    top: -8px;
    
}
  .css-1d3z3hw-MuiOutlinedInput-notchedOutline{//border outer
    border-color: rgb(67 34 11 / 75%);
  }
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {//border active
    border-color: #744924;
    border-width: 2px;
}
  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {//border
    border-top: none;
    border-left: none;
    border-right: none;
    border-right-width: 3px;
    border-bottom-width: 2px;
  }
  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root{
    border-radius: 12px;
  }
`
//Material UI
const ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 220,

    },
  },
};