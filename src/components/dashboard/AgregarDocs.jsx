import { db } from "../../firebaseConfig"
import { products } from "../../productsMock"
import { addDoc, collection } from "firebase/firestore"

export const AgregarDocs = () => {

    const rellenar = () => {
        let itemsCollections = collection( db, "products" )
        products.forEach((elemento) => {
            addDoc( itemsCollections, elemento)
        })
    }


  return (
    <div>
        <button onClick={rellenar}>Rellenar coleccion</button>
    </div>
  )
}
