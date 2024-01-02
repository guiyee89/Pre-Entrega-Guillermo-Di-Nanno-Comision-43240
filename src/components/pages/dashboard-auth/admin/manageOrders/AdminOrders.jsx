import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components/macro";
import { AuthContext } from "../../../../context/AuthContext";
import { db } from "../../../../../firebaseConfig";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const AdminOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(myOrders.sort((a, b) => b.date.seconds - a.date.seconds));

  useEffect(() => {
    const ordersCollection = collection(db, "orders");

    getDocs(ordersCollection)
      .then((res) => {
        const newArray = res.docs.map((order) => ({
          ...order.data(),
          id: order.id,
        }));
        setMyOrders(newArray);
      })
      .catch((error) => console.log(error));
  }, []);

  const formatDate = (seconds) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(seconds * 1000).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <OrdersWrapper>
        {myOrders
          .filter((order) => order.items && order.items.length > 0) // Filter out orders with empty items
          .sort((a, b) => b.date.seconds - a.date.seconds) // Sort by date in descending order
          .map((order) => (
            <OrderContainer key={order.id}>
              <TableContainer  component={Paper}>
                <Table
                  aria-label="simple table"
                  sx={{
                    borderLeft: "1px solid darkgrey",
                    borderRight: " 1px solid darkgrey",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCellTitle sx={{ padding: "0!important" }}>
                        <OrderDate>{formatDate(order.date.seconds)}</OrderDate>
                      </TableCellTitle>
                      <TableCellTitle>Title</TableCellTitle>
                      <TableCellTitle>Color</TableCellTitle>
                      <TableCellTitle>Size</TableCellTitle>
                      <TableCellTitle>Quantity</TableCellTitle>
                      <TableCellTitle>Price</TableCellTitle>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?.items?.map((product, index) => (
                      <TableRow key={product.id}>
                        <TableCellData>
                          <OrderImg
                            src={product.img[0]}
                            alt={`Item ${product.id}`}
                          />
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
                          ${order?.item_price?.[index]?.unit_price}
                        </TableCellData>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer >
              <AllOrderInfo>
                <BuyerInfoContainer>
                  <BuyerInfo>
                    <BuyerTitle>Client Details:</BuyerTitle>
                    <Data>
                      Name: <Span>{order?.buyer?.name}</Span>
                    </Data>
                    <Data>
                      Email:{" "}
                      <Span style={{ textTransform: "lowercase" }}>
                        {order?.buyer?.email}
                      </Span>
                    </Data>
                    <Data>
                      Phone: <Span>{order?.buyer?.phone}</Span>
                    </Data>
                  </BuyerInfo>
                  <ShippingInfo>
                    <Data>
                      City: <Span>{order?.buyer?.ciudad}</Span>
                    </Data>
                    <Data>
                      Post Code: <Span>{order?.buyer?.cp}</Span>
                    </Data>
                    <Data>
                      Address: <Span>{order?.buyer?.direccion}</Span>
                    </Data>
                  </ShippingInfo>
                </BuyerInfoContainer>
                <OrderCost>
                  <DataCost style={{ fontSize: ".9rem" }}>
                    Shipment Cost:{" "}
                    <SpanCost
                      style={{ fontSize: ".9rem", paddingLeft: "21px" }}
                    >
                      {" "}
                      $ {order.shipment_cost}
                    </SpanCost>
                  </DataCost>
                  <DataCostTotal>
                    Total Amount: <SpanCost>$ {order.total}</SpanCost>
                  </DataCostTotal>
                </OrderCost>
              </AllOrderInfo>
            </OrderContainer>
          ))}
      </OrdersWrapper>
    </>
  );
};
const OrdersWrapper = styled.div`
  margin-top: 25px;
  height: 1300px;
  box-shadow: 0px -3px 1px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  @media (max-width:750px){
    width: 100%;
  }
`;

const OrderContainer = styled.div`
  display: flex;
  padding: 10px 8px 70px;
  margin-bottom: 70px;
  flex-direction: column;
  border-bottom: 1px solid black;
  width: 750px;
  @media (max-width:750px){
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
  padding: 16px 0px !important;
  text-align: center !important;
`;
const OrderImg = styled.img`
  width: 100%;
  max-width: 80px;
  min-width: 40px;
  height: auto;
  margin: 0px 0 0 55px;
  @media (max-width: 600px) {
    margin: 0px 0px 0px 25px;
  }
`;
const AllOrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 31px 0px 29px;
  border-left: 1px solid darkgrey;
  border-right: 1px solid darkgrey;
`;
const BuyerInfoContainer = styled.div`
  display: flex;
  width: max-content;
`;
const BuyerTitle = styled.h2`
  width: 140px;
  font-weight: 900;
  text-transform: capitalize;
  font-size: 1.1rem;
  text-decoration: underline;
`;
const BuyerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 38px 10px 3px 30px;
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
    width: 70%;
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
  padding: 15px 0 4px 20px;
  border-left: 1px solid darkgrey;
  gap: 2rem;
  justify-content: center;
`;
