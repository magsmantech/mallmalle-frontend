import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import styled from "styled-components";

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: .2rem solid rgba(0, 0, 0, 0.08);
    width: 3.8rem;
    height: 3.8rem;
    cursor: pointer;
`;

const Number = styled.span`
    font-size: 2.4rem;
    color: var(--text-color);
    padding: 0 2.0rem;
    font-size: fira-go;
`;

const ItemWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const Quantity: React.FC<{
    value: number;
    onChange: (newValue: number) => void;
    maxAllowed?: number;
}> = ({
    value,
    onChange,
    maxAllowed = 5,
}) => {
    const [quantity, setQuantity] = useState(value);
    const [allowLess, setAllowLess] = useState(true);
    const [allowMore, setAllowMore] = useState(true);

    const setNewQuantityValue = (newQuantity: number) => {
        setQuantity(newQuantity);
        onChange(newQuantity);
    }

    useEffect(() => {
        if (quantity === 1) {
            setAllowLess(false);
        } else if (quantity === maxAllowed) {
            setAllowMore(false);
        } else {
            setAllowMore(true);
            setAllowLess(true);
        }
    }, [quantity])

    const iconColor = (allowed: boolean): string => {
        if (allowed) {
            return '#22D5AE';
        }
        return 'rgba(0, 0, 0, 0.08)'
    }

    return (<>
        <ItemWrapper>
            <IconWrapper onClick={()=>setNewQuantityValue(quantity-1)}>
                <HiMinus size={'1.6rem'} color={iconColor(allowLess)}/>
            </IconWrapper>
            <Number>
                {quantity}
            </Number>
            <IconWrapper onClick={()=>setNewQuantityValue(quantity+1)}>
                <HiPlus size={'1.6rem'} color={iconColor(allowMore)}/>
            </IconWrapper>
        </ItemWrapper>

    </>)
}

export default Quantity;