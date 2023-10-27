import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components/macro";
import { db, uploadFile } from "../../../../../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export const ProductsForm = ({
  selectedItem,
  setSelectedItem,
  handleClose,
  setIsChanged,
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
    img: "",
    secondUnit: "",
  });

  ///////*****         HANDLE CHANGE        ******///////
  const handleChange = (e) => {
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };
  ///////*****         HANDLE IMAGE        ******///////
  // const handleImage = async () => {
  //   setIsLoading(true);
  //   // Create a set to store the names or unique identifiers of uploaded files
  //   const uploadedFileNames = new Set(newProduct.img);
  //   console.log(uploadedFileNames);
  //   // Filter out files that are not already uploaded
  //   const newFiles = file.filter(
  //     (selectedFile) => !uploadedFileNames.has(selectedFile.name)
  //   );
  //   console.log(newFiles);
  //   const imageUrlPromises = newFiles.map(async (selectedFile) => {
  //     // Initialize an array to store image URLs
  //     const imageUrl = await uploadFile(selectedFile);
  //     return imageUrl;
  //   });

  //   // Wait for all the uploads to complete
  //   const newImageUrls = await Promise.all(imageUrlPromises);
  //   // Combine the new image URLs with the previously uploaded images
  //   const updatedImageUrls = [...newProduct.img, ...newImageUrls];
  //   console.log(updatedImageUrls);

  //   if (selectedItem) {
  //     setSelectedItem({ ...selectedItem, img: updatedImageUrls });
  //   } else {
  //     setNewProduct((prevProduct) => ({
  //       ...prevProduct,
  //       img: updatedImageUrls,
  //     }));
  //   }

  //   // Clear the files that have been successfully uploaded
  //   const newFilesList = file.filter((selectedFile) =>
  //     uploadedFileNames.has(selectedFile.name)
  //   );
  //   setFile(newFilesList);
  //   setIsLoading(false);
  // };

  const handleImage = async () => {
    setIsLoading(true);

    if (file.length === 0) {
      // No files selected, so no need to update
      return;
    }

    // Create a set to store the names or unique identifiers of uploaded files
    const uploadedFileNames = new Set(newProduct.img);
    // Filter out files that are not already uploaded
    const newFiles = file.filter(
      (selectedFile) => !uploadedFileNames.has(selectedFile.name)
    );

    if (newFiles.length === 0) {
      // No new files to upload, just clear the input and return
      setFile([]);
      return;
    }

    const imageUrlPromises = newFiles.map(async (selectedFile) => {
      // Initialize an array to store image URLs
      const imageUrl = await uploadFile(selectedFile);
      return imageUrl;
    });

    // Wait for all the uploads to complete
    const newImageUrls = await Promise.all(imageUrlPromises);
    // Combine the new image URLs with the previously uploaded images
    const updatedImageUrls = [...newProduct.img, ...newImageUrls];

    if (selectedItem) {
      // If editing, maintain the original order and replace only at the specific index
      selectedItem.img = selectedItem.img || [];
      selectedItem.img.splice(0, newFiles.length, ...newImageUrls);
      setSelectedItem({ ...selectedItem });
    } else {
      // If creating a new item, set the updated image URLs
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        img: updatedImageUrls,
      }));
    }

    // Clear the files that have been successfully uploaded
    const newFilesList = file.filter((selectedFile) =>
      uploadedFileNames.has(selectedFile.name)
    );
    setFile(newFilesList);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemsCollection = collection(db, "products");

    if (selectedItem) {
      const price = parseFloat(selectedItem.unit_price);
      const discount = parseFloat(selectedItem.discount);
      const discountAmount = (price * discount) / 100;
      let totalPrice = price;
      totalPrice -= discountAmount;

      let updatedItem = {
        ...selectedItem,
        userId: parseInt(selectedItem.userId),
        unit_price: parseFloat(selectedItem.unit_price),
        discountPrice: totalPrice,
        stock: parseInt(selectedItem.stock),
        color: selectedItem.color,
        size: selectedItem.size,
        discount: discount,
      };
      await updateDoc(doc(itemsCollection, selectedItem.id), updatedItem).then(
        () => {
          setIsChanged();
          handleClose();
        }
      );
    } else {
      const price = parseFloat(newProduct.unit_price);
      const discount = parseFloat(newProduct.discount);
      let totalPrice = price;
      let newItem;
      //Agregamos propiedad "discount" (si lo hay) al objecto newItem
      if (discount) {
        const discountAmount = (price * discount) / 100;
        totalPrice -= discountAmount;
      }

      if (discount) {
        newItem = {
          ...newProduct,
          userId: parseInt(newProduct.userId),
          unit_price: parseFloat(newProduct.unit_price),
          discountPrice: totalPrice,
          stock: parseInt(newProduct.stock),
          color: newProduct.color,
          size: newProduct.size,
          discount: discount,
        };
      } else {
        newItem = {
          ...newProduct,
          userId: parseInt(newProduct.userId),
          unit_price: totalPrice,
          stock: parseInt(newProduct.stock),
        };
      }
      await addDoc(itemsCollection, newItem);
      setAddProduct(true);
    }
    setIsChanged();
  };

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
                  defaultValue={selectedItem?.img[""]}
                  multiple
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                  }}
                  // helperText={errors.img}
                  // error={errors.img ? true : false}
                  sx={{ marginBottom: "18px" }}
                />
              </ImageDiv>

              <h2>Imagen 2 (Opcional)</h2>
              <ImageDiv>
                <input
                  style={{ margin: "5px 0 20px" }}
                  type="file"
                  name="img"
                  multiple
                  defaultValue={selectedItem?.img[""]}
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                  }}
                  // helperText={errors.img}
                  // error={errors.img ? true : false}
                  sx={{ marginBottom: "8px" }}
                />
              </ImageDiv>

              <h2>Imagen 3 (Opcional)</h2>
              <ImageDiv>
                <input
                  style={{ margin: "5px 0 20px" }}
                  type="file"
                  name="img"
                  multiple
                  defaultValue={selectedItem?.img[""]}
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                  }}
                  // helperText={errors.img}
                  // error={errors.img ? true : false}
                  sx={{ marginBottom: "8px" }}
                />
              </ImageDiv>

              <h2>Imagen 4 (Opcional)</h2>
              <ImageDiv>
                <input
                  style={{ margin: "5px 0 20px" }}
                  type="file"
                  name="img"
                  multiple
                  defaultValue={selectedItem?.img[""]}
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                  }}
                  // helperText={errors.img}
                  // error={errors.img ? true : false}
                  sx={{ marginBottom: "8px" }}
                />
              </ImageDiv>

              <h2>Imagen 5 (Opcional)</h2>
              <ImageDiv>
                <input
                  style={{ margin: "5px 0 20px" }}
                  type="file"
                  name="img"
                  multiple
                  defaultValue={selectedItem?.img[""]}
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
                  }}
                  // helperText={errors.img}
                  // error={errors.img ? true : false}
                  sx={{ marginBottom: "8px" }}
                />
              </ImageDiv>
            </Div>
            {file && (
              <LoadImgBtn
                variant="outlined"
                sx={{ margin: "20px auto" }}
                onClick={handleImage}
              >
                Cargar Imagenes
              </LoadImgBtn>
            )}
            {file && !isLoading && (
              <SubmitBtn
                type="submit"
                variant="contained"
                sx={{ margin: "20px auto" }}
              >
                {selectedItem ? "Modificar" : "Crear Producto"}
              </SubmitBtn>
            )}
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
const LoadImgBtn = styled(Button)`
  width: 60%;
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
