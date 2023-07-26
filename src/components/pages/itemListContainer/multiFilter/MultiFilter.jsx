import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";


export const MultiFilter = ({ items, onFilterChange }) => {
  const [detailsFilters, setDetailsFilters] = useState({
    size: '',
    color: '',
    discount: '',
  });

  const { categoryName } = useParams();

  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

  const applyDetailsFilters = (items, filters) => {
    let filteredItems = items;

    if (filters.size) {
      filteredItems = filteredItems.filter((item) => item.size === filters.size);
    }
    
    if (filters.color) {
      filteredItems = filteredItems.filter((item) => item.color === filters.color);
    }

    if (filters.discount === "discount") {
      filteredItems = filteredItems.filter((item) => item.discount !== undefined);
    }

    return filteredItems;
  };

  useEffect(() => {
    if (hasAppliedFilters) {
      return;
    }

    const filteredItems = applyDetailsFilters(items, detailsFilters);
    onFilterChange(filteredItems, detailsFilters);
    setHasAppliedFilters(true);
  }, [detailsFilters, items, hasAppliedFilters, onFilterChange]);

  const handleDetailsFilterChange = (filterName, value) => {
    setDetailsFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));

    setHasAppliedFilters(false);
  };


  return (
    <>
      {/* Size filter */}
      {categoryName === "shoes" ? (
        <SelectBtn
          value={detailsFilters.size}
          onChange={(e) => handleDetailsFilterChange("size", e.target.value)}
        >
          <option value="">All Sizes</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="44">44</option>
        </SelectBtn>
      ) : categoryName === "pants" || categoryName === "shirts" ? (
        // For "pants" and "shirts" categories, render string sizes options
        <SelectBtn
          value={detailsFilters.size}
          onChange={(e) => handleDetailsFilterChange("size", e.target.value)}
        >
          <option value="">All Sizes</option>
          <option value="s">Small</option>
          <option value="m">Medium</option>
          <option value="l">Large</option>
        </SelectBtn>
      ) : (
        // For "all products" and when categoryName is not defined, render both options
        <>
          {/* Numeric sizes */}
          <SelectBtn
            value={detailsFilters.size}
            onChange={(e) => handleDetailsFilterChange("size", e.target.value)}
          >
            <option value="">All Shoe Sizes</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="44">44</option>
          </SelectBtn>

          {/* String sizes */}
          <SelectBtn
            value={detailsFilters.size}
            onChange={(e) => handleDetailsFilterChange("size", e.target.value)}
          >
            <option value="">All Sizes</option>
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
          </SelectBtn>
        </>
      )}

      {/* Color filter */}
      <SelectBtn
        value={detailsFilters.color}
        onChange={(e) => handleDetailsFilterChange("color", e.target.value)}
      >
        <option value="">All Colors</option>
        <option value="white">White</option>
        <option value="grey">Grey</option>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
      </SelectBtn>

      {/* Discount filter */}
      <SelectBtn
        value={detailsFilters.discount}
        onChange={(e) => handleDetailsFilterChange("discount", e.target.value)}
      >
        <option value="">All</option>
        <option value="discount">Discount</option>
      </SelectBtn>
    </>
  );
};


const SelectBtn = styled.select`
  margin: 0 10px;
`