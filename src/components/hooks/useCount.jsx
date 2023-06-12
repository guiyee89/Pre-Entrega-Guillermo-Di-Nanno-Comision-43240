// Creamos Custom Hook para hacer Contador del carrito

import { useState } from "react";

export const useCount = (initial, stock, minimo = 1) => {

    const [ count, setCount ] = useState(initial)

    const increment = () => {
        if(count < stock) setCount(count + 1)
    }
    const decrement = () => {
        if(count > minimo) setCount(count - 1)
    }
    const reset = () => {
        setCount(initial)
    }

  return {count, increment, decrement, reset}
}
