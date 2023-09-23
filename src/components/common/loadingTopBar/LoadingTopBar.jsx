import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalToolsContext } from "../../context/GlobalToolsContext";
import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";

export const LoadingTopBar = () => {
  const { progress, buffer, setProgress, setBuffer, visible, setVisible } = useContext(GlobalToolsContext);

  const progressRef = useRef(() => {});
  let timer = 0;
   // Control the visibility of the progress bar
  const location = useLocation();

  useEffect(() => {
    progressRef.current = () => {
      if (progress >= 100) {
        clearInterval(timer); 

        setTimeout(() => {
          setProgress(0);
          setBuffer(12);
          setVisible(false); // Hide the progress bar
        }, 250); 
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 12;
        const newProgress = Math.min(progress + diff, 100); // Ensure progress doesn't exceed 100
        setProgress(newProgress);
        setBuffer(newProgress + diff2); // Update the buffer progress
      }
    };
  }, [progress, setProgress, setBuffer]);

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 400);

    return () => {
      clearInterval(timer); // Clear the timer when the component unmounts
    };
  }, []);

  // Listen for navigation changes and show the progress bar
  useEffect(() => {
    setVisible(true);
  }, [location]);

  return (
    <BoxLoader sx={{ width: "100%"}}>
      {visible && ( // Render the progress bar only if it's visible
        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color='inherit'  sx={{ height: "6px", color:"#333" }} />
      )}
    </BoxLoader>
  );
};

const BoxLoader = styled(Box)`
    position: fixed;
    top: 0;
    z-index: 9999;
`