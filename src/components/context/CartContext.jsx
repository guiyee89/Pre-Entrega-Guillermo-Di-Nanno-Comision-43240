import "sweetalert2/dist/sweetalert2.css";
//Creo el contexto del cart
import { createContext, useState } from "react";
import { toast } from "react-toastify";
// import Swal from "sweetalert2";


//exportamos la variable que contiene la funcion createContext()
export const CartContext = createContext();

//*********************************************//
//CREO EL COMPONENTE PROVEEDOR DEL "CONTEXT"
const CartContextProvider = ({ children }) => {
  
  //Traemos los datos desde "localStorage", los guardamos en "cart", ejecutamos con "setCart". O que traiga "array vacio"
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  
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
            //Toastify success
            notifySuccess();
            //retornamos productos con nuevas cantidades
            return {
              ...product,
              quantity: newQuantity,
            };
            //sino notificamos falta de stock
          } else {
            //Toastify warn
            notifyMaxStock();
          }
        }
        return product;
      });
      // Actualizar el estado del carrito y el localStorage con el nuevo array
      setCart(newArray);
      localStorage.setItem("cart", JSON.stringify(newArray));
    } else {
      //Toastify success
      notifySuccess();
      // Reemplazar el array del carrito con un nuevo array que incluye el nuevo producto
      setCart([...cart, newProduct]);
      localStorage.setItem("cart", JSON.stringify([...cart, newProduct]));
    }
  };

  //Funcion "toastify" para producto agregado exitosamente
  const notifySuccess = () => {
    toast
      .promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 900);
        }),
        {
          pending: "Adding to Cart...",
          success: "Added successfully!",
          error: "Error on adding product!",
        }
      )
      .then(() => {
        
      })
      .catch((error) => {
        return error
      });
  };

  //Funcion "toastify" para producto con stock maxeado
  const notifyMaxStock = () => {  
    toast
      .promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        }),
        {
          pending: "Adding to Cart...",
        }
      )
      .then(() => {
        toast.warn("Max stock reached!");
        
      })
      .catch((error) => {
        toast.error("Error on adding product!");
        return error
      });
  };

  //Limpiar todo el carrito
  const clearCart = () => {
    // Swal.fire({
    //   title: "Are you sure you want to delete all?",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire("Deleted!", "Your file has been deleted.", "success");
    setCart([]);
    //Para que no deje residuos en el localStorage. Es decir, un "[] vacio"
    localStorage.removeItem("cart");
    //   }
    // });
  };

  //Eliminar producto entero por id
  const removeById = (id) => {
    let newArray = cart.filter((product) => product.id !== id);
    setCart(newArray);
    localStorage.setItem("cart", JSON.stringify(newArray));
  };

  //Restar cantidad desde CartContainer
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

  //Sumamos cantidad desde CartContainer
  const addQuantity = (id) => {
    let exist = isInCart(id);
    //Si el producto existe en "cart"
    if (exist) {
      //Creamos "nuevo arreglo"
      let newArray = cart.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1,
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

  //Mostrar cantidad de productos en "badge"
  const getTotalItems = () => {
    let total = cart.reduce((accumulator, element) => {
      return accumulator + element.quantity;
    }, 0);
    return total;
  };

  //Mostrar precio total por Item
  const getItemPrice = (id) => {
    const exist = cart.some((product) => product.id === id);
    if (exist) {
      const total = cart.reduce((acc, ele) => {
        if (ele.id === id) {
          return acc + ele.quantity * ele.price;
        }
        return acc;
      }, 0);
      return total;
    }
    //para q no muestre NaN si no se encuentra
    return 0;
  };

  //Calcular precio total de los elementos en cart
  const getTotalPrice = () => {
    let total = cart.reduce((acc, element) => {
      console.log(element)
      console.log(acc)
      return acc + element.quantity * element.price;
    }, 0);
    return total;
  };

  //(No es usada en esta app)
  //Identifico Quantity para que se mantenga la cantidad en todas las rutas / pages
  const getTotalQuantityById = (id) => {
    let productos = cart.find((producto) => producto.id === id); //Traemos de useParams()
    return productos?.quantity;
  };

  //Almaceno la info y las funciones del context en el objeto "data" para retornarlo a sus children
  let data = {
    cart,
    addToCart,
    clearCart,
    removeById,
    getTotalQuantityById,
    removeQuantity,
    addQuantity,
    getTotalItems,
    getItemPrice,
    getTotalPrice,
  };

  //PROVEEMOS A LOS "CHILDREN" CON LA "DATA" DEL "CARTCONTEXT"
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};
export default CartContextProvider;
