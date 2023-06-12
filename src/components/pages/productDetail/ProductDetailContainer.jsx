import { useState, useEffect } from "react"
import { ProductDetail } from "./ProductDetail"
import { useParams } from "react-router-dom"
import { products } from "../../ProductsMock"



export const ProductDetailContainer = () => {

    //Guardamos los items (objetos)
    const [selectedItem, setSelectedItem] = useState({})

    const { id } = useParams()

    useEffect(() => {
        const itemId = products.find((product) => product.id === +id)// o Number.id

        const productId = new Promise((resolve) => {
            resolve(itemId)
        })
        productId
            .then((resolve) => setSelectedItem(resolve))
            .catch((error) => console.log(error))
    }, [id])

  return <ProductDetail selectedItem={selectedItem}/>
}
