import styled from 'styled-components/macro'

export const ItemListContainer = ( {greeting} ) => {
    
  return (
    <Titulo>{greeting}</Titulo>
  )
}
const Titulo = styled.h1`
    font-size: 3rem;
    color: black;
    margin: 0 auto;
`;