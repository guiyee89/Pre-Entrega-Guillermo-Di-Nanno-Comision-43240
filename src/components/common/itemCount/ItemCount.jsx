//Importamos el Custom Hoom para darle funcionalidad a los botones del contador
import { useCount } from "../../hooks/useCount";
import styled from "styled-components/macro";

//Usamos los datos como parametros en ItemCount
export const ItemCount = ({ initial, stock, onAdd }) => {
  //Recibimos la data del contador y los productos del padre ProductDetail
  const { count, increment, decrement, reset } = useCount(initial, stock);

  return (
    <>
      <Wrapper>
        <Wrapper2>
          <CountButton onClick={decrement}>-</CountButton>
          <CountNumber> {count} </CountNumber>
          <CountButton onClick={increment}>+</CountButton>
          <ResetButton onClick={reset}>Reset</ResetButton>
        </Wrapper2>
        <AddCartButton onClick={() => onAdd(count)} disabled={!stock}>
          {" "}
          Add to Cart{" "}
        </AddCartButton>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  /* margin: 0 auto; */
`;
const Wrapper2 = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 16px;
`;
const CountButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover{
    background-color: gray;
    transition: ease-in-out .2s;
  }
`;
const ResetButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover{
    background-color: gray;
    transition: ease-in-out .2s;
  }

`;
const AddCartButton = styled.button`
  width: 120px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover{
    background-color: gray;
    transition: ease-in-out .2s;
  }
`;
const CountNumber = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
`;
