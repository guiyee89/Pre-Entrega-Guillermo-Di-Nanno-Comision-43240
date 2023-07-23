import { useEffect, useState } from "react";

export const MultiFilter = ({ items, onFilterChange }) => {

  const [detailsFilters, setDetailsFilters] = useState({ //Guardamos detalles de filtro
    size: "",
    color: "",
    discount: "",
  });
  const [itemsFiltered, setItemsFiltered] = useState(items); //Traemos items de ItemListContainer y seteamos nuevos items filtrados
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);
  //checkear porq no esta itemsFiltered usado
  console.log(itemsFiltered) 

  const applyDetailsFilters = (items, filters) => {
    let filteredItems = items;
    if (filters.size) {
      filteredItems = filteredItems.filter((item) => {
        const sizeArray = item?.details?.size || []; // Checkea si details y details.size existe
        return sizeArray.includes(filters.size);
      });
    }
    if (filters.color) {
      filteredItems = filteredItems.filter((item) => {
        const colorArray = item?.details?.color || []; // Checkea si details y details.color existe
        return colorArray.includes(filters.color);
      });
    }
    if (filters.discount === "discount") {             // Checkea si filtro es = a "discount"
        filteredItems = filteredItems.filter((item) => { //Filtra para retornar item con "discount"
          return item?.discount !== undefined;
        });
      }
    return filteredItems;
  };


  useEffect(() => {
    if (hasAppliedFilters) { //Si ya hay items filtrados, que siga filtrando
      return;
    }
    const filteredItems = applyDetailsFilters(items, detailsFilters);
    setItemsFiltered(filteredItems); //Seteo los items filtrados
    
    onFilterChange(filteredItems);  // LLamo a onFilterChange function con los items filtrados para pasarlo a ItemListContainer
    
    setHasAppliedFilters(true); // Seteo que los items YA fueron filtrados
  }, [detailsFilters, items, hasAppliedFilters, onFilterChange]);

  const handleDetailsFilterChange = (filterName, value) => {
    setDetailsFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));

    setHasAppliedFilters(false); // Reseta hasAppliedFilters cuando seleccione nuevo filtro
  };

  return (
    <>
      {/* Size filter */}
      <select
        value={detailsFilters.size}
        onChange={(e) => handleDetailsFilterChange("size", e.target.value)}
      >
        <option value="">All Sizes</option>
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
      </select>

      {/* Color filter */}
      <select
        value={detailsFilters.color}
        onChange={(e) => handleDetailsFilterChange("color", e.target.value)}
      >
        <option value="">All Colors</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>

       {/* Dsicount filter */}
       <select
        value={detailsFilters.discount}
        onChange={(e) => handleDetailsFilterChange("discount", e.target.value)}
      >
        <option value="">All</option>
        <option value="discount">discount</option>
      </select>
    </>
  );
};


// const Wrapper = styled.div``;
// const BtnsContainer = styled.div``
// const Button = styled.button``