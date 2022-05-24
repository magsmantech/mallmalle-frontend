import React from 'react'
import api from '../features/api';
import styled from 'styled-components';
import Link from 'next/link';
import Responsive from '../config/Responsive';
import Item from './cartItem';
import { BsArrowRight } from "react-icons/bs";
import { ChipTitle, ChipWrapper } from './styled/Chips';
import { useRouter } from 'next/router';



const Orders: React.FC<{}> = ({ }) => {

    const { data: myOrders, isLoading: isMyOrdersLoading, refetch: refetchMyOrders, isSuccess: isMyOrdersSucces } = api.useGetMyOrdersQuery(undefined);

    return (
        <Wrapper>
            {myOrders?.map((o, index) => {

                return (
                    <div>
                        <OrderListTopSideWrapper >
                            <OrderListTopSideInsideWrapper>
                                <ChipWrapper>
                                    <ChipTitle>დადასტურებული</ChipTitle>
                                </ChipWrapper>
                                <ChipWrapper color={'rgba(34, 213, 174, .25)'}>
                                    <ChipTitle>პროცესში</ChipTitle>
                                </ChipWrapper>
                                <ChipWrapper>
                                    <ChipTitle>გაუქმებული</ChipTitle>
                                </ChipWrapper>
                            </OrderListTopSideInsideWrapper>
                            <SearchCount>სულ მოიძებნა: <SearchCountText>12 შეკვეთა</SearchCountText></SearchCount>
                        </OrderListTopSideWrapper>

                        <ItemFlexWrapper key={index}>
                            <ItemWrapperStyle>

                                {/* <Item name={item.name} size={item.size} color={item.color} /> */}
                            </ItemWrapperStyle>
                            <NumberWrapperStyle>
                                <Number>x</Number>
                            </NumberWrapperStyle>
                            <PriceWrapperStyle>
                                <Price>$79.90</Price>
                                <OldPrice>$123.90</OldPrice>
                            </PriceWrapperStyle>

                            <BadgeWrapperStyle>
                                {/* <Badge color={colors[item.status]?.text} backgroundColor={colors[item.status]?.bg}>{item.statusLabel}</Badge> */}
                            </BadgeWrapperStyle>
                            <ButtonWrapperStyle>
                                <Link href="/history">
                                    <IconWrapper>
                                        <RightArrowStyle color={'#3A7BD5'} />
                                    </IconWrapper>
                                </Link>
                            </ButtonWrapperStyle>
                        </ItemFlexWrapper>
                    </div>

                )
            })}


            {/* {myOrders?.map((o, index) => (
                <Link href={`/order/${o.id}`} key={index}>
                    <div style={{ display: 'flex' }} key={index} >
                        <h1>{o.id}</h1>
                        <button >
                            {o.status === 1 ? "დადასტურებული" : o.status === 2 ? "გაუქმებული" : o.status === 3 ? "პროცესში" : "დასასრულები"} levani
                        </button>
                    </div>
                </ Link>
            ))} */}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 65px;
`;
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
    margin-bottom: 15px;
        ${Responsive.tabletMobile} {
            display: none;
        }
`;

const HeaderItem = styled.div`
    font-size: 18px;
    font-weight: 500;
    font-family: fira-go;
    color: var(--text-color);
    opacity: 0.5;
    user-select: none;
        &:nth-child(1){
            /* background-color: green; */
            width: 36%;
        }
        &:nth-child(2) {
            /* background-color: aqua; */
            width: 10%;
        }
        &:nth-child(3) {
            /* background-color: yellow; */
            width: 18%;
            text-align: right;
        }
        &:nth-child(4) {
            /* background-color: brown; */
            width: 25%;
            text-align: right;
        }
`;

const ItemFlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 33px 0px;
    border-bottom: 1px solid rgba(33, 114, 129, 0.3);
    /* background-color: red; */
    &:last-of-type {
        border-bottom: none;
    }
        ${Responsive.tabletMobile}{
            flex-direction: column;
        }
`;

const ItemWrapperStyle = styled.div`
    /* background-color: green; */
    width: 36%;
        ${Responsive.tabletMobile}{
            width: 100%;
        }
`;
const NumberWrapperStyle = styled.div`
    /* background-color: aqua; */
    width: 10%;
    display: flex;
    justify-content: center;
        ${Responsive.tabletMobile}{
            display: none;
        }
`;
const PriceWrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* background-color: yellow; */
    width: 18%;
        ${Responsive.tabletMobile}{
            width: fit-content;
            align-items: flex-start;
            margin-left: 150px;
            margin-top: -25px;
        }
        ${Responsive.mobile}{
            margin-left: 88px;
            margin-top: 0px;
        }
`;
const BadgeWrapperStyle = styled.div`
    /* background-color: brown; */
    width: 25%;
    display: flex;
    justify-content: flex-end;
        ${Responsive.tabletMobile}{
            display: none;
        }
`;
const ButtonWrapperStyle = styled.div`
    /* background-color: yellowgreen; */
    width: 10%;
    margin-top: -5px;
        ${Responsive.tabletMobile}{
            display: none;
        }
`;

const IconWrapper = styled.div`
    height: 54px;
    min-width: 54px;
    max-width: 54px;
    background-color: rgba(224, 224, 224, .3);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    cursor: pointer;
    margin-left: auto;
    &:hover {
        background-color: rgba(224, 224, 224, 1);
    }
`;

const Price = styled.span`
    color: var(--text-color);
    font-size: 24px;
    font-family: fira-go;
    font-weight: 600;
`;

const OldPrice = styled(Price)`
    text-decoration: line-through;
    opacity: 0.3;
    margin-top: 5px;
`;

const Container = styled.div`
display: flex;
justify-content: stretch;
width: 100%;
`;


const Number = styled.span`
    font-size: 24px;
    color: var(--text-color);
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
    border-radius: 22px;
    max-height: 43px;
    height: 100vh;
    width: 200px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${(prop: BgProps) => prop.backgroundColor ?? 'rgba(34, 213, 174, .21)'};
    color: ${(prop: BgProps) => prop.color ?? '#22D5AE'};
    font-size: 16px;
    font-family: 'helvetica';
    font-weight: 700;
    flex-shrink: 0;
    user-select: none;
`;


const OrderListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const OrderListTopSideWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 38px;
    width: 100%;
`;
const OrderListTopSideInsideWrapper = styled.div`
    display: flex;
        ${Responsive.tabletMobile}{
            flex-wrap: wrap;
        }
`;
const SearchCount = styled.span`
    font-size: 16px;
    color: var(--text-color);
    opacity: 0.8;
    font-weight: 500;
        ${Responsive.tabletMobile}{
            display: none;
        }
`;
const SearchCountText = styled.span`
    font-size: 16px;
    color: var(--text-color);
    opacity: 0.8;
    font-weight: 700;
    font-family: 'fira-go';
`;

const RightArrowStyle = styled(BsArrowRight)`
    font-size: 22px;
`;


export default Orders