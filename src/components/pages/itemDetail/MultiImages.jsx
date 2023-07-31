import styled from "styled-components/macro";

export const MultiImages = ({filteredItem, selectedItem}) => {

  return (
    <Wrapper>
        <Image src={selectedItem.img[1]} alt="" />
        <Image src={selectedItem.img[2]} alt="" />
        <Image src={selectedItem.img[3]} alt="" />
    </Wrapper>
  )
}
const Wrapper = styled.div`

`
const Image = styled.img`
box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 1.3px;
margin-top: 20px;
`