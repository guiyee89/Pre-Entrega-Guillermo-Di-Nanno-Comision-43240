import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { db, uploadFile } from "../../../../../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { GlobalToolsContext } from "../../../../context/GlobalToolsContext";
import { Ring } from "@uiball/loaders";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export const ProductsForm = ({
  selectedItem,
  setSelectedItem,
  handleClose,
  setIsChanged,
}) => {
  const { windowWidth } = useContext(GlobalToolsContext);
  const [addProduct, setAddProduct] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [allSelectedFiles, setAllSelectedFiles] = useState([]);
  const [isQueueProcessing, setIsQueueProcessing] = useState(false); // Use a queue to handle concurrency of handleImage
  const [imageQueue, setImageQueue] = useState([]);
  const [isLoading, setIsLoading] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [file, setFile] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  });
  const [confirmedImageUpload, setConfirmedImageUpload] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
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
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  /////*****         HANDLE IMAGE INPUTS        ******///////

  // Set existing images for rendering
  useEffect(() => {
    if (selectedItem) {
      setExistingImages(selectedItem.img);
    }
  }, [selectedItem]);

  // Activate states for handling image uploading queues
  const handleImage = (inputNumber) => {
    setIsQueueProcessing(true);
    setIsLoading((prevLoading) => ({
      ...prevLoading,
      [inputNumber]: true,
    }));
    try {
      // Add the image upload request to the queue
      setImageQueue((prevQueue) => [
        ...prevQueue,
        { inputNumber, selectedFiles: file[inputNumber] },
      ]);
    } catch (error) {}
  };

  // Set a queue for each image being uploaded
  useEffect(() => {
    const handleImageQueue = async () => {
      if (imageQueue.length > 0) {
        const { inputNumber } = imageQueue[0];
        try {
          const { inputNumber, selectedFiles } = imageQueue[0];
          const imageUrlPromises = selectedFiles.map(async (selectedFile) => {
            const imageUrl = await uploadFile(selectedFile);
            return imageUrl;
          });
          const newUrls = await Promise.all(imageUrlPromises);

          if (selectedItem) {
            const imgCopy = selectedItem.img ? [...selectedItem.img] : [];
            imgCopy[inputNumber - 1] = newUrls[0];
            setSelectedItem((prevSelectedItem) => ({
              ...prevSelectedItem,
              img: imgCopy,
            }));
          } else {
            const imgCopy = newProduct.img ? [...newProduct.img] : [];
            imgCopy[inputNumber - 1] = newUrls[0];
            setNewProduct((prevProduct) => ({
              ...prevProduct,
              img: imgCopy,
            }));
          }
        } finally {
          // Reset the loading state after the upload is complete or if an error occurs
          setIsLoading((prevLoading) => ({
            ...prevLoading,
            [inputNumber]: false,
          }));
          // Remove the processed item from the queue
          setImageQueue((prevQueue) => prevQueue.slice(1));

          // Set the confirmedImageUpload state for this input to true
          setConfirmedImageUpload((prevConfirmedImageUpload) => ({
            ...prevConfirmedImageUpload,
            [inputNumber]: true,
          }));
        }
      }
    };

    handleImageQueue();
    if (imageQueue.length < 1) {
      setIsQueueProcessing(false);
    }
  }, [imageQueue, selectedItem]);

  // Merge the selected files with the existing files for the input
  const handleFileInputChange = (inputNumber, selectedFiles) => {
    const updatedFiles = { ...file };
    updatedFiles[inputNumber] = [
      ...updatedFiles[inputNumber],
      ...selectedFiles,
    ];

    setFile(updatedFiles);
    // Combine all the selected files into one array
    const allSelectedFiles = Object.keys(updatedFiles).reduce((acc, key) => {
      return [...acc, ...updatedFiles[key]];
    }, []);

    setAllSelectedFiles(allSelectedFiles);
  };

  //////////         CANCEL / DELETE IMAGES       ///////////
  const handleCancelFile = (inputNumber) => {
    // Create a copy of the current file object
    const updatedFiles = { ...file };
    // Clear the selected file at the specified inputNumber
    updatedFiles[inputNumber] = [];

    setFile(updatedFiles);
    // Combine all the selected files into one array
    const allSelectedFiles = Object.keys(updatedFiles).reduce((acc, key) => {
      if (Array.isArray(updatedFiles[key])) {
        return [...acc, ...updatedFiles[key]];
      } else {
        return acc;
      }
    }, []);
    setAllSelectedFiles(allSelectedFiles);
    // Clear the file input value
    const fileInput = document.querySelector(`#fileInput${inputNumber}`);
    if (fileInput) {
      fileInput.value = ""; // Reset the input value
    }

    // Set the confirmedImageUpload state for this input to false
    setConfirmedImageUpload((prevConfirmedImageUpload) => ({
      ...prevConfirmedImageUpload,
      [inputNumber]: false,
    }));
  };

  const handleDeleteImage = (inputNumber) => {
    const imgCopy = [...(selectedItem?.img || [])];
    // Mark the deleted slot as empty
    imgCopy[inputNumber - 1] = null;

    if (selectedItem) {
      setSelectedItem({ ...selectedItem, img: imgCopy });
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        img: imgCopy,
      }));
    }
  };

  ////////////          SUBMIT          //////////////
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
        discountPrice: totalPrice || "",
        stock: parseInt(selectedItem.stock),
        color: selectedItem.color,
        size: selectedItem.size,
        discount: discount || "",
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

      const length = 5;
      const nullArray = Array.from({ length }).map(() => null);
      newProduct.img.forEach((img, index) => {
        nullArray[index] = img;
      });

      if (discount) {
        newItem = {
          ...newProduct,
          userId: newProduct.userId ? parseInt(newProduct.userId) : 0,
          unit_price: newProduct.unit_price
            ? parseFloat(newProduct.unit_price)
            : 0,
          discountPrice: totalPrice,
          stock: newProduct.stock ? parseInt(newProduct.stock) : 0,
          color: newProduct.color || "",
          size: newProduct.size || "",
          discountPrice: totalPrice,
          title: newProduct.title || "",
          subtitle: newProduct.subtitle || "",
          description: newProduct.description || "",
          category: newProduct.category || "",
          img: nullArray,
          secondUnit: newProduct.secondUnit || "",
        };
      } else {
        newItem = {
          ...newProduct,
          userId: newProduct.userId ? parseInt(newProduct.userId) : 0,
          unit_price: totalPrice,
          stock: newProduct.stock ? parseInt(newProduct.stock) : 0,
          color: newProduct.color || "",
          size: newProduct.size || "",
          /* discount: 0, */
          title: newProduct.title || "",
          subtitle: newProduct.subtitle || "",
          description: newProduct.description || "",
          category: newProduct.category || "",
          img: nullArray,
          secondUnit: newProduct.secondUnit || "",
        };
      }

      // Now, you can create the newItem object and add it to Firestore
      await addDoc(itemsCollection, newItem);
      setAddProduct(true);
    }
    setIsChanged();
  };

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
            <InfoImageContainer>
              <ProductInfo>
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
              </ProductInfo>
              <ImagesInputsContainer>
                {selectedItem ? (
                  <ImageContainer>
                    {existingImages.map((image, index) => (
                      <div
                        key={index}
                        style={{
                          height: "17%",
                          borderTop: "1px solid lightgray",
                        }}
                      >
                        <p
                          style={{
                            textAlign: "center",
                            marginLeft: windowWidth < 600 ? "0px" : "35px",
                            marginBottom: "-21px",
                            paddingTop: "5px",
                          }}
                        >
                          {index + 1}
                        </p>{" "}
                        <CloseIcon
                          onClick={() => handleDeleteImage(index + 1)}
                          sx={{ cursor: "pointer", display: "flex" }}
                          fontSize="small"
                        />
                        <div
                          style={{
                            width: "70px",
                            height: "80px",
                            marginLeft: windowWidth < 600 ? "0px" : "35px",
                            border: image ? "1px solid black" : "none",
                            marginBottom: "20px",
                          }}
                        >
                          {image ? (
                            <img
                              src={image}
                              alt={`imagen de producto ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <label
                              style={{
                                height: "80px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                border: "1px solid lightgray",
                              }}
                            >
                              Imagen
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </ImageContainer>
                ) : (
                  <ImageContainer>
                    {/* Render 5 empty slots here */}
                    {[1, 2, 3, 4, 5].map((slotIndex) => (
                      <div
                        key={slotIndex}
                        style={{
                          height: "17%",
                          borderTop: "1px solid lightgray",
                        }}
                      >
                        <p
                          style={{
                            textAlign: "center",
                            marginLeft: windowWidth < 600 ? "0px" : "35px",
                            marginBottom: "-21px",
                            paddingTop: "5px",
                          }}
                        >
                          {slotIndex}
                        </p>{" "}
                        <div
                          style={{
                            width: "70px",
                            height: "80px",
                            marginLeft: windowWidth < 600 ? "0px" : "35px",
                            border: "1px solid lightgray",
                            marginBottom: "20px",
                          }}
                        >
                          {confirmedImageUpload[slotIndex] ? (
                            // Render the uploaded image if confirmed
                            <img
                              src={
                                file[slotIndex].length > 0
                                  ? URL.createObjectURL(file[slotIndex][0])
                                  : ""
                              }
                              alt={
                                file[slotIndex].length > 0
                                  ? "Product Image"
                                  : "No Image Available"
                              }
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            // Render this if not confirmed
                            <label
                              style={{
                                height: "80px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                border: "1px solid lightgray",
                              }}
                            >
                              Imagen
                            </label>
                          )}

                        </div>
                      </div>
                    ))}
                  </ImageContainer>
                )}

                <InputsContainer>
                  {[1, 2, 3, 4, 5].map((inputNumber) => (
                    <div
                      key={inputNumber}
                      style={{
                        height: "17%",
                        borderTop: "1px solid lightgray",
                        width: "98%",
                      }}
                    >
                      <h2
                        style={{
                          margin: "-3px 14px 0 20px",
                          paddingTop: "10px",
                        }}
                      >
                        {inputNumber === 1 ? "Imagen Principal" : "(Opcional)"}{" "}
                      </h2>
                      <ImageDiv>
                        <Button
                          component="label"
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                          size="small"
                          sx={{
                            margin: "5px 60px 20px 10px",
                            "& .MuiButton-label": {
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            },
                          }}
                          disabled={file[inputNumber].length > 0}
                        >
                          {file[inputNumber].length > 0 ||
                          isLoading[inputNumber]
                            ? "Cargar"
                            : "Cargar"}
                          <input
                            type="file"
                            id={`fileInput${inputNumber}`}
                            multiple
                            onChange={(e) => {
                              const selectedFiles = Array.from(e.target.files);
                              handleFileInputChange(inputNumber, selectedFiles);
                            }}
                            style={{
                              display: "none",
                            }}
                          />
                        </Button>

                        {file[inputNumber].length > 0 && (
                          <div>
                            <CloseIcon
                              sx={{
                                cursor: "pointer",
                                position: "absolute",
                                right: "57%",
                              }}
                              fontSize="small"
                              onClick={() => handleCancelFile(inputNumber)}
                            />
                            {isLoading[inputNumber] ? (
                              <div style={{ marginLeft: "-15px" }}>
                                <Ring
                                  size={25}
                                  lineWeight={7}
                                  speed={1}
                                  color="black"
                                />
                              </div>
                            ) : (
                              <>
                                {confirmedImageUpload[inputNumber] === true ? (
                                  <div style={{ marginLeft: "-15px" }}>
                                    <TaskAltIcon
                                      color="success"
                                      fontSize="large"
                                    />
                                  </div>
                                ) : (
                                  <LoadImgBtn
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      minWidth: "100px",
                                      marginTop: "5px",
                                      paddingBottom: "3px",
                                    }}
                                    onClick={() => handleImage(inputNumber)}
                                    style={{
                                      display: isLoading[inputNumber] && "none",
                                    }}
                                  >
                                    Confirmar
                                  </LoadImgBtn>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </ImageDiv>
                    </div>
                  ))}
                </InputsContainer>
              </ImagesInputsContainer>
            </InfoImageContainer>
            <SubmitBtn
              type="submit"
              variant="contained"
              sx={{ margin: "20px auto" }}
            >
              {selectedItem ? "Confirmar cambios" : "Crear Producto"}
            </SubmitBtn>
            {/* )} */}
          </Form>
        </FormWrapper>
      )}
    </>
  );
};

const FormWrapper = styled.div`
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
  padding: 20px 12px;
`;
const Form = styled.form`
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
const ProductInfo = styled.div`
  width: 100%;
`;
const InfoImageContainer = styled.div`
  display: flex;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImageDiv = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: flex-start;
  -webkit-box-pack: start;
  justify-content: space-between;
  margin: 21px 0px 0 10px;
  position: relative;
`;
const ImagesInputsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-left: 15px;
`;
const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// import { Button, TextField } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useContext, useEffect, useState } from "react";
// import styled from "styled-components/macro";
// import { db, uploadFile } from "../../../../../firebaseConfig";
// import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
// import { GlobalToolsContext } from "../../../../context/GlobalToolsContext";

// export const ProductsForm = ({
//   selectedItem,
//   setSelectedItem,
//   handleClose,
//   setIsChanged,
// }) => {
//   const { windowWidth } = useContext(GlobalToolsContext);
//   const [addProduct, setAddProduct] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [existingImages, setExistingImages] = useState([]);
//   const [allSelectedFiles, setAllSelectedFiles] = useState([]);
//   const [file, setFile] = useState({
//     1: {},
//     2: {},
//     3: {},
//     4: {},
//     5: {},
//   });

//   const [newProduct, setNewProduct] = useState({
//     userId: "",
//     title: "",
//     subtitle: "",
//     unit_price: "",
//     discountPrice: "",
//     stock: "",
//     color: "",
//     size: "",
//     description: "",
//     category: "",
//     img: [],
//     secondUnit: "",
//   });

//   ///////*****         HANDLE CHANGE        ******///////
//   const handleChange = (e) => {
//     if (selectedItem) {
//       setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
//     } else {
//       setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//     }
//   };

//   /////*****         HANDLE IMAGE INPUTS        ******///////

//   useEffect(() => {
//     if (selectedItem) {
//       // Set existing images for rendering
//       setExistingImages(selectedItem.img);
//     }
//   }, [selectedItem]);

//   const handleImage = async () => {
//     setIsLoading(true);
//     const uploadedFileNames = new Set(newProduct.img);
//     const updatedFiles = { ...file };
//     const newImageUrls = [];

//     try {
//       for (let inputNumber in updatedFiles) {
//         if (updatedFiles[inputNumber].length > 0) {
//           const selectedFiles = updatedFiles[inputNumber];
//           const imageUrlPromises = selectedFiles.map(async (selectedFile) => {
//             const imageUrl = await uploadFile(selectedFile);
//             return imageUrl;
//           });
//           const newUrls = await Promise.all(imageUrlPromises);
//           newImageUrls.push(...newUrls);
//           updatedFiles[inputNumber] = [];
//         }
//       }
//       const updatedImageUrls = [...newProduct.img, ...newImageUrls];

//       if (selectedItem) {
//         setSelectedItem({ ...selectedItem, img: updatedImageUrls });
//       } else {
//         setNewProduct((prevProduct) => ({
//           ...prevProduct,
//           img: updatedImageUrls,
//         }));
//       }
//     } finally {
//       setAllSelectedFiles([]); // Clear the selected files after the image upload
//       setIsLoading(false);
//     }
//   };

//   const handleFileInputChange = (inputNumber, selectedFiles) => {
//     // Create a copy of the current file object
//     const updatedFiles = { ...file };

//     // Assign the selected files to the specified inputNumber (e.g., 1, 2, etc.)
//     updatedFiles[inputNumber] = selectedFiles;

//     // Combine all the selected files into one array
//     const allSelectedFiles = Object.keys(updatedFiles).reduce((acc, key) => {
//       if (Array.isArray(updatedFiles[key])) {
//         return [...acc, ...updatedFiles[key]];
//       } else {
//         return acc;
//       }
//     }, []);

//     // Set the updated files object and the combined files array
//     setFile(updatedFiles);
//     setAllSelectedFiles(allSelectedFiles);
//   };

//   const handleCancelImage = (inputNumber) => {
//     // Create a copy of the current file object
//     const updatedFiles = { ...file };
//     // Clear the selected file at the specified inputNumber
//     updatedFiles[inputNumber] = [];

//     setFile(updatedFiles);

//     // Combine all the selected files into one array
//     const allSelectedFiles = Object.keys(updatedFiles).reduce((acc, key) => {
//       if (Array.isArray(updatedFiles[key])) {
//         return [...acc, ...updatedFiles[key]];
//       } else {
//         return acc;
//       }
//     }, []);

//     setAllSelectedFiles(allSelectedFiles);
//     // Clear the file input value
//     const fileInput = document.querySelector(`#fileInput${inputNumber}`);
//     if (fileInput) {
//       fileInput.value = ""; // Reset the input value
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const itemsCollection = collection(db, "products");

//     if (selectedItem) {
//       const price = parseFloat(selectedItem.unit_price);
//       const discount = parseFloat(selectedItem.discount);
//       const discountAmount = (price * discount) / 100;
//       let totalPrice = price;
//       totalPrice -= discountAmount;

//       let updatedItem = {
//         ...selectedItem,
//         userId: parseInt(selectedItem.userId),
//         unit_price: parseFloat(selectedItem.unit_price),
//         discountPrice: totalPrice,
//         stock: parseInt(selectedItem.stock),
//         color: selectedItem.color,
//         size: selectedItem.size,
//         discount: discount,
//       };
//       await updateDoc(doc(itemsCollection, selectedItem.id), updatedItem).then(
//         () => {
//           setIsChanged();
//           handleClose();
//         }
//       );
//     } else {
//       const price = parseFloat(newProduct.unit_price);
//       const discount = parseFloat(newProduct.discount);
//       let totalPrice = price;
//       let newItem;
//       //Agregamos propiedad "discount" (si lo hay) al objecto newItem
//       if (discount) {
//         const discountAmount = (price * discount) / 100;
//         totalPrice -= discountAmount;
//       }

//       if (discount) {
//         newItem = {
//           ...newProduct,
//           userId: parseInt(newProduct.userId),
//           unit_price: parseFloat(newProduct.unit_price),
//           discountPrice: totalPrice,
//           stock: parseInt(newProduct.stock),
//           color: newProduct.color,
//           size: newProduct.size,
//           discount: discount,
//         };
//       } else {
//         newItem = {
//           ...newProduct,
//           userId: parseInt(newProduct.userId),
//           unit_price: totalPrice,
//           stock: parseInt(newProduct.stock),
//         };
//       }
//       await addDoc(itemsCollection, newItem);
//       setAddProduct(true);
//     }
//     setIsChanged();
//   };

//   //YUP VALIDATION
//   //que no se valide mientras escribo, sino al hacer submit
//   // validateOnChange: false,
//   // //validar los datos
//   // validationSchema: Yup.object({
//   //   name: Yup.string()
//   //     .required("Este campo es obligatorio")
//   //     .min(3, "Minimo 3 caracteres"),
//   //   email: Yup.string()
//   //     .email("Este campo no corresponde a un email valido")
//   //     .required("Este campo es obligatorio"),
//   //   phone: Yup.string()
//   //     .required("Este campo es obligatorio")
//   //     .min(10, "Debe contener 10 numeros")
//   //     .max(15, "Debe contener 10 numeros"),
//   // }),

//   console.log(file);
//   console.log(allSelectedFiles);

//   return (
//     <>
//       {addProduct ? (
//         <SuccessMessage>Product added successfully!</SuccessMessage>
//       ) : (
//         <FormWrapper>
//           <Form onSubmit={handleSubmit}>
//             <Div>
//               <h2>ID del producto</h2>
//               <Input
//                 label="ID"
//                 variant="outlined"
//                 name="userId"
//                 defaultValue={selectedItem?.userId}
//                 onChange={handleChange}
//                 // helperText={errors.userId}
//                 // error={errors.userId ? true : false}
//                 sx={{ marginBottom: "18px" }}
//               />
//             </Div>
//             <Div>
//               <h2>Nombre del producto</h2>
//               <Input
//                 label="Nombre del producto"
//                 variant="outlined"
//                 name="title"
//                 defaultValue={selectedItem?.title}
//                 onChange={handleChange}
//                 // helperText={errors.title}
//                 // error={errors.title ? true : false}
//                 sx={{ marginBottom: "18px" }}
//               />
//             </Div>
//             <Div>
//               <h2>Subtitulo del producto</h2>
//               <Input
//                 label="Subtitulo del producto"
//                 variant="outlined"
//                 name="subtitle"
//                 defaultValue={selectedItem?.subtitle}
//                 onChange={handleChange}
//                 // helperText={errors.subtitle}
//                 // error={errors.subtitle ? true : false}
//                 sx={{ marginBottom: "18px" }}
//               />
//             </Div>
//             <Div>
//               <h2>Precio</h2>
//               <Input
//                 label="Precio"
//                 variant="outlined"
//                 name="unit_price"
//                 defaultValue={selectedItem?.unit_price}
//                 onChange={handleChange}
//                 // helperText={errors.unit_price}
//                 // error={errors.unit_price ? true : false}
//                 sx={{ marginBottom: "18px" }}
//               />
//             </Div>
//             <Div>
//               <h2>Descuento en %</h2>
//               <Input
//                 label="(solo agregar el numero, ej: 10 - 20)"
//                 variant="outlined"
//                 name="discount"
//                 defaultValue={selectedItem?.discount}
//                 onChange={handleChange}
//                 // helperText={errors.discount}
//                 // error={errors.discount ? true : false}
//                 sx={{ marginBottom: "18px" }}
//               />
//             </Div>
//             <Div>
//               <h2>Stock</h2>
//               <Input
//                 label="Stock     (agregar cantidad)"
//                 variant="outlined"
//                 name="stock"
//                 defaultValue={selectedItem?.stock}
//                 onChange={handleChange}
//                 // helperText={errors.stock}
//                 // error={errors.stock ? true : false}
//                 sx={{ marginBottom: "18px" }}
//               />
//             </Div>
//             <Div>
//               <h2>Color</h2>
//               <Input
//                 label="Color"
//                 variant="outlined"
//                 name="color"
//                 defaultValue={selectedItem?.color}
//                 onChange={handleChange}
//                 // helperText={errors.color}
//                 // error={errors.color ? true : false}
//                 sx={{ marginBottom: "18px" }}
//               />
//             </Div>
//             <Div>
//               <h2>Talle</h2>
//               <Input
//                 label="(Ejemplo: s - m - l - 41 - 42 .. etc)"
//                 variant="outlined"
//                 name="size"
//                 defaultValue={selectedItem?.size}
//                 onChange={handleChange}
//                 // helperText={errors.size}
//                 // error={errors.size ? true : false}
//                 sx={{ marginBottom: "18px" }}
//               />
//             </Div>
//             <Div>
//               <h2>Descripción del producto</h2>
//               <Input
//                 label="Descripción"
//                 variant="outlined"
//                 name="description"
//                 defaultValue={selectedItem?.description}
//                 onChange={handleChange}
//                 // helperText={errors.description}
//                 // error={errors.description ? true : false}
//                 sx={{ marginBottom: "18px" }}
//               />
//             </Div>
//             <Div>
//               <h2>Categoria del producto</h2>
//               <Input
//                 label="Categoria"
//                 variant="outlined"
//                 name="category"
//                 defaultValue={selectedItem?.category}
//                 onChange={handleChange}
//                 // helperText={errors.category}
//                 // error={errors.category ? true : false}
//                 sx={{ marginBottom: "18px" }}
//               />
//             </Div>
//             <ImageDiv>
//               {existingImages.map((image, index) => (
//                 <div key={index}>
//                   <p
//                     style={{
//                       textAlign: "center",
//                       marginLeft: windowWidth < 600 ? "0px" : "35px",
//                     }}
//                   >
//                     {index + 1}
//                   </p>{" "}
//                   <img
//                     src={image}
//                     alt={`Existing Image ${index}`}
//                     style={{
//                       width: "100px",
//                       height: "auto",
//                       marginLeft: windowWidth < 600 ? "0px" : "35px",
//                       border: "1px solid black",
//                       marginBottom: "30px",
//                     }}
//                   />
//                 </div>
//               ))}
//             </ImageDiv>
//             <AllImagesDiv>
//               <Div>
//                 <h2>Imagen Principal</h2>
//                 <ImageDiv>
//                   <input
//                     style={{ margin: "5px 0 20px" }}
//                     name="img"
//                     type="file"
//                     id="fileInput1"
//                     multiple
//                     disabled={file[1].length > 0}
//                     onChange={(e) => {
//                       const selectedFiles = Array.from(e.target.files);
//                       handleFileInputChange(1, selectedFiles);
//                     }}
//                     sx={{
//                       marginBottom: "18px",
//                     }}
//                   />
//                   {file[1].length > 0 && (
//                     <CloseIcon
//                       sx={{ cursor: "pointer" }}
//                       onClick={() => handleCancelImage(1)}
//                     />
//                   )}
//                 </ImageDiv>

//                 <h2>2 (Opcional)</h2>
//                 <ImageDiv>
//                   <input
//                     style={{
//                       margin: "5px 0 20px",
//                     }}
//                     type="file"
//                     id="fileInput2"
//                     name="img"
//                     multiple
//                     disabled={file[2].length > 0}
//                     onChange={(e) => {
//                       const selectedFiles = Array.from(e.target.files);
//                       handleFileInputChange(2, selectedFiles);
//                     }}
//                     // helperText={errors.img}
//                     // error={errors.img ? true : false}
//                     sx={{
//                       marginBottom: "18px",
//                     }}
//                   />
//                   {file[2].length > 0 && (
//                     <CloseIcon
//                       sx={{ cursor: "pointer" }}
//                       onClick={() => handleCancelImage(2)}
//                     />
//                   )}
//                 </ImageDiv>

//                 <h2>3 (Opcional)</h2>
//                 <ImageDiv>
//                   <input
//                     style={{ margin: "5px 0 20px" }}
//                     type="file"
//                     name="img"
//                     id="fileInput3"
//                     multiple
//                     disabled={file[3].length > 0}
//                     onChange={(e) => {
//                       const selectedFiles = Array.from(e.target.files);
//                       handleFileInputChange(3, selectedFiles);
//                     }}
//                     // helperText={errors.img}
//                     // error={errors.img ? true : false}
//                     sx={{
//                       marginBottom: "18px",
//                     }}
//                   />
//                   {file[3].length > 0 && (
//                     <CloseIcon
//                       sx={{ cursor: "pointer" }}
//                       onClick={() => handleCancelImage(3)}
//                     />
//                   )}
//                 </ImageDiv>
//               </Div>
//               <Div style={{ marginLeft: windowWidth < 600 ? "0px" : "20px" }}>
//                 <h2>4 (Opcional)</h2>
//                 <ImageDiv>
//                   <input
//                     style={{ margin: "5px 0 20px" }}
//                     type="file"
//                     name="img"
//                     id="fileInput4"
//                     multiple
//                     disabled={file[4].length > 0}
//                     onChange={(e) => {
//                       const selectedFiles = Array.from(e.target.files);
//                       handleFileInputChange(4, selectedFiles);
//                     }}
//                     // helperText={errors.img}
//                     // error={errors.img ? true : false}
//                     sx={{
//                       marginBottom: "18px",
//                     }}
//                   />
//                   {file[4].length > 0 && (
//                     <CloseIcon
//                       sx={{ cursor: "pointer" }}
//                       onClick={() => handleCancelImage(4)}
//                     />
//                   )}
//                 </ImageDiv>
//                 <h2>5 (Opcional)</h2>
//                 <ImageDiv>
//                   <input
//                     style={{ margin: "5px 0 20px" }}
//                     type="file"
//                     name="img"
//                     id="fileInput5"
//                     multiple
//                     disabled={file[5].length > 0}
//                     onChange={(e) => {
//                       const selectedFiles = Array.from(e.target.files);
//                       handleFileInputChange(5, selectedFiles);
//                     }}
//                     // helperText={errors.img}
//                     // error={errors.img ? true : false}
//                     sx={{
//                       marginBottom: "18px",
//                     }}
//                   />
//                   {file[5].length > 0 && (
//                     <CloseIcon onClick={() => handleCancelImage(5)} />
//                   )}
//                 </ImageDiv>
//               </Div>
//             </AllImagesDiv>
//             {isLoading ? (
//               <LoadImgBtn variant="outlined" sx={{ margin: "20px auto" }}>
//                 Uploading Images...
//               </LoadImgBtn>
//             ) : allSelectedFiles.length > 0 ? (
//               <LoadImgBtn
//                 variant="outlined"
//                 sx={{ margin: "20px auto" }}
//                 onClick={handleImage}
//               >
//                 Cargar Imagenes
//               </LoadImgBtn>
//             ) : (
//               <SubmitBtn
//                 type="submit"
//                 variant="contained"
//                 sx={{ margin: "20px auto" }}
//               >
//                 {selectedItem ? "Confirmar cambios" : "Crear Producto"}
//               </SubmitBtn>
//             )}
//           </Form>
//         </FormWrapper>
//       )}
//     </>
//   );
// };

// const FormWrapper = styled.div`
//   width: 100%;
//   max-height: 600px;
//   overflow-y: auto;
//   padding: 20px 12px;
// `;
// const Form = styled.form`
//   width: 95%;
//   display: flex;
//   flex-direction: column;
// `;
// const Input = styled(TextField)`
//   .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
//     padding: 12.5px 5px;
//   }
// `;
// const LoadImgBtn = styled(Button)`
//   width: 60%;
// `;
// const SubmitBtn = styled(Button)`
//   width: 60%;
// `;
// const SuccessMessage = styled.p`
//   color: #091209;
//   font-weight: bold;
//   text-align: center;
// `;
// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
// const ImageDiv = styled.div`
//   display: flex;
// `;
// const AllImagesDiv = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;
