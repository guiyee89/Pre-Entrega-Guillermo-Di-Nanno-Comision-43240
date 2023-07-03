import styled from "styled-components/macro";
import { ClipLoader } from "react-spinners";

export const LoaderCircle = () => {
  return (
    <LoaderWrapper>
      <ClipLoader color="#194f44" size={50}/>
    </LoaderWrapper>
  );
};
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
