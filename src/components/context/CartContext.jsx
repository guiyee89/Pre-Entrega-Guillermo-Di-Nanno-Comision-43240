import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"
//Creo el contexto del cart
import { createContext, useState } from "react";

//exportamos la variable que contiene la funcion createContext()
export const CartContext = createContext()

//Creo el componente proveedor del contexto
const CartContextProvider = ( {children} ) => {

    //Traemos los datos desde localStorage, los guardamos en cart, ejecutamos con setCart. O que traiga array vacio
    const [ cart , setCart ] = useState( JSON.parse(localStorage.getItem("cart")) || [] )

    //Funcion para detectar por "id" si ya existe un producto un cart
    const isInCart = (id) => {
        let exist = cart.some((product) => product.id === id);
        return exist
    }

    //AGREGAMOS COSAS AL CART
    const addToCart = (newProduct) => {
        let exist = isInCart(newProduct.id)
        //Si ya existe un producto en cart
        if (exist) {
            //entonces creo un nuevo array
            let newArray = cart.map((product) => {
                if(product.id === newProduct.id){
                    return {
                        ...product,
                        quantity: newProduct.quantity
                    };
                }else {
                    return product;
                }
            })
            //seteamos cart con nuevo arreglo
            setCart(newArray)
            localStorage.setItem("cart", JSON.stringify(newArray))

        }else {
            //si no se repite un producto, seteamos TODO lo del cart + nuevo producto
            setCart( [...cart,  newProduct] )
            localStorage.setItem("cart", JSON.stringify([...cart, newProduct]))
        }
    }


    //LIMPIAR EL CART
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
              //Para que no deje residuos en el localStorage. Es decir, un [] vacio
              localStorage.removeItem("cart")
            }
          });
    }

    //ELIMINAR PRODUCTO COMPLETO X ID
    const removeById

    //Almaceno la info y las funciones del context en el objeto "data" para retornarlo a sus children
    let data = {
        cart,
        addToCart
    }
}