import styled from "styled-components/macro";
import { PropagateLoader } from "react-spinners";

export const LoaderContainer = () => {
  return (
    <LoaderWrapper>
      <PropagateLoader color="#36d7b7" />
    </LoaderWrapper>
  );
};
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
