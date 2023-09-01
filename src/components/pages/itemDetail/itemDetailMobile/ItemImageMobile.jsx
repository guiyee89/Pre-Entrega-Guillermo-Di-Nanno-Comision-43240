import { useState, useEffect } from "react";
import styled from "styled-components/macro";

export const ItemImageMobile = ({
  filteredItem,
  selectedItem,
  handleImageChange,
}) => {
  const [selectedImage, setSelectedImage] = useState({});
  const [imagesToRender, setImagesToRender] = useState([]);

  useEffect(() => {
    // When the selectedItem changes, update the imagesToRender state with the selectedItem images
    if (selectedItem) {
      setImagesToRender(selectedItem.img.slice(0, 5));
      setSelectedImage({ image: selectedItem.img[0], index: 0 }); // Set the first image as selected by default
    }
  }, [selectedItem]);

  useEffect(() => {
    // When the filteredItem changes, update the imagesToRender state with the filteredItem images
    if (filteredItem && Object.keys(filteredItem).length > 0) {
      setImagesToRender(filteredItem.img.slice(0, 5));
      setSelectedImage({ image: selectedItem.img[0], index: 0 }); // Set the first image as selected by default
    }
  }, [filteredItem]);

  const handleImageClick = (image, index) => {
    setSelectedImage({ image, index });
    handleImageChange(image, index); // Call the handleImageChange function with the selected image
  };

  return (
    <Wrapper>
      <ImgAsideWrapper>
        {imagesToRender.map((image, index) => (
          <ImgAside
            key={index}
            src={image}
            alt=""
            isSelected={selectedImage.index === index}
            onClick={() => handleImageClick(image, index)}
          />
        ))}
      </ImgAsideWrapper>
      <MainImgWrapper>
        {imagesToRender.map((image, index) => (
          <MainImg
            key={index}
            src={image}
            id={selectedItem?.id || (filteredItem?.id && filteredItem.id)}
            position={index === 0 ? "none" : "absolute"}
            translationDirection={
              selectedImage.index === index
                ? "none"
                : selectedImage.index < index
                ? "translateX(-100%)"
                : "translateX(100%)"
            }
            isVisible={selectedImage.index === index}
          />
        ))}
      </MainImgWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 95%;
  @media (max-width:550px){
    flex-direction: column-reverse;
    margin-bottom: 28px;
  }
`;
const ImgAsideWrapper = styled.aside`
  width: 18.8%;
  height: 18.8%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5px;
  @media (max-width: 550px) {
    flex-direction: row;
    margin-top: 7.5px;
  }
`;

const ImgAside = styled.img`
  cursor: pointer;
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? "rgba(0, 0, 0, 0.55) 0px 0px 3.5px"
      : "rgba(0, 0, 0, 0.65) 0px 0px 3px"};
  border: ${({ isSelected }) => (isSelected ? "1px solid black" : "none")};
  width: ${({ isSelected }) => (isSelected ? "90%" : "84%")};
  height: ${({ isSelected }) => (isSelected ? "86%" : "81%")};
`;
const MainImgWrapper = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const MainImg = styled.img`
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  border: 1px solid lightgray;
  object-fit: cover;
  position: ${({ position }) => position};
  transform: ${({ translationDirection }) => translationDirection};
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  transition: transform 0.18s ease, opacity 0.2s ease;
`;
