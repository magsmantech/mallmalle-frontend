import styled from 'styled-components';
import { useState } from 'react';
import Responsive from '../config/Responsive';
import { uploadUrl } from '../features/api';

type TabImageProps = {
    selected: boolean,
}

type Props = {
    images: string[],
};

const Wrapper = styled.div`
    display: flex;
    height: 100%;
        ${Responsive.mobile} {
            flex-direction: column-reverse;
        }
`;


const TabImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 14px;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  border: ${(props: TabImageProps) => props.selected ? 'solid 3px #22d2af' : 'none'};
  box-sizing: border-box;
`;
const TabsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-right: 20px;
        ${Responsive.mobile} {
            flex-direction: row;
            overflow-y: scroll;
            padding-bottom: 7px;
            margin-right: 0px;
            margin-top: 12px;
        }
      
`;
const SelectedImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 730px;
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
`;
const ImageWrapperDiv = styled.div`
    width: 100%;
    height: 100%;
`;


const ItemPreview = ({ images }: Props) => {

    const [selected, setSelected] = useState(0);

    const _imageSelected = (index: number) => {
        setSelected(index);
    }
    return (
        <>
            <Wrapper>
                <TabsWrapper>
                    {images.map((image, index) =>
                        <TabImage src={uploadUrl(image)} key={index} selected={index === selected} onClick={() => _imageSelected(index)} />
                    )}
                </TabsWrapper>
                <ImageWrapperDiv>
                    <SelectedImage src={uploadUrl(images[selected])} />
                </ImageWrapperDiv>
            </Wrapper>
        </>
    )
}

export default ItemPreview;
