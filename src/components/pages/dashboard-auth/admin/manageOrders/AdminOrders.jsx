import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components/macro";
import { AuthContext } from "../../../../context/AuthContext";
import { db } from "../../../../../firebaseConfig";

export const AdminOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(myOrders);

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
              <h2>
                Date: {new Date(order.date.seconds * 1000).toLocaleDateString()}
              </h2>
              <ProductContainer>
                {order?.items?.map((product) => (
                  <>
                    <ProductData key={product.id}>
                      <OrderImg src={product.img[0]} />
                      <ProductInfo>
                        <h2>{product.title}</h2>
                        <p>Qty: {product.quantity}</p>
                        <p>Color: {product.color}</p>
                        <p>Size: {product.size}</p>
                      </ProductInfo>
                    </ProductData>
                  </>
                ))}
              </ProductContainer>
              <BuyerInfoContainer>
                <h2>Client Details:</h2>
                <p>Name: {order?.buyer?.name}</p>
                <p>Email: {order?.buyer?.email}</p>
                <p>City: {order?.buyer?.ciudad}</p>
                <p>Post Code: {order?.buyer?.cp}</p>
                <p>Address: {order?.buyer?.direccion}</p>
                <p>Phone: {order?.buyer?.phone}</p>
                {/* Add more properties as needed */}
              </BuyerInfoContainer>

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
  flex-direction: column;
`;
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const ProductData = styled.div`
  display: flex;
`;
const ProductInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;
const OrderImg = styled.img`
  width: 10%;
`;
const BuyerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
`;
