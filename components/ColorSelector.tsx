import styled from 'styled-components';
import { useState } from 'react';
import { ColorType } from '../interfaces/products';
import Responsive from '../config/Responsive';
import { ProductVariationDetail } from '../domain/shop';

type Props = {
    colors: ProductVariationDetail[],
    small?: boolean,
    gap?: string;
    style?: { [s: string]: any },
    onColorSelected?: Function,
    defaultSelected?: string | number;
};

type ItemProps = {
    selected: boolean,
    color: string,
    small?: boolean,
};

type WrapperProps = {
    gap?: string;
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
     & > div {
        margin-right: ${(props: WrapperProps) => props.gap ?? '1.0rem'};
    }
    & > div:last-child {
        margin-right: 0;
    }
    /* ${Responsive.laptop} {
        margin-top: -15px;
        & > div {
            margin-right: 0.8rem};
        }
    } */
`;

const Item = styled.div`
    height: ${(props: ItemProps) => props.small && !props.selected ? '44px' : '44px'};
    width: ${(props: ItemProps) => props.small && !props.selected ? '44px' : '44px'};
    margin: ${(props: ItemProps) => props.small && !props.selected ? '20px' : '0'};
    background-color: ${(props: ItemProps) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${(props: ItemProps) => props.selected ? 'solid 8px #22D5AE' : props.small ? 'none' : 'solid 8px white'};
    cursor: pointer;
    border-radius: ${(props: ItemProps) => props.small && !props.selected ? '1.2rem' : props.small && props.selected ? '14px' : '14px'};
    box-sizing: border-box;
    box-shadow: .1rem .1rem rgba(0, 0, 0, 0.16);

        ${Responsive.mobile} {
            height: ${(props: ItemProps) => props.small && !props.selected ? '37px' : '37px'};
            width: ${(props: ItemProps) => props.small && !props.selected ? '37px' : '37px'};
            margin: ${(props: ItemProps) => props.small && !props.selected ? '15px' : '0'};
        }
        ${Responsive.laptop} {
            height: ${(props: ItemProps) => props.small && !props.selected ? '30px' : '30px'};
            width: ${(props: ItemProps) => props.small && !props.selected ? '30px' : '30px'};
            border: ${(props: ItemProps) => props.selected ? 'solid 5px #22D5AE' : props.small ? 'none' : 'solid 4px white'};
            border-radius: ${(props: ItemProps) => props.small && !props.selected ? '1.2rem' : props.small && props.selected ? '8px' : '8px'};
        }
`;

const ColorSelector = ({ colors, style = {}, small, gap, onColorSelected, defaultSelected = 0 }: Props) => {

    const [selected, setSelected] = useState(defaultSelected);

    const _colorSelected = (id: number) => {
        setSelected(id);
        if (onColorSelected) {
            onColorSelected(id)
        }
    }
    return (
        <>
            <Wrapper style={{ ...style }} gap={gap}>
                {colors.map((item, i) =>
                    <Item key={i}
                        selected={selected === item.id}
                        onClick={() => _colorSelected(item.id)}
                        small={small}
                        color={item.color_variation.color} />
                )}

            </Wrapper>
        </>
    )
}

export default ColorSelector;
