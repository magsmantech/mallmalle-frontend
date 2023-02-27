import styled from 'styled-components';
import { useState } from 'react';
import Responsive from '../config/Responsive';
import { uploadUrl } from '../features/api';

type TabImageProps = {
    selected: boolean,
}

type Props = {
    images: string[],
    mainImage: string,
    setMainImage: Function
};

const ItemPreview = ({ images, mainImage, setMainImage }: Props) => {

    const [selected, setSelected] = useState(0);

    const _imageSelected = (index: number, imageString: string) => {
        setSelected(index);
        setMainImage(imageString)
    }
    return (
        <>
            <Wrapper>
                <TabsWrapper>
                    {images?.map((image, index) =>
                        <TabImage 
                          src={uploadUrl(image)} 
                          key={index} 
                          selected={index === selected} 
                          onClick={() => _imageSelected(index, image)} />
                    )}
                </TabsWrapper>
                <ImageWrapperDiv>
                    <SelectedImage 
                      src={mainImage ? 'https://mallmalle-images.s3.eu-central-1.amazonaws.com/' + mainImage : uploadUrl(images[selected])} />
                </ImageWrapperDiv>
            </Wrapper>
        </>
    )
}

export default ItemPreview;


const Wrapper = styled.div`
  display: flex;
  height: 100%;
  gap: 20px;
    ${Responsive.mobile} {
        flex-direction: column-reverse;
    }
`;


const TabImage = styled.img`
  width: 100%;
  /* height: 130px; */
  border-radius: 14px;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  border: ${(props: TabImageProps) => props.selected ? 'solid 3px #22d2af' : 'none'};
  box-sizing: border-box;
  ${Responsive.laptop} {
    width: 90px;
    height: 90px;
    border-radius: 12px;
    border: ${(props: TabImageProps) => props.selected ? 'solid 2px #22d2af' : 'none'};
}
`;
const TabsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    gap: 25px;
    /* margin-right: 20px; */
        ${Responsive.mobile} {
            flex-direction: row;
            overflow-y: scroll;
            padding-bottom: 7px;
            margin-right: 0px;
            margin-top: 12px;
        }
        ${Responsive.laptop} {
            margin-right: 15px;
        }
      
`;
const SelectedImage = styled.img`
  width: 100%;
  /* height: 100%; */
  /* max-height: 730px; */
  border-radius: 14px;
  object-fit: cover;
  object-position: center;
  box-sizing: border-box;
    ${Responsive.mobile} {
        min-height: 400px;
        margin-right: 15px;
        &:last-child {
            margin-right: 0px;
        }
    }
    ${Responsive.laptop} {
        /* max-height: 485px; */
        width: 100%;
        border-radius: 10px;
    }
`;
const ImageWrapperDiv = styled.div`
    width: 80%;
    height: 100%;
    @media(max-width: 768px) {
        width: 100%;
    }
`;
