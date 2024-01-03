import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components/macro";
import { AuthContext } from "../../../../context/AuthContext";
import { db } from "../../../../../firebaseConfig";
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import { ProductsDetails } from "./ProductsDetails";
import { BuyerDetails } from "./BuyerDetails";

export const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);
  /* console.log(myOrders.sort((a, b) => b.date.seconds - a.date.seconds)); */

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

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenProducts = (orderId) => {
    const selectedOrder = myOrders.find((order) => order.id === orderId);
  
    if (selectedOrder) {
      setSelectedItem(selectedOrder);
      setOpen(true);
  
      // Now you have access to selectedOrder.items
      console.log(selectedOrder.items);
    }
  };

  return (
    <>
      <OrdersWrapper>
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
                <TableCellTitle sx={{ width: "160px" }}>
                  Order ID
                </TableCellTitle>
                <TableCellTitle sx={{ width: "115px" }}>Date</TableCellTitle>
                <TableCellTitle sx={{ width: "80px" }}>Products</TableCellTitle>
                <TableCellTitle sx={{ width: "80px" }}>Total</TableCellTitle>
                <TableCellTitle sx={{ width: "160px" }}>
                  Buyer Details
                </TableCellTitle>
              </TableRow>
            </TableHead>
            <TableBody>
              {myOrders
                .filter((order) => order.items && order.items.length > 0) // Filter out orders with empty items
                /*  .sort((a, b) => b.date.seconds - a.date.seconds) */ // Sort by date in descending order
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCellData>{order.id}</TableCellData>
                    <TableCellData sx={{ minWidth: "70px" }}>
                      {formatDate(order.date.seconds)}
                    </TableCellData>
                    <TableCellData>
                      <span
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Open
                        <ArrowDropDownIcon
                          sx={{ marginTop: "-2px" }}
                          onClick={() => handleOpen(order.id)}
                        />
                      </span>
                    </TableCellData>
                    <TableCellData sx={{ minWidth: "70px" }}>
                      $ {order.total}
                    </TableCellData>
                    <TableCellData
                      sx={{
                        textTransform: "capitalize",
                        display: "flex",
                        justifyContent: "space-between",
                        paddingLeft: "40px!important",
                      }}
                    >
                      {order?.buyer?.name}{" "}
                      <span
                        style={{
                          width: "35%",
                          paddingRight: "15px",
                          cursor: "pointer",
                        }}
                      >
                        <TopicOutlinedIcon
                          onClick={() => handleOpen(order.id)}
                        />
                      </span>
                    </TableCellData>
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
            <ProductsDetails
              handleClose={handleClose}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              myOrders={myOrders}
            />
            <BuyerDetails
              handleClose={handleClose}
              selectedItem={selectedItem}
              setMyOrders={setMyOrders}
              myOrders={myOrders}
            />
          </Box>
        </Modal>
      </OrdersWrapper>
    </>
  );
};
const OrdersWrapper = styled.div`
  margin-top: 50px;
  box-shadow: 0px -3px 1px rgba(0, 0, 0, 0.15);
  overflow-x: auto;
  width: 85%;
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
  border-bottom: 5px solid lightgrey !important;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  font-size: 0.975rem;
  font-weight: 600 !important;
`;
const TableCellData = styled(TableCell)`
  padding: 19px 0px !important;
  text-align: center !important;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
