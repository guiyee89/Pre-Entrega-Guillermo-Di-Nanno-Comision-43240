import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalToolsContext } from "../../context/GlobalToolsContext";
import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";

export const LoadingTopBar = () => {
  const {
    progress,
    buffer,
    setProgress,
    setBuffer,
    visible,
    setVisible,
    loading,
  } = useContext(GlobalToolsContext);

  const progressRef = useRef(() => {});
  let timer = 0;
  // Control the visibility of the progress bar
  const location = useLocation();

  useEffect(() => {
    progressRef.current = () => {
      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          if (loading === false) {
            setProgress(0);
            setBuffer(10);
            setVisible(false); // Hide the progress bar
          }
        }, 300);
      } else {
        const diff = Math.random() * 12;
        const diff2 = Math.random() * 15;
        const newProgress = Math.min(progress + diff, 100); // Ensure progress doesn't exceed 100
        setProgress(newProgress);
        setBuffer(newProgress + diff2); // Update the buffer progress
      }
    };
  }, [progress, setProgress, setBuffer, visible]);

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 200);

    return () => {
      clearInterval(timer); // Clear the timer when the component unmounts
    };
  }, []);


  return (
    <BoxLoader sx={{ width: "100%" }}>
      {visible && ( // Render the progress bar only if it's visible
        <LinearProgress
          variant="determinate"
          value={progress}
          valueBuffer={buffer}
          color="inherit"
          sx={{ height: "4px", color: "#333" }}
        />
      )}
    </BoxLoader>
  );
};

const BoxLoader = styled(Box)`
  position: fixed;
  top: 0;
  z-index: 9999;
`;
