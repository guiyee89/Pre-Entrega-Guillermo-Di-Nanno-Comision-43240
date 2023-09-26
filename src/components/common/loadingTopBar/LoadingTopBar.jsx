import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalToolsContext } from "../../context/GlobalToolsContext";
import styled from "styled-components/macro";

export const LoadingTopBar = () => {
  const {
    progress,
    buffer,
    setProgress,
    setBuffer,
    visible,
    setVisible,
    loading
  } = useContext(GlobalToolsContext);


  const progressRef = useRef(() => {});

  let timer = 0;


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
        // const diff2 = Math.random() * 15;
        let newProgress // Ensure progress doesn't exceed 100

        if (loading) { // Cap the progress at 90 when loading is true
          newProgress = Math.min(progress + diff, 85);
          
        } else {  // Allow progress to reach 100 when loading becomes false
          newProgress = Math.min(progress + diff, 100);
        }
        setProgress(newProgress);
        // setBuffer(newProgress + diff2); // Update the buffer progress
      }
    };
  }, [progress, setProgress, visible, /* setBuffer */]);


  useEffect(() => {
    const timer = setInterval(() => { //Set a time progress of the bar
      progressRef.current();
    }, 200);
    return () => {
      clearInterval(timer); // Clear the timer when the component unmounts
    };
  }, []);


  useEffect(() => {
    if(loading === false){ //Set bar to 100% after loading is falsy
      setProgress(100)
    }
  },[loading])

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
