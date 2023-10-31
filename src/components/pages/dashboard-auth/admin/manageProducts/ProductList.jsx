import {
  Box,
  Button,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components/macro";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductsForm } from "./ProductsForm";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { useState } from "react";


export const ProductList = ({ products, setIsChanged }) => {


  // Sort items by color and size
  const customSort = (itemA, itemB) => {
    // First, compare by color
    if (itemA.color < itemB.color) return -1;
    if (itemA.color > itemB.color) return 1;
    // If colors are the same, compare by size
    if (itemA.size < itemB.size) return -1;
    if (itemA.size > itemB.size) return 1;
    // If both color and size are the same, items are considered equal
    return 0;
  };
  // Sort the items array
  Array.isArray(products) && products.sort(customSort);

  const [ open, setOpen ] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = (product) => {
    setSelectedItem(product)
    setOpen(true)
  }

  const editProduct = (id) => {
    console.log(id);
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setIsChanged(); // Toggle isChanged to trigger useEffect
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ marginLeft: "50px", marginTop: "17px" }}
        onClick={() => handleOpen(null)}
      >
        Nuevo Producto
      </Button>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Imagen</TableCell>
              <TableCell align="center">Titulo</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Descuento</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center">Categoria</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(products) &&
              products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {product.userId}
                  </TableCell>
                  <ImgCell align="center" component="th" scope="row">
                    <img src={product.img[0]} />
                  </ImgCell>
                  <TableCell align="center" component="th" scope="row">
                    {product.title}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    $ {product.unit_price}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {product.discount}% ( ${product.discountPrice} )
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {product.stock}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {product.size}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {product.color}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {product.category}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <IconButton onClick={() => handleOpen(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteProduct(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        sx={{ maxWidth: "1000px", margin: "0 auto" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProductsForm handleClose={handleClose} setIsChanged={setIsChanged} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </Box>
      </Modal>
    </>
  );
};

const ImgCell = styled(TableCell)`
  width: 10%;
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  /* width: "100%", */
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
