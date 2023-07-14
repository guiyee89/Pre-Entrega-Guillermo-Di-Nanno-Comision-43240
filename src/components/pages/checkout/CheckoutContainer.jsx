import { Checkout } from "./Checkout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import styled from "styled-components/macro";
import Swal from "sweetalert2";

export const CheckoutContainer = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);

  const [orderId, setOrderId] = useState(null);

  const [confirmPurchase, setConfirmPurchase] = useState(false);

  let total = getTotalPrice();


  const { handleSubmit, handleChange, errors } = useFormik({
    
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: (data) => {
      //Aca creamos la logica del submit
      let order = {
        buyer: data, //la data de initialValues en onSubmit
        items: cart, //el cart de CartContext
        total: total, //el total del CartContext
      };
      //guardamos la orden en una variable
      let ordersCollection = collection(db, "orders");
      addDoc(ordersCollection, order) // usamos el metodo addDoc para guardar la orden
        .then((res) => setOrderId(res.id)); //guardamos el ID de la orden en el setOrderID

      //actualizar informacion del producto despues de la compra
      cart.forEach((product) => {
        updateDoc(doc(db, "products", product.id), {
          stock: product.stock - product.quantity,
        });
      });
      lastConfirm()
      clearCart();
    },

    //que no se valide mientras escribo, sino al hacer submit
    validateOnChange: false,
    //validar los datos
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Este campo es obligatorio")
        .min(3, "Minimo 3 caracteres"),
      email: Yup.string()
        .email("Este campo no corresponde a un email valido")
        .required("Este campo es obligatorio"),
      phone: Yup.string()
        .required("Este campo es obligatorio")
        .min(10, "Debe contener 10 numeros")
        .max(15, "Debe contener 10 numeros"),
    }),
  });

  const lastConfirm = () => {
    // Check if there are any errors in the form
    if (!errors.name && !errors.email && !errors.phone) {
      Swal.fire({
        title: "Confirm Purchase",
        text: "Are you sure you want to confirm the purchase?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setConfirmPurchase(true);
          if(setConfirmPurchase){
            handleSubmit();
          }
        }
      });
    }
  };

  return (
    <>
      <Wrapper>
        {orderId ? (
          <h1>
            Su compra fue exitosa. <br /> El numero de comprobante es: {orderId}{" "}
          </h1>
        ) : (
          <Checkout
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            confirmPurchase={confirmPurchase} 
            errors={errors}
          />
        )}
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
