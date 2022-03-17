import styled from 'styled-components';
import { useState } from 'react';

export type SizeType = {
    id: number,
    size_name: string,
}

type Props = {
    sizes: SizeType[],
    style?: {[s: string]: any}
    defaultSelected?: string | number;
    onSelectedChange?: Function,
};

type ItemProps = {
    selected: boolean,
};

const Wrapper = styled.div`
    display: flex;
    gap: 1.0rem;
`;

const Item = styled.div`
    height: 8.8rem;
    width: 8.8rem;
    color: ${(props: ItemProps)=> props.selected? 'white': 'var(--text-color)'};
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${(props: ItemProps)=> !props.selected? 'solid .2rem rgba(28, 28, 28, 0.08)': 'none'};
    background-image: ${(props: ItemProps)=> props.selected? 'linear-gradient(to right, #22D5AE, #3A7BD5)' : 'none'};
    cursor: pointer;
    border-radius: 1.4rem;
    box-sizing: border-box;
    font-size: 2.4rem;
    font-family: fira-go;
    font-weight: 500;  
`;

const SizeSelector = ({ sizes, style={}, onSelectedChange, defaultSelected=0 }: Props) => {

    const [selected, setSelected] = useState(defaultSelected);

    const _sizeSelected = (index: number) => {
        setSelected(index);
        if (onSelectedChange) {
            onSelectedChange(index);
        }
    }
    return (
        <>
            <Wrapper style={{...style}}>
                {sizes.map((size, i)=>
                    <Item key={i}
                        selected={selected===size.id}
                        onClick={()=>_sizeSelected(size.id)}>
                        {size.size_name}
                    </Item>
                )}
            </Wrapper>
        </>
    )
}

export default SizeSelector;
