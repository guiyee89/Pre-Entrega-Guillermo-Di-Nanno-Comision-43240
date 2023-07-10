import styled from "styled-components/macro";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

export const InfoIcons = () => {
  return (
    <>
      <InfoWrapper>
        <LocalShippingOutlinedIcon fontSize="large" />
        <Info>
          <Title>free shipping</Title>
          <Description>On orders $50+ </Description>
        </Info>
      </InfoWrapper>
      <InfoWrapper>
        <SavingsOutlinedIcon fontSize="large" />
        <Info>
          <Title>Up to 40% off</Title>
          <Description>On the Second Unit </Description>
        </Info>
      </InfoWrapper>
      <InfoWrapper>
        <CachedOutlinedIcon fontSize="large" />
        <Info>
          <Title>¿Change Product?</Title>
          <Description>Free up to 30 days </Description>
        </Info>
      </InfoWrapper>
    </>
  );
};
const InfoWrapper = styled.div`
  display: flex;
  padding:20px 85px 40px 60px;
  align-items: center;
`;
const Info = styled.div`
margin-left: 12px;
`
const Title = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 2px;
  line-height: 12px;
`;
const Description = styled.h2`
  letter-spacing: 1.5px;
  font-size: 0.9rem;
`;
