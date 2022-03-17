import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import Item from "./cartItem";
import Quantity from "./quantity";
import { ChipWrapper, ChipTitle } from "./styled/Chips";

const Grid = styled.div`
display: grid;
row-gap: 5.0rem;
grid-template-columns: repeat(4, 1fr);
width: 100%;
margin-right: 1.5rem;
height: min-content;
`;

const Headers = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 4.4rem;
    /* border-bottom: .1rem solid rgba(33, 114, 129, 0.3); */
`;

const HeaderItem = styled.div`
    display: inline-flex;
    /* width: 100%; */
    font-size: 1.8rem;
    font-weight: 500;
    font-family: fira-go;
    color: var(--text-color);
    opacity: 0.5;
    /* border-bottom: .1rem solid rgba(33, 114, 129, 0.3); */
    /* padding-bottom: 2.4rem; */
`;

const ItemFlexWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 3.3rem 0;
    border-bottom: .1rem solid rgba(33, 114, 129, 0.3);
    &:last-of-type {
        border-bottom: none;
    }

`;

const Price = styled.span`
color: var(--text-color);
font-size: 2.4rem;
font-family: fira-go;
font-weight: 600;
`;

const OldPrice = styled(Price)`
text-decoration: line-through;
opacity: 0.3;
margin-top: 0.3rem;
`;

const Container = styled.div`
display: flex;
justify-content: stretch;
width: 100%;
`;


const Number = styled.span`
    font-size: 2.4rem;
    color: var(--text-color);
    margin-right: 24.3rem;
    font-family: fira-go;
`;

type BgProps = {
    color?: string;
    backgroundColor?: string,
}

type Status = 'success' | 'warning' | 'error';
type colorItem = {
    text: string;
    bg: string;
}
type allColor = {
    success: colorItem,
    warning: colorItem,
    error: colorItem,
};

type itemType = {
    name: String,
    size: string,
    color: string,
    quantity: number,
    status: Status,
    statusLabel: string,
};


export const Badge = styled.div`
    border-radius: 2.2rem;
    width: 20.5rem;
    height: 4.3rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${(prop: BgProps) => prop.backgroundColor ?? 'rgba(34, 213, 174, .21)'};
    color: ${(prop: BgProps) => prop.color ?? '#22D5AE'};
    font-size: 1.6rem;
    font-family: 'helvetica';
    font-weight: 700;
    /* font-family: fira-go; */
    flex-shrink: 0;
`;

const IconWrapper = styled.div`
    height: 5.4rem;
    width: 5.4rem;
    background-color: rgba(224, 224, 224, .3);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.4rem;
    cursor: pointer;
    &:hover {
        background-color: rgba(224, 224, 224, 1);
    }
`;

export default function OrdersList() {
    const items: itemType[] = [
        {
            name: 'Reima Overalls',
            size: 'XL',
            color: 'ლურჯი',
            quantity: 2,
            status: 'success',
            statusLabel: 'დადასტურებული',
        },
        {
            name: 'Reima Overalls',
            size: 'XL',
            color: 'ლურჯი',
            quantity: 2,
            status: 'warning',
            statusLabel: 'პროცესში',
        },
        {
            name: 'Reima Overalls',
            size: 'XL',
            color: 'ლურჯი',
            quantity: 2,
            status: 'error',
            statusLabel: 'გაუქმებული',
        },
    ];

    const colors: allColor = {
        success: {
            text: '#22D5AE',
            bg: 'rgba(34, 213, 174, .21)',
        },
        warning: {
            text: 'rgba(213, 213, 34, 1)',
            bg: 'rgba(213, 213, 34, .21)',
        },
        error: {
            text: 'rgba(213, 34, 34, 1)',
            bg: 'rgba(213, 34, 34, .21)',
        },
    }

    return (<>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100.0rem' }}>
            <div style={{display: 'flex', marginBottom: '3.2rem', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <div style={{ display: 'flex' }}>
                <ChipWrapper style={{ marginRight: '2.0rem' }}>
                    <ChipTitle style={{ margin: '0 .8rem' }}>დადასტურებული</ChipTitle>
                </ChipWrapper>

                <ChipWrapper style={{ marginRight: '2.0rem' }} color={'rgba(34, 213, 174, .25)'}>
                    <ChipTitle style={{ margin: '0 .8rem' }}>პროცესში</ChipTitle>
                </ChipWrapper>
                <ChipWrapper style={{ marginRight: '2.0rem' }}>
                    <ChipTitle style={{ margin: '0 .8rem' }}>გაუქმებული</ChipTitle>
                </ChipWrapper>
            </div>
            <span style={{fontSize: '1.6rem', color: 'var(--text-color)', opacity: 0.8, fontWeight: 500}}>სულ მოიძებნა: <span style={{fontWeight: 700,  fontFamily: 'fira-go'}}>12 შეკვეთა</span></span>
            </div>

            {/* <Grid> */}
                <Headers>
                    <HeaderItem style={{marginRight: '36.7rem'}}>პროდუქტი</HeaderItem>
                    <HeaderItem style={{marginRight: '24.3rem'}}>რაოდენობა</HeaderItem>
                    <HeaderItem style={{marginRight: '44.1rem'}}>ფასი</HeaderItem>
                    <HeaderItem>სტატუსი</HeaderItem>
                </Headers>
                {items.map((item, i) => <>
                    <ItemFlexWrapper key={i}>
                    <Item style={{marginRight: '10.5rem'}}  name={item.name} size={item.size} color={item.color} />
                    <Number>{item.quantity}x</Number>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '8.0rem', alignItems: 'flex-end', marginRight: '33.0rem' }}>
                        <Price>$79.90</Price>
                        <OldPrice>$123.90</OldPrice>
                    </div>

                    <Badge color={colors[item.status]?.text} style={{marginRight: '33.9rem'}} backgroundColor={colors[item.status]?.bg}>{item.statusLabel}</Badge>
                    <Link href="/history">
                        <IconWrapper>
                            <BsArrowRight size={'2.0rem'} color={'#3A7BD5'} />
                        </IconWrapper>
                    </Link>
                    </ItemFlexWrapper>
                    {/* <div></div> */}
                </>)}
            {/* </Grid> */}
        </div>

    </>)
};
