import { products } from "../../ProductsMock"
import { db } from "../../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import styled from "styled-components/macro";
import { TextField } from "@mui/material";

export const AgregarDocs = () => {

    const rellenar = () => {
        let itemsCollections = collection( db, "products" )
        products.forEach((elemento) => {
            addDoc( itemsCollections, elemento)
        })
    }

    const { handleSubmit, handleChange, errors } = useFormik({
      initialValues: {
        name: "",
        email: "",
        phone: "",
      },
      onSubmit: (data) => {
        //Aca creamos la logica del submit
        let order = {
          buyer: data, //la data de initialValues en onSubmit
          items: cart, //el cart de CartContext
          total: total, //el total del CartContext
        };
        //guardamos la orden en una variable
        let ordersCollection = collection(db, "orders");
        addDoc(ordersCollection, order) // usamos el metodo addDoc para guardar la orden
          .then((res) => setOrderId(res.id)); //guardamos el ID de la orden en el setOrderID
  
        //actualizar informacion del producto despues de la compra
        cart.forEach((product) => {
          updateDoc(doc(db, "products", product.id), {
            stock: product.stock - product.quantity,
          });
        });
      },
  
      //que no se valide mientras escribo, sino al hacer submit
      validateOnChange: false,
      //validar los datos
      validationSchema: Yup.object({
        name: Yup.string()
          .required("Este campo es obligatorio")
          .min(3, "Minimo 3 caracteres"),
        email: Yup.string()
          .email("Este campo no corresponde a un email valido")
          .required("Este campo es obligatorio"),
        phone: Yup.string()
          .required("Este campo es obligatorio")
          .min(10, "Debe contener 10 numeros")
          .max(15, "Debe contener 10 numeros"),
      }),
    });


  return (
    <div>
        <button onClick={rellenar}>Rellenar Coleccion Entera</button>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Input
              label="Name"
              variant="outlined"
              name="name"
              onChange={handleChange}
              helperText={errors.name}
              error={errors.name ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Confirm Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Phone"
              variant="outlined"
              name="phone"
              onChange={handleChange}
              helperText={errors.phone}
              error={errors.phone ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <SubmitBtn type="submit" onClick={handleSubmit}>
              Confirm Purchase
            </SubmitBtn>
          </Form>
        </FormWrapper>
        <button>Agregar 1 Doc a Coleccion</button>
    </div>
  )
}
const FormWrapper = styled.div`
`
const Form = styled.form`
`
const Input = styled(TextField)`
`

