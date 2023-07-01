import styled from "styled-components/macro";
import { ClipLoader } from "react-spinners";

export const LoaderCircle = () => {
  return (
    <LoaderWrapper>
      <ClipLoader color="#36d7b7" width={200}/>
    </LoaderWrapper>
  );
};
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;
