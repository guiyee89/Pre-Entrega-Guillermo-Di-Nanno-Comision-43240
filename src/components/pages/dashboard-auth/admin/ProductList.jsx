import {
  Box,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import styled from "styled-components/macro";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { ProductsForm } from "./ProductsForm";

export const ProductList = ({
  filteredItems,
  handleDelete,
  handleEdit,
  open,
  handleClose,
}) => {
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
  filteredItems.sort(customSort);

  return (
    <>
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
            {filteredItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {item.userId}
                </TableCell>
                <ImgCell align="center" component="th" scope="row">
                  <img src={item.img[0]} />
                </ImgCell>
                <TableCell align="center" component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  $ {item.unit_price}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {item.discount}% (${item.discountPrice})
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {item.stock}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {item.size}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {item.color}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {item.category}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <IconButton onClick={() => handleEdit(item.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        sx={{maxWidth:"1000px", margin:"0 auto"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProductsForm />
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
