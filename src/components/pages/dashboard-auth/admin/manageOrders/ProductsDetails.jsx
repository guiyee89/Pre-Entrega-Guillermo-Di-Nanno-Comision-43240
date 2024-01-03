import { useContext } from "react";
import styled from "styled-components/macro";
import { AuthContext } from "../../../../context/AuthContext";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const ProductsDetails = ({
  handleClose,
  selectedItem,
  setMyOrders,
  myOrders,
}) => {
  const { items, item_price } = selectedItem || {};
  console.log(items);

  const { user } = useContext(AuthContext);

  return (
    <>
      <ProdcutsWrapper>
        <TableContainer component={Paper} sx={{ borderLeft: "1px solid grey" }}>
          <Table
            aria-label="simple table"
            sx={{
              borderLeft: "1px solid darkgrey",
              borderRight: " 1px solid darkgrey",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCellTitle></TableCellTitle>
                <TableCellTitle>Product</TableCellTitle>
                <TableCellTitle>Color</TableCellTitle>
                <TableCellTitle>Size</TableCellTitle>
                <TableCellTitle>Qty</TableCellTitle>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCellData>
                    <OrderImg src={product.img[0]} alt={`Item ${product.id}`} />
                  </TableCellData>
                  <TableCellData sx={{ minWidth: "70px" }}>
                    {product.title}
                  </TableCellData>
                  <TableCellData sx={{ minWidth: "70px" }}>
                    {product.color}
                  </TableCellData>
                  <TableCellData>{product.size}</TableCellData>
                  <TableCellData>{product.quantity}</TableCellData>
                  <TableCellData>
                    ${item_price?.[index]?.unit_price}
                  </TableCellData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ProdcutsWrapper>
    </>
  );
};
const ProdcutsWrapper = styled.div`
  margin-top: 50px;
  box-shadow: 0px -3px 1px rgba(0, 0, 0, 0.15);
  overflow-x: auto;
  width: 100%;
  @media (max-width: 1000px) {
  }
  /* Customize scrollbar */
  /* &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  } */
`;

const OrderContainer = styled.div`
  display: flex;
  padding: 10px 8px 25px;
  margin-bottom: 28px;
  border-bottom: 1px solid #dfcdcd;
  width: 1224px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -3px 17px 4px;
  @media (max-width: 750px) {
    padding: 10px 0px 70px;
  }
`;
const OrderDate = styled.h2`
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1.2rem;
  letter-spacing: 2px;
`;

const TableCellTitle = styled(TableCell)`
  padding: 16px 8px !important;
  text-align: center !important;
`;
const TableCellData = styled(TableCell)`
  padding: 11.5px 0px !important;
  text-align: center !important;
`;
const OrderImg = styled.img`
  width: 100%;
  max-width: 72px;
  min-width: 40px;
  height: auto;
  margin: 0px 0 0 35px;
  @media (max-width: 600px) {
    margin: 0px 0px 0px 25px;
  }
`;
const AllOrderDetails = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  min-width: 545px;
  margin: 0px 0px -0.7px -1.2px;
  border-bottom: 1px solid darkgrey;
  border-right: 1px solid darkgrey;
  border-left: 1px solid darkgrey;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 0px;
`;
const BuyerDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const BuyerDetails = styled.div`
  display: flex;
  padding: 26px 0 0 20px;
  gap: 6rem;
`;
const BuyerTitle = styled.h2`
  width: 100%;
  font-weight: 900;
  padding: 18px 0 12px 20px;
  border-bottom: 1px solid lightgray;
  text-transform: uppercase;
  font-size: 1.1rem;
  text-decoration: underline;
`;
const BuyerData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
const ShippingData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
const Data = styled.p`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 900;
`;
const DataCost = styled.p`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 900;
`;
const DataCostTotal = styled.p`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 900;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 4%;
    left: -1px;
    width: 26%;
    height: 1px;
    background-color: black;
  }
`;
const Span = styled.span`
  font-weight: 500;
  text-transform: capitalize;
  font-size: 0.9rem;
`;
const SpanCost = styled.span`
  font-weight: 600;
  text-transform: capitalize;
  font-size: 1.1rem;
  padding-left: 11px;
`;
const OrderCost = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 230px;
  padding: 15px 0px 20px 20px;
  margin-top: 20px;
  border-top: 1px solid darkgrey;
  gap: 1rem;
  -webkit-box-pack: center;
  justify-content: center;
`;
