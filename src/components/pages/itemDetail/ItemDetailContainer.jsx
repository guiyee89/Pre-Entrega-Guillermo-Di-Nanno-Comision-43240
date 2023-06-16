import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../ProductsMock";
import { ItemDetail } from "./ItemDetail";

export const ItemDetailContainer = () => {
  //Guardamos los items (objetos)
  const [selectedItem, setSelectedItem] = useState({});
  console.log(selectedItem);
  const { id } = useParams();

  useEffect(() => {
    const itemId = products.find((product) => product.id === +id); // o Number.id

    const productId = new Promise((resolve) => {
      resolve(itemId);
    });
    productId
      .then((resolve) => setSelectedItem(resolve))
      .catch((error) => console.log(error));
  }, [id]);

  console.log(selectedItem);

  return <ItemDetail selectedItem={selectedItem} id={id}/>;
};
