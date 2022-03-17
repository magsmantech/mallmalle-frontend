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
const Quantity = () => {
    const [quantity, setQuantity] = useState(1);
    const [allowLess, setAllowLess] = useState(true);
    const [allowMore, setAllowMore] = useState(true);


    useEffect(() => {
        if (quantity === 1) {
            setAllowLess(false);
        } else if (quantity === 5) {
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
            <IconWrapper onClick={()=>setQuantity(quantity-1)}>
                <HiMinus size={'1.6rem'} color={iconColor(allowLess)}/>
            </IconWrapper>
            <Number>
                {quantity}
            </Number>
            <IconWrapper onClick={()=>setQuantity(quantity+1)}>
                <HiPlus size={'1.6rem'} color={iconColor(allowMore)}/>
            </IconWrapper>
        </ItemWrapper>

    </>)
}

export default Quantity;