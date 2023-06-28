//Importamos el Custom Hoom para darle funcionalidad a los botones del contador
import { useCount } from "../../hooks/useCount";
import styled from "styled-components/macro";

//Usamos los datos como parametros en ItemCount
export const ItemCount = ({ initial= 1, stock, onAdd }) => {
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
        <AddCartButton onClick={()=>onAdd(count)} disabled={!stock}>
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
  &:hover {
    background-color: gray;
    transition: ease-in-out 0.2s;
  }
`;
const ResetButton = styled.button`
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  width: 50px;
  margin: 0 auto;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: gray;
    transition: ease-in-out 0.2s;
  }
`;
const AddCartButton = styled.button`
  width: 115px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  word-break: break-word;
  cursor: pointer;
  &:hover {
    background-color: gray;
    transition: ease-in-out 0.2s;
  }
`;
const CountNumber = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
`;
