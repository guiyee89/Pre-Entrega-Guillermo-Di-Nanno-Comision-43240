import { Button, TextField, fabClasses } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components/macro";
import { db, uploadFile } from "../../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const ProductsForm = ({}) => {
  const [addProduct, setAddProduct] = useState(false);
  const [file, setFile] = useState([]);

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      userId: "",
      title: "",
      subtitle: "",
      unit_price: "",
      discountPrice: "",
      stock: "",
      color: "",
      size: "",
      description: "",
      category: "",
      img: [],
      secondUnit: "",
    },

    //Aca creamos la logica del submit
    onSubmit: async (values) => {
      //Calculamos el descuento (si es que hay)
      const unitPrice = parseFloat(values.unit_price);
      const discount = parseFloat(values.discount);
      let totalPrice = unitPrice;

      // Initialize an array to store image URLs
      const imageUrlPromises = file.map(async (selectedFile) => {
        const imageUrl = await uploadFile(selectedFile);
        return imageUrl;
      });
      // Wait for all the uploads to complete
      const imageUrls = await Promise.all(imageUrlPromises);
      console.log("Image URLs:", imageUrls);


      //Agregamos propiedad "discount" (si lo hay) al objecto newItem
      if (discount) {
        const discountAmount = (unitPrice * discount) / 100;
        totalPrice -= discountAmount;
      }
      let newItem;
      if (discount) {
        newItem = {
          ...values,
          userId: parseInt(values.userId),
          unit_price: parseFloat(values.unit_price),
          discountPrice: totalPrice,
          stock: parseInt(values.stock),
          color: values.color,
          size: values.size,
          img: imageUrls,
          discount: discount, //Agregamos discount
        };
      } else {
        newItem = {
          ...values,
          userId: parseInt(values.userId),
          unit_price: totalPrice,
          stock: parseInt(values.stock),
          img: imageUrls,
          //quitamos discount
        };
      }

      const ordersCollection = collection(db, "products");
      await addDoc(ordersCollection, newItem);
      setAddProduct(true);
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
    <>
      {addProduct ? (
        <SuccessMessage>Product added successfully!</SuccessMessage>
      ) : (
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Div>
              <h2>ID del producto</h2>
              <Input
                label="ID"
                variant="outlined"
                name="userId"
                onChange={handleChange}
                helperText={errors.userId}
                error={errors.userId ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Nombre del producto</h2>
              <Input
                label="Nombre del producto"
                variant="outlined"
                name="title"
                onChange={handleChange}
                helperText={errors.title}
                error={errors.title ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Subtitulo del producto</h2>
              <Input
                label="Subtitulo del producto"
                variant="outlined"
                name="subtitle"
                onChange={handleChange}
                helperText={errors.subtitle}
                error={errors.subtitle ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Precio</h2>
              <Input
                label="Precio"
                variant="outlined"
                name="unit_price"
                onChange={handleChange}
                helperText={errors.unit_price}
                error={errors.unit_price ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Descuento en %</h2>
              <Input
                label="(solo agregar el numero, ej: 10 - 20)"
                variant="outlined"
                name="discount"
                onChange={handleChange}
                helperText={errors.discount}
                error={errors.discount ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Stock</h2>
              <Input
                label="Stock     (agregar cantidad)"
                variant="outlined"
                name="stock"
                onChange={handleChange}
                helperText={errors.stock}
                error={errors.stock ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Color</h2>
              <Input
                label="Color"
                variant="outlined"
                name="color"
                onChange={handleChange}
                helperText={errors.color}
                error={errors.color ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Talle</h2>
              <Input
                label="(Ejemplo: s - m - l - 41 - 42 .. etc)"
                variant="outlined"
                name="size"
                onChange={handleChange}
                helperText={errors.size}
                error={errors.size ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Descripción del producto</h2>
              <Input
                label="Descripción"
                variant="outlined"
                name="description"
                onChange={handleChange}
                helperText={errors.description}
                error={errors.description ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Categoria del producto</h2>
              <Input
                label="Categoria"
                variant="outlined"
                name="category"
                onChange={handleChange}
                helperText={errors.category}
                error={errors.category ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Imagen Principal</h2>
              <Input
                name="img"
                type="file"
                multiple
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                }}
                helperText={errors.img}
                error={errors.img ? true : false}
                sx={{ marginBottom: "18px" }}
              />
              <h2>Imagen 2 (Opcional)</h2>
              <Input
                type="file"
                name="img"
                multiple
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                }}
                helperText={errors.img}
                error={errors.img ? true : false}
                sx={{ marginBottom: "8px" }}
              />
              <h2>Imagen 3 (Opcional)</h2>
              <Input
                type="file"
                name="img"
                multiple
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                }}
                helperText={errors.img}
                error={errors.img ? true : false}
                sx={{ marginBottom: "8px" }}
              />
              <h2>Imagen 4 (Opcional)</h2>
              <Input
                type="file"
                name="img"
                multiple
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                }}
                helperText={errors.img}
                error={errors.img ? true : false}
                sx={{ marginBottom: "8px" }}
              />
              <h2>Imagen 5 (Opcional)</h2>
              <Input
                type="file"
                name="img"
                multiple
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                }}
                helperText={errors.img}
                error={errors.img ? true : false}
                sx={{ marginBottom: "8px" }}
              />
            </Div>
            <SubmitBtn
              type="submit"
              variant="contained"
              sx={{ margin: "20px auto" }}
            >
              Crear Producto
            </SubmitBtn>
          </Form>
        </FormWrapper>
      )}
    </>
  );
};

const FormWrapper = styled.div`
  width: 500px;
  max-height: 600px;
  overflow-y: auto;
`;
const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
`;
const Input = styled(TextField)`
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 12.5px 5px;
  }
`;

const SubmitBtn = styled(Button)`
  width: 60%;
`;
const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  text-align: center;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
