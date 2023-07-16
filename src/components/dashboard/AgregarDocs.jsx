import { products } from "../../ProductsMock";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import styled from "styled-components/macro";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

export const AgregarDocs = () => {
  
  const [addProduct, setAddProduct] = useState(false);
  const [addDiscount, setAddDiscount] = useState(0)

  const rellenar = () => {
    let itemsCollections = collection(db, "products");
    products.forEach((elemento) => {
      addDoc(itemsCollections, elemento);
    });
  };

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      id: "",
      title: "",
      subtitle: "",
      price: "",
      discount:"",
      stock: "",
      description: "",
      category: "",
      img: "",
    },
    
    //Aca creamos la logica del submit
    onSubmit: async (values) => {
      const newItem = {
        ...values,
        id: parseInt(values.id),
        discount: parseInt(setAddDiscount(values.discount * values.price /100)),
        price: parseFloat(values.price - addDiscount),
        stock: parseInt(values.stock),
      };
      const ordersCollection = collection(db, "products");
      await addDoc(ordersCollection, newItem);
      setAddProduct(true);
      
      const getDiscount = () => {

      }
    },
    //que no se valide mientras escribo, sino al hacer submit
    // validateOnChange: false,
    // //validar los datos
    // validationSchema: Yup.object({
    //   name: Yup.string()
    //     .required("Este campo es obligatorio")
    //     .min(3, "Minimo 3 caracteres"),
    //   email: Yup.string()
    //     .email("Este campo no corresponde a un email valido")
    //     .required("Este campo es obligatorio"),
    //   phone: Yup.string()
    //     .required("Este campo es obligatorio")
    //     .min(10, "Debe contener 10 numeros")
    //     .max(15, "Debe contener 10 numeros"),
    // }),
  });
 

  return (
    <div>
      <button onClick={rellenar}>Rellenar Coleccion Entera</button>
      {addProduct ? (
        <SuccessMessage>Product added successfully!</SuccessMessage>
      ) : (
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Input
              label="Id"
              variant="outlined"
              name="id"
              onChange={handleChange}
              helperText={errors.id}
              error={errors.id ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Title"
              variant="outlined"
              name="title"
              onChange={handleChange}
              helperText={errors.title}
              error={errors.title ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Subtitle"
              variant="outlined"
              name="subtitle"
              onChange={handleChange}
              helperText={errors.subtitle}
              error={errors.subtitle ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Price"
              variant="outlined"
              name="price"
              onChange={handleChange}
              helperText={errors.price}
              error={errors.price ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Discount"
              variant="outlined"
              name="discount"
              onChange={handleChange}
              helperText={errors.discount}
              error={errors.discount ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Stock"
              variant="outlined"
              name="stock"
              onChange={handleChange}
              helperText={errors.stock}
              error={errors.stock ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Description"
              variant="outlined"
              name="description"
              onChange={handleChange}
              helperText={errors.description}
              error={errors.description ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Category"
              variant="outlined"
              name="category"
              onChange={handleChange}
              helperText={errors.category}
              error={errors.category ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Image"
              variant="outlined"
              name="img"
              onChange={handleChange}
              helperText={errors.img}
              error={errors.img ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <SubmitBtn type="submit">Agregar 1 Doc a Coleccion</SubmitBtn>
          </Form>
        </FormWrapper>
      )}
    </div>
  );
};
const FormWrapper = styled.div``;
const Form = styled.form``;
const Input = styled(TextField)``;
const SubmitBtn = styled.button``;
const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  text-align: center;
`;
