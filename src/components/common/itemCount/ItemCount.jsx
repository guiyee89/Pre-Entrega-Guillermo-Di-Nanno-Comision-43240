//Importamos el Custom Hoom para darle funcionalidad a los botones del contador
import { useCount } from "../../hooks/useCount"
import styled from 'styled-components/macro'

//Usamos los datos como parametros en ItemCount
export const ItemCount = ({initial, stock, onAdd}) => {

    //Recibimos la data del contador y los productos del padre ProductDetail
    const { count, increment, decrement, reset } = useCount(initial, stock)

  return (
    <>
        <Wrapper>
            <CountButton onClick={decrement}>-</CountButton>
            <CountButton onClick={increment}>-</CountButton>
            <ResetButton onClick={reset}>-</ResetButton>
            <AddCartButton onClick={() => onAdd(count)} disabled={!stock} > Add to Cart </AddCartButton>
        </Wrapper>

    </>
  )
}
const Wrapper = styled.div`

`;
const CountButton = styled.button`

`;
const ResetButton = styled.button`

`;
const AddCartButton = styled.button`

`;
