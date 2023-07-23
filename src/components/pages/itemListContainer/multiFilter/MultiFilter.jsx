import { useEffect, useState } from "react";
import styled from "styled-components/macro";


export const MultiFilter = ({ items, onFilterChange }) => {

  const [detailsFilters, setDetailsFilters] = useState({ // Guardamos detalles de filtro
    size: '',
    color: '',
    discount: "",
  });

  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);
   
  const applyDetailsFilters = (items, filters) => {// Condicionales de filtros
    let filteredItems = items;
    if (filters.size) {
      filteredItems = filteredItems.filter((item) => {
        const sizeArray = item?.details?.size || [];// Checkea si details y details.size existe
        return sizeArray.includes(filters.size);
      });
    }
    if (filters.color) {
      filteredItems = filteredItems.filter((item) => {
        const colorArray = item?.details?.color || [];// Checkea si details y details.color existe
        return colorArray.includes(filters.color);
      });
    }
    if (filters.discount === "discount") { // Checkea si filtro es = a "discount"
        filteredItems = filteredItems.filter((item) => {// Filtra para retornar item con "discount"
          return item?.discount !== undefined;
        });
      }
    return filteredItems;
  };


  useEffect(() => {  // Seteo de filtros
    if (hasAppliedFilters) {// Si ya hay items filtrados, que siga filtrando
      return;
    }
    const filteredItems = applyDetailsFilters(items, detailsFilters);
    onFilterChange(filteredItems, detailsFilters);
    setHasAppliedFilters(true);
  }, [detailsFilters, items, hasAppliedFilters, onFilterChange]);


  const handleDetailsFilterChange = (filterName, value) => {// handleEvent para guardar cada evento de filtro
    setDetailsFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));

    setHasAppliedFilters(false); // Reseta hasAppliedFilters cuando seleccione nuevo filtro
  };

  return (
    <>
      {/* Size filter */}
      <SelectBtn
        value={detailsFilters.size}
        onChange={(e) => handleDetailsFilterChange("size", e.target.value)}
      >
        <option value="">All Sizes</option>
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
      </SelectBtn>

      {/* Color filter */}
      <SelectBtn
        value={detailsFilters.color}
        onChange={(e) => handleDetailsFilterChange("color", e.target.value)}
      >
        <option value="">All Colors</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </SelectBtn>

       {/* Dsicount filter */}
       <SelectBtn
        value={detailsFilters.discount}
        onChange={(e) => handleDetailsFilterChange("discount", e.target.value)}
      >
        <option value="">All</option>
        <option value="discount">discount</option>
      </SelectBtn>
    </>
  );
};

const SelectBtn = styled.select`
  margin: 0 10px;
`