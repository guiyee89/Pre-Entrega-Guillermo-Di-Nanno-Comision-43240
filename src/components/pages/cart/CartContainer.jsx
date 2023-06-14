import { useNavigate } from "react-router-dom"
import { Cart } from "./Cart"

export const CartContainer = () => {

    const navigate = useNavigate()

    const realizarCompra = () => {
        console.log("compra realizada")
        navigate("/")
    }

  return <Cart realizarCompra={realizarCompra} />
}
