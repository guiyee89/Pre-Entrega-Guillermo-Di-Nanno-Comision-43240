import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components/macro";
import { AuthContext } from "../../../../context/AuthContext";
import { db } from "../../../../../firebaseConfig";

export const AdminOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useContext(AuthContext);

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

  return (
    <>
      <OrdersWrapper>
        <Title>Ordenes de compra</Title>
        <WelcomeTitle>Welcome user {user.email}</WelcomeTitle>
        {myOrders
          .filter((order) => order.items && order.items.length > 0) // Filter out orders with empty items
          .sort((a, b) => b.date.seconds - a.date.seconds) // Sort by date in descending order
          .map((order) => (
            <OrderContainer key={order.id}>
              {order?.items?.map((product) => (
                <ProductData key={product.id}>
                  <OrderImg src={product.img[0]} />
                  <h2>{product.title}</h2>
                  <h3>Quantity: {product.quantity}</h3>
                </ProductData>
              ))}
              <BuyerInfoContainer>
                <h2>Buyer Info:</h2>
                <p>Email: {order.email}</p>
                <p>Name: {order?.buyer?.name}</p>
                <p>Address: {order?.buyer?.direccion}</p>
                <p>Phone: {order?.buyer?.phone}</p>
                {/* Add more properties as needed */}
              </BuyerInfoContainer>
              <h2>
                Date: {new Date(order.date.seconds * 1000).toLocaleDateString()}
              </h2>
              <h4>El total de la orden es ${order.total}</h4>
            </OrderContainer>
          ))}
      </OrdersWrapper>
    </>
  );
};
const OrdersWrapper = styled.div`
  margin-top: 50px;
`;
const Title = styled.h1`
  margin: 20px 0;
`;
const WelcomeTitle = styled.h2`
  margin: 20px 0;
`;
const OrderContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;
const ProductData = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`;
const OrderImg = styled.img`
  width: 50%;
`;
const BuyerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
