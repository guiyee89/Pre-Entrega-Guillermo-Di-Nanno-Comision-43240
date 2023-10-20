import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components/macro";
import { db, uploadFile } from "../../../../../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export const ProductsForm = ({
  filteredItems,
  setFilteredItems,
  selectedItem,
  setSelectedItem,
  handleClose,
}) => {
  const [addProduct, setAddProduct] = useState(false);
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [newProduct, setNewProduct] = useState({
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
  });

  ///////*****         HANDLE CHANGE        ******///////
  const handleChange = (e) => {
    // if (selectedItem) {
    //   setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
    // } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    // }
  };

  const handleImage = async () => {
    setIsLoading(true);
    // Create a set to store the names or unique identifiers of uploaded files
    const uploadedFileNames = new Set(newProduct.img);
    // Filter out files that are not already uploaded
    const newFiles = file.filter((selectedFile) => !uploadedFileNames.has(selectedFile.name));
    const imageUrlPromises = newFiles.map(async (selectedFile) => {
      // Initialize an array to store image URLs
      const imageUrl = await uploadFile(selectedFile);
      return imageUrl;
    });
  
    // Wait for all the uploads to complete
    const newImageUrls = await Promise.all(imageUrlPromises);
    // Combine the new image URLs with the previously uploaded images
    const updatedImageUrls = [...newProduct.img, ...newImageUrls];
  
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      img: updatedImageUrls,
    }));
  
    // Clear the files that have been successfully uploaded
    const newFilesList = file.filter((selectedFile) => uploadedFileNames.has(selectedFile.name));
    setFile(newFilesList);
    setIsLoading(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()

    let newItem = {
      ...newProduct,
      unit_price: +newProduct.unit_price,
      
    }

  }

  console.log(newProduct);
  
  //YUP VALIDATION
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
                defaultValue={selectedItem?.userId}
                onChange={handleChange}
                // helperText={errors.userId}
                // error={errors.userId ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Nombre del producto</h2>
              <Input
                label="Nombre del producto"
                variant="outlined"
                name="title"
                defaultValue={selectedItem?.title}
                onChange={handleChange}
                // helperText={errors.title}
                // error={errors.title ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Subtitulo del producto</h2>
              <Input
                label="Subtitulo del producto"
                variant="outlined"
                name="subtitle"
                defaultValue={selectedItem?.subtitle}
                onChange={handleChange}
                // helperText={errors.subtitle}
                // error={errors.subtitle ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Precio</h2>
              <Input
                label="Precio"
                variant="outlined"
                name="unit_price"
                defaultValue={selectedItem?.unit_price}
                onChange={handleChange}
                // helperText={errors.unit_price}
                // error={errors.unit_price ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Descuento en %</h2>
              <Input
                label="(solo agregar el numero, ej: 10 - 20)"
                variant="outlined"
                name="discount"
                defaultValue={selectedItem?.discount}
                onChange={handleChange}
                // helperText={errors.discount}
                // error={errors.discount ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Stock</h2>
              <Input
                label="Stock     (agregar cantidad)"
                variant="outlined"
                name="stock"
                defaultValue={selectedItem?.stock}
                onChange={handleChange}
                // helperText={errors.stock}
                // error={errors.stock ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Color</h2>
              <Input
                label="Color"
                variant="outlined"
                name="color"
                defaultValue={selectedItem?.color}
                onChange={handleChange}
                // helperText={errors.color}
                // error={errors.color ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Talle</h2>
              <Input
                label="(Ejemplo: s - m - l - 41 - 42 .. etc)"
                variant="outlined"
                name="size"
                defaultValue={selectedItem?.size}
                onChange={handleChange}
                // helperText={errors.size}
                // error={errors.size ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Descripción del producto</h2>
              <Input
                label="Descripción"
                variant="outlined"
                name="description"
                defaultValue={selectedItem?.description}
                onChange={handleChange}
                // helperText={errors.description}
                // error={errors.description ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Categoria del producto</h2>
              <Input
                label="Categoria"
                variant="outlined"
                name="category"
                defaultValue={selectedItem?.category}
                onChange={handleChange}
                // helperText={errors.category}
                // error={errors.category ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </Div>
            <Div>
              <h2>Imagen Principal</h2>
              <ImageDiv>
                <input
                  style={{ margin: "5px 0 20px" }}
                  name="img"
                  type="file"
                  // defaultValue={selectedItem?.img[""]}
                  multiple
                  //  onChange={(e) => setFile(e.target.files[0])}
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                  }}
                  // helperText={errors.img}
                  // error={errors.img ? true : false}
                  sx={{ marginBottom: "18px" }}
                />
                {file && (
                  <Button variant="outlined" onClick={handleImage}>
                    Ok
                  </Button>
                )}
              </ImageDiv>

              <h2>Imagen 2 (Opcional)</h2>
              <ImageDiv>
                <input
                  style={{ margin: "5px 0 20px" }}
                  type="file"
                  name="img"
                  multiple
                  // defaultValue={selectedItem?.img[1]}
                  // onChange={(e) => setFile(e.target.files[1])}
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                  }}
                  // helperText={errors.img}
                  // error={errors.img ? true : false}
                  sx={{ marginBottom: "8px" }}
                />
                {file && (
                  <Button variant="outlined" onClick={handleImage}>
                    Ok
                  </Button>
                )}
              </ImageDiv>

              <h2>Imagen 3 (Opcional)</h2>
              <ImageDiv>
                <input
                  style={{ margin: "5px 0 20px" }}
                  type="file"
                  name="img"
                  multiple
                  // defaultValue={selectedItem?.img[2]}
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                  }}
                  // helperText={errors.img}
                  // error={errors.img ? true : false}
                  sx={{ marginBottom: "8px" }}
                />
                {file && (
                  <Button variant="outlined" onClick={handleImage}>
                    Ok
                  </Button>
                )}
              </ImageDiv>

              <h2>Imagen 4 (Opcional)</h2>
              <ImageDiv>
                <input
                  style={{ margin: "5px 0 20px" }}
                  type="file"
                  name="img"
                  multiple
                  // defaultValue={selectedItem?.img[3]}
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                  }}
                  // helperText={errors.img}
                  // error={errors.img ? true : false}
                  sx={{ marginBottom: "8px" }}
                />
                {file && (
                  <Button variant="outlined" onClick={handleImage}>
                    Ok
                  </Button>
                )}
              </ImageDiv>

              <h2>Imagen 5 (Opcional)</h2>
              <ImageDiv>
                <input
                  style={{ margin: "5px 0 20px" }}
                  type="file"
                  name="img"
                  multiple
                  // defaultValue={selectedItem?.img[4]}
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                  }}
                  // helperText={errors.img}
                  // error={errors.img ? true : false}
                  sx={{ marginBottom: "8px" }}
                />
                {file && (
                  <Button variant="outlined" onClick={handleImage}>
                    Ok
                  </Button>
                )}
              </ImageDiv>
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
  color: #091209;
  font-weight: bold;
  text-align: center;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImageDiv = styled.div`
  display: flex;
`;
