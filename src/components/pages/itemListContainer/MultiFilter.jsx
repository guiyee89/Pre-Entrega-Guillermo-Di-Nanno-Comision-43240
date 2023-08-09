import { useEffect, useState } from "react";
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
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);
  const [detailsFilters, setDetailsFilters] = useState({
    category: "",
    size: "",
    color: "",
    orderBy: "",
  });

  //////////           ////////////           ////////////           ///////////
  //      MAPING COLORS, SIZE, CATEGORIES AND QUANTITY FOR EACH FILTER        //

  //-------    COLOR MAPING   -------//
  const uniqueColors = Array.from(new Set(items.map((item) => item.color))); //Find all the colors
  const colorUserMap = {}; //Track unique colors
  items.forEach((item) => {
    if (!colorUserMap[item.color]) {
      // Iterate through the items to populate the colorUserMap
      colorUserMap[item.color] = new Set();
    }
    colorUserMap[item.color].add(item.userId); // Add the "userId" property to set that color
  });

  const colorQuantityMap = {}; // Create a colorQuantityMap. Filter quantity of color by "userId" of items
  Object.keys(colorUserMap).forEach((color) => {
    const userSet = colorUserMap[color];
    colorQuantityMap[color] = userSet.size;
  });

  //-------    SIZE MAPING   -------//
  const uniqueSizes = Array.from(new Set(items.map((item) => item.size)));
  const sizeUserMap = {};
  items.forEach((item) => {
    if (!sizeUserMap[item.size]) {
      sizeUserMap[item.size] = new Set();
    }
    sizeUserMap[item.size].add(item.userId);
  });

  const sizeQuantityMap = {};
  Object.keys(sizeUserMap).forEach((size) => {
    const userSet = sizeUserMap[size];
    sizeQuantityMap[size] = userSet.size;
  });

  //-------    CATEGORY MAPING   -------//
  const uniqueCategory = Array.from(
    new Set(items.map((item) => item.category))
  );
  const categoryUserMap = {};
  items.forEach((item) => {
    if (!categoryUserMap[item.category]) {
      categoryUserMap[item.category] = new Set();
    }
    categoryUserMap[item.category].add(item.userId);
  });

  //////////           ////////////           ////////////           ///////////
  //                     FILTERING LOGIC FOR ALL ITEMS                       //
  const applyDetailsFilters = (items, filters) => {
    let filteredItems = items;

    if (filters.category && filters.category.length > 0) {
      // category
      filteredItems = filteredItems.filter((item) =>
        filters.category.includes(item.category)
      );
    }
    if (filters.size && filters.size.length > 0) {
      //size
      filteredItems = filteredItems.filter((item) =>
        filters.size.includes(item.size)
      );
    }
    if (filters.color && filters.color.length > 0) {
      // color
      filteredItems = filteredItems.filter((item) =>
        filters.color.includes(item.color)
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

        {/* Category filter */}
        <FormControl sx={mainStyle}>
          <InputLabel
            id="category-select-label"
            sx={{
              paddingLeft: "10px",
              fontSize: "1.1rem",
              "&.Mui-focused": {
                color: "#b26507",
              },
            }}
          >
            Categories
          </InputLabel>
          <Select
            sx={{
              ...selectStyle,
              "&.Mui-focused": {
                borderBottomColor: "black",
                textTransform:"capitalize" 
              },
            }}
            MenuProps={MenuProps}
            multiple
            labelId="category-select-label"
            id="category-select"
            value={detailsFilters.category || []}
            onChange={(e) =>
              handleDetailsFilterChange("category", e.target.value)
            }
            input={<OutlinedInput label="Categories" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {uniqueCategory.map((category, index) => (
              <MenuItem key={index} value={category}>
                <Checkbox
                  checked={detailsFilters.category.includes(category)}
                />
                <ListItemText
                  sx={{ textTransform: "capitalize" }}
                  primary={category}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sizes filter */}
        <FormControl sx={mainStyle}>
          <InputLabel
            id="size-select-label"
            sx={{
              paddingLeft: "25px",
              fontSize: "1.1rem",
              "&.Mui-focused": {
                color: "#b26507", // Change to your desired color
              },
            }}
          >
            Sizes
          </InputLabel>
          <Select
            sx={{
              ...selectStyle,
              "&.Mui-focused": {
                borderBottomColor: "black",
                textTransform:"capitalize" 
              },
            }}
            MenuProps={MenuProps}
            labelId="size-select-label"
            id="size-select"
            multiple
            value={detailsFilters.size || []} // Ensure detailsFilters.size is an array
            onChange={(e) => handleDetailsFilterChange("size", e.target.value)}
            input={<OutlinedInput label="Sizes" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {uniqueSizes
              .sort((a, b) => {
                // Custom sorting logic to order sizes as desired
                const sizeOrder = { xs: 1, s: 2, m: 3, l: 4, xl: 5 };
                const aOrder = sizeOrder[a] || parseInt(a, 10) || 9999;
                const bOrder = sizeOrder[b] || parseInt(b, 10) || 9999;
                return aOrder - bOrder;
              })
              .map((size, index) => (
                <MenuItem key={index} value={size}>
                  <Checkbox checked={detailsFilters.size.includes(size)} />
                  <ListItemText
                    primary={`${size} (${sizeQuantityMap[size] || 0})`}
                    sx={{ textTransform: "uppercase" }}
                  />
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {/* Color filter */}
        <FormControl sx={mainStyle}>
          <InputLabel
            id="color-select-label"
            sx={{
              fontSize: "1.1rem",
              paddingLeft: "25px",
              "&.Mui-focused": {
                color: "#b26507",
              },
            }}
          >
            Colors
          </InputLabel>
          <Select
            sx={{
              ...selectStyle,
              "&.Mui-focused": {
                borderBottomColor: "black",
                textTransform:"capitalize" 
              },
            }}
            MenuProps={MenuProps}
            labelId="color-select-label"
            id="color-select"
            multiple
            value={detailsFilters.color || []} // Ensure detailsFilters.color is an array
            onChange={(e) => handleDetailsFilterChange("color", e.target.value)}
            input={<OutlinedInput label="Colors" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {uniqueColors.map((color, index) => (
              <MenuItem key={index} value={color}>
                <Checkbox checked={detailsFilters.color.includes(color)} />
                <ListItemText
                  sx={{ textTransform: "capitalize" }}
                  primary={`${color} (${colorQuantityMap[color] || 0})`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterWrapper>

      {/* General filter */}
     
      <FormControl sx={orderStyle} >
        <InputLabel
          id="order-by-select-label"
          sx={{
            fontSize: "1.1rem",
            fontWeight:"bold",
            paddingLeft: "10px",
            color:"black",
            "&.Mui-focused": {
              color: "#b26507",
            },
          }}
        >
          Order by
        </InputLabel>
        <Select
          labelId="order-by-select-label"
          id="order-by-select"
          value={detailsFilters.orderBy || ""}
          onChange={(e) => handleDetailsFilterChange("orderBy", e.target.value)}
          input={<OutlinedInput label="Order by" />}
          sx={{
            ...selectStyle,
            "&.Mui-focused": {
              borderBottomColor: "black",
              textTransform:"capitalize" 
            },
          }}
        >
          <MenuItem value="discount">Discount</MenuItem>
          <MenuItem value="lowPrice">Lower Price</MenuItem>
          <MenuItem value="highPrice">Higher Price</MenuItem>
        </Select>
      </FormControl>
     
    </>
  );
};

const FilterWrapper = styled.div`
  display: flex;
  width: 65%;
  max-width: 800px;
  align-items: center;
  padding-bottom: 8px;
`;

const FilterBy = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 10px;
  margin-bottom: -10px;
  min-width: 86px;
`;

//MATERIAL UI STYLES
const mainStyle = {
  m: 1,
  minWidth: 150,
  width: 205,
  "& .css-u1gz39-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#2a1d1d",
      borderWidth: "1px",
    },
  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
    {
      textTransform: "capitalize",
    },
};
const selectStyle = {
  m: 1,
  height: 35,
  borderBottom: "solid 0 gray",
  "& .MuiOutlinedInput-notchedOutline": {
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    transition: "border-color 10000.3s ease-in-out",
    borderColor: "grey",
  },
};
const orderStyle = {
  m: 1,
  minWidth: 150,
  width: 160,
  paddingBottom: "7px",
  "& .css-u1gz39-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#2a1d1d",
      borderWidth: "1px",
    },
  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
    {
      textTransform: "capitalize",
    },
}
//Material UI
const ITEM_HEIGHT = 78;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 220,
      overflow: scrollX,
    },
  },
};

