import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import styled from "styled-components";
import Responsive from "../config/Responsive";

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.08);
    width: 38px;
    height: 38px;
    cursor: pointer;
        ${Responsive.mobile}{
            width: 30px;
            height: 30px;
        }
`;
const MinusIcon = styled(HiMinus)`
    font-size: 18px;
`;
const PlusIcon = styled(HiPlus)`
    font-size: 18px;
`;

const Number = styled.span`
    font-size: 24px;
    color: var(--text-color);
    font-size: fira-go;
        ${Responsive.mobile}{
            font-size: 17px;
        }
`;

const ItemWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 140px;
    justify-content: space-between;
        ${Responsive.mobile}{
            max-width: 110px;
        }
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
                <MinusIcon color={iconColor(allowLess)}/>
            </IconWrapper>
            <Number>
                {quantity}
            </Number>
            <IconWrapper onClick={()=>setNewQuantityValue(quantity+1)}>
                <PlusIcon color={iconColor(allowMore)}/>
            </IconWrapper>
        </ItemWrapper>

    </>)
}

export default Quantity;