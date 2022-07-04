import styled from 'styled-components';
import { useState } from 'react';
import Responsive from '../config/Responsive';
import { VariationSize } from '../domain/shop';

export type SizeType = {
    id: number,
    size_name: string,
}

type Props = {
    sizes: VariationSize[],
    style?: {[s: string]: any}
    defaultSelected?: string | number;
    onSelectedChange?: Function,
};

type ItemProps = {
    selected: boolean,
};

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
`;


const Item = styled.div`
    height: 88px;
    width: 88px;
    color: ${(props: ItemProps)=> props.selected? 'white': 'var(--text-color)'};
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${(props: ItemProps)=> !props.selected? 'solid .2rem rgba(28, 28, 28, 0.08)': 'none'};
    background-image: ${(props: ItemProps)=> props.selected? 'linear-gradient(to right, #22D5AE, #3A7BD5)' : 'none'};
    cursor: pointer;
    border-radius: 14px;
    box-sizing: border-box;
    font-size: 24px;
    font-family: fira-go;
    font-weight: 500;  
        ${Responsive.mobile}{
            font-size: 16px;
            height: 63px;
            width: 63px;
        }
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
                {sizes?.map((s, i)=>
                    <Item key={i}
                        selected={selected===s.id}
                        onClick={()=>_sizeSelected(s.id)}>
                        {s.size_variation.size_name}
                    </Item>
                )}
            </Wrapper>
        </>
    )
}

export default SizeSelector;
