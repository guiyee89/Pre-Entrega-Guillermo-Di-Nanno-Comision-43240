import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
//Creo el contexto del cart
import { createContext, useState } from "react";
//exportamos la variable que contiene la funcion createContext()
export const CartContext = createContext();

//*********************************************//
//CREO EL COMPONENTE PROVEEDOR DEL "CONTEXT"
const CartContextProvider = ({ children }) => {
  //Traemos los datos desde "localStorage", los guardamos en "cart", ejecutamos con "setCart". O que traiga "array vacio"
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  console.log(cart);

  //Funcion para detectar por "id" si ya existe un producto un "cart"
  const isInCart = (id) => {
    let exist = cart.some((product) => product.id === id);
    return exist;
  };

  //Funcion para agregar productos al carrito en base ID, Quantity y Stock
  const addToCart = (newProduct) => {
    // Si ya existe un producto en "cart"
    let exist = isInCart(newProduct.id);
    if (exist) {
      // Crear un nuevo array con los elementos actualizados
      let newArray = cart.map((product) => {
        //Si el ID coincide entonces que sume cantidades
        if (product.id === newProduct.id) {
          const newQuantity = product.quantity + newProduct.quantity;
          //Si la cantidad es igual que el stock, que deje de sumar cantidades
          if (newQuantity <= newProduct.stock) {
            return {
              ...product,
              quantity: newQuantity,
            };
          } else {
            console.log("Insufficient stock");
          }
        }
        return product;
      });
      // Actualizar el estado del carrito y el localStorage con el nuevo array
      setCart(newArray);
      localStorage.setItem("cart", JSON.stringify(newArray));
    } else {
      // Reemplazar el array del carrito con un nuevo array que incluye el nuevo producto
      let newCart = [...cart, newProduct];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  //LIMPIAR EL "CART"
  const clearCart = () => {
    Swal.fire({
      title: "Are you sure you want to delete all?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setCart([]);
        //Para que no deje residuos en el localStorage. Es decir, un "[] vacio"
        localStorage.removeItem("cart");
      }
    });
  };

  //ELIMINAR PRODUCTO COMPLETO X "ID"
  const removeById = (id) => {
    let newArray = cart.filter((product) => product.id !== id);
    setCart(newArray);
    localStorage.setItem("cart", JSON.stringify(newArray));
  };

  const removeQuantity = (id) => {
    let exist = isInCart(id);
    //Si el producto existe en "cart"
    if (exist) {
      //Creamos "nuevo arreglo"
      let newArray = cart.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        } else {
          return product;
        }
      });
      //Eliminar completamente del "cart" si su "quantity" llega a 0
      newArray = newArray.filter((product) => product.quantity > 0);
      setCart(newArray);
      localStorage.setItem("cart", JSON.stringify(newArray));
    }
  };

  //IDETIFICO "QUANTITY" PARA QUE SE MANTENGA EN TODAS LAS "RUTAS/PAGES"
  const getTotalQuantityById = (id) => {
    let productos = cart.find((producto) => producto.id === +id); //Traemos de useParams()
    return productos?.quantity;
  };

  //MOSTRAR CANTIDAD DE PRODUCTOS EN "BADGE" DEL "CART"
  const getTotalItems = () => {
    let total = cart.reduce((accumulator, element) => {
      return accumulator + element.quantity;
    }, 0);
    return total;
  };

  //CALCULAR PRECIO TOTAL DE LOS ELEMENTOS EN "CART"
  const getTotalPrice = () => {
    let total = cart.reduce((acc, element) => {
      return acc + element.quantity * element.price;
    }, 0);
    return total;
  };

  //Almaceno la info y las funciones del context en el objeto "data" para retornarlo a sus children
  let data = {
    cart,
    addToCart,
    clearCart,
    removeById,
    getTotalQuantityById,
    removeQuantity,
    getTotalItems,
    getTotalPrice,
  };

  //PROVEEMOS A LOS "CHILDREN" CON LA "DATA" DEL "CARTCONTEXT"
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};
export default CartContextProvider;
