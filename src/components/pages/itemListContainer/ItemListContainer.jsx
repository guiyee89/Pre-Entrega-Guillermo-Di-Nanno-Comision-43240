import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "./ItemList";
import { products } from "../../../ProductsMock";
import { LoaderContainer } from "../../common/loaders/LoaderContainer";
import { CartContext } from "../../context/CartContext";

export const ItemListContainer = () => {
  const [loading, setLoading] = useState(true);
  //Guardamos los items
  const [items, setItems] = useState([]);

  const { cart, addToCart } = useContext(CartContext);
  console.log(cart)

  //useParams de react-router-dom para filtrar productos por categoryName
  const { categoryName } = useParams();

  //Funcion con useEffect para filtrar productos
  useEffect(() => {
    //seteamos loader en true
    setLoading(true);
    const productosFiltrados = products.filter(
      (product) => product.category === categoryName
    );

    //Promesa para que se resuelva que tipo de productos mostrar
    const productosPromesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(categoryName ? productosFiltrados : products);
        reject;
      }, 200);

      //Una vez resuelto, mostrar dichos productos
    });
    productosPromesa
      .then((response) => {
        setItems(response);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    //Cierro con arreglo de dependencia para ejectuar cada vez que cambie "categoryName"
  }, [categoryName]);

  const onAdd = (newItem) => {
    const quantity = 1;
    const totalPrice = newItem.price * quantity;
    
    const existingCartItem = cart.find((item) => item.id === newItem.id);
  
    if (existingCartItem) {
      // If the item is already in the cart, update its quantity
      const updatedItems = cart.map((item) =>
        item.id === newItem.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      addToCart(updatedItems);
    } else {
      // If the item is not in the cart, add it as a new item
      const productData = {
        ...newItem,
        quantity: quantity,
        totalPrice: totalPrice,
      };
      addToCart(productData);
    }
  };
  
  
  

  //Rendering condicional
  return (
    <div>
      {loading ? <LoaderContainer /> : <ItemList items={items} onAdd={onAdd} />}
    </div>
  );
};
