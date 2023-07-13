import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BarLoader } from "react-spinners";
import styled from "styled-components/macro";

export const GlobalLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return loading ? (
    <Wrapper>
      <BarLoader color="#12352e" width={250} />
    </Wrapper>
  ) : (
    children
  );
};
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-left: 85px;
`