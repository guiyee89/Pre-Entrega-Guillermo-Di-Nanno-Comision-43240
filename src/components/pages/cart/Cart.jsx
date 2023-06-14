import styled from "styled-components/macro";

export const Cart = ( {realizarCompra} ) => {

  return (
    <Wrapper>
        <h1>Carrito</h1>
        <button onClick={realizarCompra}>Comprar</button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin: 100px;
    gap: 1rem;
`