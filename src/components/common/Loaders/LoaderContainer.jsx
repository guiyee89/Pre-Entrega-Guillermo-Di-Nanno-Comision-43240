import styled from "styled-components/macro";
import { BarLoader } from "react-spinners";

export const LoaderContainer = () => {
  return (
    <LoaderWrapper>
      <BarLoader color="#12352e"  width={250}/>
    </LoaderWrapper>
  );
};
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;
