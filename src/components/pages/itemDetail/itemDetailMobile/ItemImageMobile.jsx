import { useState, useEffect, useContext } from "react";
import styled from "styled-components/macro";
import Carousel from "react-bootstrap/Carousel";
import NextButtonSVG from "../../../../assets/arrow-right-336-svgrepo-com.svg";
import PrevButtonSVG from "../../../../assets/arrow-left-335-svgrepo-com.svg";
import { GlobalToolsContext } from "../../../context/GlobalToolsContext";
import { ClipLoader } from "react-spinners";
import { LoadingTopBar } from "../../../common/loadingTopBar/LoadingTopBar";

export const ItemImageMobile = ({ filteredItem, selectedItem }) => {
  const [selectedImage, setSelectedImage] = useState({});
  const [imagesToRender, setImagesToRender] = useState([]);
  
  const {
    progress,
    setProgress,
    setVisible,
    visible,
    imgLoader,
    setImgLoader,
    filterLoading,
    setFilterLoading,
  } = useContext(GlobalToolsContext);

  useEffect(() => {
    if (selectedItem) {
      setImagesToRender(selectedItem.img.slice(0, 5));
      setSelectedImage({ image: selectedItem.img[0], index: 0 });
    }
  }, [selectedItem]);

  useEffect(() => {
    if (filteredItem && Object.keys(filteredItem).length > 0) {
      setImagesToRender(filteredItem.img.slice(0, 5));
      setSelectedImage({ image: selectedItem.img[0], index: 0 });
    }
  }, [filteredItem]);

  const handleImageSwitch = (newIndex) => {
    setSelectedImage({ image: imagesToRender[newIndex], index: newIndex });
  };

  const trackImageLoadingProgress = () => {
    const totalImages = imagesToRender.length;
    let loadedImages = 0;

    imagesToRender.forEach((imageSrc) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        loadedImages++;
        if (loadedImages < totalImages) {
          setFilterLoading(true);
        } else {
          setProgress(100);
          setImgLoader(false); // Set loader to false when all images are loaded
          setFilterLoading(false);
        }
      };
    });
  };

  useEffect(() => {
    if (imagesToRender.length > 0) {
      trackImageLoadingProgress();
    } else {
      setProgress(100);
    }
    if(imgLoader === false){
      setVisible(false)
    }
  }, [imagesToRender, setProgress, setVisible]);

  return (
    <>
      {imgLoader === true ? (
        <LoaderContainer>
          <ClipLoader color="#194f44" size={35} />
        </LoaderContainer>
      ) : (
        <Wrapper imgSkeleton="false">
          {/* {progress < 100 && visible === true && imgLoader === true ? (
            <LoadingTopBar />
          ) : ( */}
            <MainImgWrapper>
              <StyledCarousel
                interval={null}
                activeIndex={selectedImage.index}
                onSelect={handleImageSwitch}
              >
                {imagesToRender.map((image, index) => (
                  <CarouselItem key={index}>
                    {filterLoading === true  && imgLoader === true ?(
                      <LoaderContainer>
                        <ClipLoader color="#194f44" size={35} />
                      </LoaderContainer>
                    ) : (
                      <MainImg
                        imgSkeleton="false"
                        src={image}
                        id={
                          selectedItem?.id ||
                          (filteredItem?.id && filteredItem.id)
                        }
                      />
                    )}
                  </CarouselItem>
                ))}
              </StyledCarousel>
            </MainImgWrapper>
          {/* )} */}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  align-items: flex-start;
  position: relative;
`;
const StyledCarousel = styled(Carousel)`
  width: 100%;
  .carousel-inner {
    .carousel-item {
      transition: opacity 0.2s ease, transform 0.18s ease;
    }
  }
  .carousel-indicators [data-bs-target] {
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 25px;
    height: 3px;
    padding: 0px;
    margin-right: 8px;
    margin-left: 7px;
    text-indent: -999px;
    cursor: pointer;
    background-color: #000;
    background-clip: padding-box;
    border: 0;
    border-top: 11px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.3;
    transition: opacity 0.3s ease-in-out;
  }
  .carousel-indicators .active {
    opacity: 1;
  }
  .carousel-control-next {
    right: -10px;
  }
  .carousel-control-next-icon {
    background-image: url(${NextButtonSVG});
  }
  .carousel-control-prev {
    left: -10px;
  }
  .carousel-control-prev-icon {
    background-image: url(${PrevButtonSVG});
  }
`;
const CarouselItem = styled(Carousel.Item)`
  width: 100%;
  aspect-ratio: 1/1;
`;
const MainImgWrapper = styled.div`
  display: flex;
`;
const MainImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border: 1px solid lightgray;
  flex-grow: 1;
`;
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 950px) {
    min-height: ${(props) => (props.imgSkeleton ? "550px" : "550px")};
  }
  @media (max-width: 550px) {
    margin-bottom: 10px;
    width: 95%;
    min-height: ${(props) => (props.imgSkeleton ? "370px" : "370px")};
  }
  @media (max-width: 330px) {
    min-height: ${(props) => (props.imgSkeleton ? "320px" : "320px")};
    width: 100%;
  }
`;
