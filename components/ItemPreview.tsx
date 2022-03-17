import styled from 'styled-components';
import { useState } from 'react';

type TabImageProps = {
    selected: boolean,
}

type Props = {
    images: string[],
};

const Wrapper = styled.div`
    display: flex;
`;

const TabsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin-right: 2.1rem;
`;
const TabImage = styled.img`
  width: 13.4rem;
  height: 13.4rem;
  border-radius: 1.4rem;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  border: ${(props: TabImageProps) => props.selected ? 'solid .3rem #22d2af' : 'none'};
  box-sizing: border-box;
`;

const SelectedImage = styled.img`
  width: 85.7rem;
  height: 82.0rem;
  border-radius: 1.4rem;
  object-fit: cover;
  object-position: center;
  box-sizing: border-box;
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
                        <TabImage src={image} key={index} selected={index === selected} onClick={() => _imageSelected(index)} />
                    )}
                </TabsWrapper>
                <SelectedImage src={images[selected]} />
            </Wrapper>
        </>
    )
}

export default ItemPreview;
