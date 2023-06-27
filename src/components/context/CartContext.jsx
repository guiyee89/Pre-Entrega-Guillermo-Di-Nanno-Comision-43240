import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"

import { createContext, useState } from "react";

export const CartContext = createContext()

const CartContextProvider = ( {children} ) => {

    const [ cart , setCart ] = useState( JSON.parse(localStorage.getItem("cart")) || [] )
 
    const isInCart = (id) => {
        let exist = cart.some((product) => product.id === id);
        return exist
    }

    const addToCart = (newProduct) => {
        let exist = isInCart(newProduct.id)
        if (exist) {
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
            setCart(newArray)
            localStorage.setItem("cart", JSON.stringify(newArray))
        }else {
            setCart( [...cart,  newProduct] )
            localStorage.setItem("cart", JSON.stringify([...cart, newProduct]))
        }
    }

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
            
              localStorage.removeItem("cart")
            }
          });
    }

    const removeById

    let data = {
        cart,
        addToCart
    }
}