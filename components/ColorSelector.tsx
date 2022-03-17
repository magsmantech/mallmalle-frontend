import styled from 'styled-components';
import { useState } from 'react';
import { ColorType } from '../interfaces/products';

type Props = {
    colors: ColorType[],
    small?: boolean,
    gap?: string;
    style?: {[s: string]: any},
    onColorSelected?: Function,
    defaultSelected?: string | number;
};

type ItemProps = {
    selected: boolean,
    color: string,
    small?: boolean,
};

type WrapperProps ={
    gap?: string;
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    & > div {
        margin-right: ${(props: WrapperProps)=> props.gap?? '1.0rem'};
    }
    & > div:last-child {
        margin-right: 0;
    }
`;

const Item = styled.div`
    height: ${(props: ItemProps)=> props.small && !props.selected? '2.8rem': '4.4rem'};
    width: ${(props: ItemProps)=> props.small && !props.selected? '2.8rem': '4.4rem'};
    margin: ${(props: ItemProps)=> props.small && !props.selected? '.8rem': '0'};
    background-color: ${(props: ItemProps)=> props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${(props: ItemProps)=> props.selected? 'solid .8rem #22D5AE': props.small? 'none': 'solid .8rem white'};
    cursor: pointer;
    border-radius: ${(props: ItemProps)=> props.small && !props.selected? '1.2rem':props.small&&props.selected?'1.9rem': '1.4rem'};
    box-sizing: border-box;
    box-shadow: .1rem .1rem rgba(0, 0, 0, 0.16);
`;

const ColorSelector = ({ colors, style={}, small, gap, onColorSelected, defaultSelected=0 }: Props) => {

    const [selected, setSelected] = useState(defaultSelected);

    const _colorSelected = (id: number) => {
        setSelected(id);
        if (onColorSelected) {
            onColorSelected(id)
        }
    }
    return (
        <>
            <Wrapper style={{...style}} gap={gap}>
                {colors.map(({color, id}, i)=>
                    <Item key={i} 
                        selected={selected===id} 
                        onClick={()=>_colorSelected(id)} 
                        small={small}
                        color={color}/>
                )}
            </Wrapper>
        </>
    )
}

export default ColorSelector;
