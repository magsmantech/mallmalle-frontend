import React, { useState } from 'react';
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import CartItem from "../../components/cartItem";
import Responsive from "../../config/Responsive"
import { Order, } from '../../domain/shop';
import api from "../../features/api";
import Loader from "../../components/Loader";
import { ChipWrapper, ChipTitle } from '../../components/styled/Chips';
import Quantity from '../../components/quantity';
import { useRouter } from 'next/router';
import OrderItemComponent from '../../components/OrderItemComponent';
import { SectionTitle } from '../cart';
import config from "../../config.json";
import { uploadUrl } from '../../features/api';


const OrdersList: React.FC<{ userInfo: Order }> = ({ userInfo }) => {
    const router = useRouter();
    const orderID = parseInt(router.query.id as string);
    console.log("order id --> " + orderID)


    const { data: orderDetail, isLoading: isOrderDetailLoading, refetch: refetchOrderDetail, isSuccess: isOrderDetailSucces } = api.useGetOrderDetailsQuery(orderID);

    const { data: profile, isLoading: isProfileLoading, refetch: refetchProfile, isSuccess: isProfileSucces } = api.useProfileQuery(undefined);
    const { data: products, isLoading: isProductsLoading, refetch: refetchProducts, isSuccess: isProductsSucces } = api.useGetProductsQuery(undefined);
    const { data: myOrders, isLoading: isMyOrdersLoading, refetch: refetchMyOrders, isSuccess: isMyOrdersSucces } = api.useGetMyOrdersQuery(undefined);

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
        success: { //success
            text: '#22D5AE',
            bg: 'rgba(34, 213, 174, .21)',
        },
        warning: { //warning
            text: 'rgba(213, 213, 34, 1)',
            bg: 'rgba(213, 213, 34, .21)',
        },
        error: { //error
            text: 'rgba(213, 34, 34, 1)',
            bg: 'rgba(213, 34, 34, .21)',
        },
    }


    // console.log("order detail --> " + JSON.stringify(orderDetail?.orderItems))



    return isOrderDetailLoading ? (
        <Loader />
    ) : !orderDetail ? (
        <span>Not Found order</span>
    ) : (
        <>
            <OrderListWrapper >
                <OrderListTopSideWrapper >
                    <SectionTitle>ყიდვის ისტორია</SectionTitle>
                   
                    {/* <OrderListTopSideInsideWrapper>
                        <ChipWrapper>
                            <ChipTitle>დადასტურებული</ChipTitle>
                        </ChipWrapper>
                        <ChipWrapper color={'rgba(34, 213, 174, .25)'}>
                            <ChipTitle>პროცესში</ChipTitle>
                        </ChipWrapper>
                        <ChipWrapper>
                            <ChipTitle>გაუქმებული</ChipTitle>
                        </ChipWrapper>
                    </OrderListTopSideInsideWrapper> */}
                    <SearchCount>სულ მოიძებნა: <SearchCountText>{orderDetail.order_items?.length} შეკვეთა</SearchCountText></SearchCount>
                </OrderListTopSideWrapper>
                <Link href={{
                       pathname: '/profile',
                       query: { tab: 'orders-history' },
                    }} >
                        <BackBtnStyle >
                            <IconWrapper>
                                <BsArrowLeft color={'#3A7BD5'} />
                            </IconWrapper>
                            <span>უკან დაბრუნება</span>
                        </BackBtnStyle>
                    </Link>
                <Headers>
                    <HeaderItem>პროდუქტი</HeaderItem>
                    <HeaderItem>რაოდენობა</HeaderItem>
                    <HeaderItem>ფასი</HeaderItem>
                    <HeaderItem>სტატუსი</HeaderItem>
                </Headers>


                {orderDetail.order_items.map((o, index) => {

                    // const ImgScr = o.product.decoded_images[0] ? config.imagesEndpoint + JSON.parse(o.product.decoded_images[0])[0] : "../../asdas";

                    var imgUrl = o.product.decoded_images
                    console.log("first " + imgUrl);

                    return (
                        <ItemFlexWrapper key={index}>
                            <ItemWrapperStyle>
                                <ItemWrapper>
                                    <ItemImg src={uploadUrl(imgUrl[0])} />
                                    <ItemTextWrapper>
                                        <ItemName>{o.product.product_name}</ItemName>
                                        <div><ItemLabel>ზომა:</ItemLabel><ItemValue> {o.variation.size_variation.size_name}</ItemValue></div>
                                        <div><ItemLabel>ფერი:</ItemLabel> <ItemValue>{o.variation.color_variation.color_name}</ItemValue></div>
                                    </ItemTextWrapper>
                                </ItemWrapper>

                            </ItemWrapperStyle>
                            <NumberWrapperStyle>
                                <Number>{o.quantity}x</Number>
                            </NumberWrapperStyle>
                            <PriceWrapperStyle>
                                <Price>{o.discounted_price} ₾</Price>
                                <OldPrice>{o.price} ₾</OldPrice>
                            </PriceWrapperStyle>
                            <BadgeWrapperStyle>
                                <BadgeWrapperStyle>
                                    {/* started: 0 | success: 1 | error: 2 | in_progress: 3 */}
                                    <Badge
                                        color={orderDetail.status === 1 ? "#22D5AE" : orderDetail.status === 2 ? "rgba(213, 34, 34, 1)" : orderDetail.status === 3 ? "rgba(213, 213, 34, 1)" : "white"}
                                        backgroundColor={orderDetail.status === 1 ? "rgba(34, 213, 174, .21)" : orderDetail.status === 2 ? "rgba(213, 34, 34, .21)" : orderDetail.status === 3 ? "rgba(213, 213, 34, .21)" : "gray"}>
                                        {orderDetail.status === 1 ? "დადასტურებული" : orderDetail.status === 2 ? "გაუქმებული" : orderDetail.status === 3 ? "პროცესში" : "დასასრულები"}
                                    </Badge>
                                </BadgeWrapperStyle>
                            </BadgeWrapperStyle>
                            <ButtonWrapperStyle>
                                <Link href={`/history/${orderID}?itemID=${o.id}`}>
                                    <IconWrapper>
                                        <RightArrowStyle color={'#3A7BD5'} />
                                    </IconWrapper>
                                </Link>
                            </ButtonWrapperStyle>
                        </ItemFlexWrapper>
                    )
                })}

            </OrderListWrapper>

        </>)
};




const BackBtnStyle = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: fira-go;
    font-weight: 500;
    color: var(--text-color);
    cursor: pointer;
    margin-bottom: 40px;
    margin-right: auto;
        span {
            padding-left: 20px;
        }
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
    /* padding-top: 65px; */
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
const ItemName = styled.span`
color: var(--text-color);
font-size: 24px;
line-height: 21px;
font-family: fira-go;
font-weight: 600;
margin-bottom: 15px;
  ${Responsive.mobile}{
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 10px;
    padding-right: 30px;
  }
`;

const ItemLabel = styled.span`
color: var(--text-color);
font-size: 18px;
font-family: 'helvetica';
opacity: 0.5;
font-weight: 500;
  ${Responsive.mobile}{
    font-size: 14px;
  }
`;

const ItemValue = styled.span`
color: var(--text-color);
font-size: 18px;
font-weight: 500;
font-family: fira-go ;
  ${Responsive.mobile}{
    font-size: 14px;
  }
`;

const ItemImg = styled.img`
height: 130px;
width: 130px;
border-radius: 14px;
object-fit: cover;
object-position: center;
margin-right: 20px;
min-width: 130px;
  ${Responsive.mobile}{
    height: 78px;
    width: 78px;
    min-width: 78px;
    margin-right: 10px;
  }
`;

const ItemTextWrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 5px;
  ${Responsive.mobile}{
    margin-top: 1px;
  }
`;

const ItemWrapper = styled.div`
display: flex;
width: 100%;

`;

export default OrdersList;
