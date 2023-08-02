import { useState, useEffect } from "react";
import styled from "styled-components/macro";

export const MultiImages = ({
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
      setSelectedImage({}); // Reset selectedImage state when the selectedItem changes
    }
  }, [selectedItem]);

  useEffect(() => {
    // When the filteredItem changes, update the imagesToRender state with the filteredItem images
    if (filteredItem && Object.keys(filteredItem).length > 0) {
      setImagesToRender(filteredItem.img.slice(0, 5));
      setSelectedImage({}); // Reset selectedImage state when the filteredItem changes
    }
  }, [filteredItem]);

  const handleImageClick = (image, index) => {
    setSelectedImage({ image, index });
    handleImageChange(image, index); // Call the handleImageChange function with the selected image
  };

  return (
    <Wrapper>
      <ImgAside>
        {imagesToRender.map((image, index) => (
          <ImagesAside
            key={index}
            src={image}
            alt=""
            isSelected={selectedImage.index === index}
            onClick={() => handleImageClick(image, index)}
          />
        ))}
      </ImgAside>
      <ImgWrapper>
        <MainImage
          src={
            selectedImage.image || // Use the selectedImage state value if it exists
            (Object.keys(filteredItem).length > 0
              ? filteredItem.img[0]
              : selectedItem.img[0])
          }
          id={
            selectedItem?.id ||
            (Object.keys(filteredItem).length > 0 && filteredItem.id)
          }
        />
      </ImgWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  width: 85%;
  margin-left: -35px;
  margin-right: 20px;
`;

const ImagesAside = styled.img`
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? "rgba(0, 0, 0, 0.55) 0px 0px 3.5px"
      : "rgba(0, 0, 0, 0.65) 0px 0px 3px"};
  border: ${({ isSelected }) => (isSelected ? "1px solid black" : "none")};
  width: ${({ isSelected }) => (isSelected ? "95%" : "89%")};
`;
const ImgWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MainImage = styled.img`
  width: 100%;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 1.3px;
`;
const ImgAside = styled.aside`
  width: 18.8%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-right: 10px;
`;
