import {
  IconButton,
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


export const ProductList = ({ filteredItems, handleDelete, handleEdit }) => {
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
    </>
  );
};
const ImgCell = styled(TableCell)`
  width: 10%;
`;
