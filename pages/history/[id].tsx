import { NextPage } from "next/types";
import { SectionTitle } from "../cart";

import styles from '../../styles/History.module.css';
import { ReactElement } from "react";
import { BsArrowLeft, BsStarFill } from "react-icons/bs";
import { Count } from "../catalog";
import styled from "styled-components";
import { Badge } from "../../components/OrdersList";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import Responsive from "../../config/Responsive";
import { useRouter } from "next/router";
import api from "../../features/api";
import Loader from '../../components/Loader';
import { uploadUrl } from './../../features/api';
import ReactHtmlParser from 'react-html-parser';

const Item = () => {
    return (
        <>

        </>
    )

}

const History: NextPage = () => {

    const router = useRouter();
    const orderID = parseInt(router.query.id as string);
    const itemID =  parseInt(router.query.itemID as string);
 

    const { data: orderDetail, isLoading: isOrderDetailLoading, refetch: refetchOrderDetail, isSuccess: isOrderDetailSucces } = api.useGetOrderDetailsQuery(orderID);

    const selectedItem = orderDetail?.order_items?.find(i => i.id === itemID);
    // const selectedItemAddress = orderDetail?.id === selectedItem?.order_id ? return 

    var imgUrl = selectedItem?.product.decoded_images[0];
    // console.log("first " + imgUrl); 

    return isOrderDetailLoading ? <Loader /> : !orderDetail ? (<span>not found</span>) : (
        <>

            <div>
                <SectionStyle className={styles.section}>
                    <div className={styles.container}>
                        <SectionTitle>ყიდვის ისტორია</SectionTitle>
                        <Breadcrumbs>მთავარი / პროდუქტები / ყიდვის ისტორია / Reima Overalls</Breadcrumbs>
                        <Link href={{
                            pathname: `/order/${orderID}`,
                            // query: { tab: 'orders-history' },
                        }} >
                            <div className={styles.backButton}>
                                <IconWrapper>
                                    <BsArrowLeft color={'#3A7BD5'} />
                                </IconWrapper>
                                უკან დაბრუნება
                            </div>
                        </Link>
                        <WrapperStyle className={styles.wrapper}>
                            <ItemWrapper>

                                <ItemWrapperStyle>
                                    <ItemImage src={uploadUrl(imgUrl ? imgUrl : "/assets/123123.png")} />
                                    <div className={styles.itemTextContainer}>
                                        <ItemName>{selectedItem?.product.product_name} {selectedItem?.quantity}x</ItemName>
                                        <StarsWrapper>
                                            <Stars >
                                                <StartIcon color={'#22D5AE'} />
                                                <StartIcon color={'#22D5AE'} />
                                                <StartIcon color={'#22D5AE'} />
                                                <StartIcon color={'#22D5AE'} />
                                                <StartIcon color={'#22D5AE'} />
                                            </Stars>
                                            {/* <ViewCount>402 ნახვა</ViewCount> */}
                                        </StarsWrapper>
                                        <ItemListWrapper>
                                            <ItemLabel>ზომა: </ItemLabel> <ItemValue>{selectedItem?.variation.size_variation.size_name}</ItemValue>
                                        </ItemListWrapper>
                                        <ItemListWrapper>
                                            <ItemLabel>ფერი: </ItemLabel> <ItemValue>{selectedItem?.variation.color_variation.color_name}</ItemValue>
                                        </ItemListWrapper>
                                        <ItemListWrapper>
                                            <ItemLabel>რაოდენობა: </ItemLabel> <ItemValue>{selectedItem?.quantity}x</ItemValue>
                                        </ItemListWrapper>
                                        <Price>₾ {selectedItem?.discounted_price}</Price>
                                        <OldPrice>₾ {selectedItem?.price}</OldPrice>
                                    </div>
                                </ItemWrapperStyle>

                            </ItemWrapper>
                            {/* started: 0 | success: 1 | error: 2 | in_progress: 3 */}
                            <Badge
                                color={orderDetail.status === 1 ? "#22D5AE" : orderDetail.status === 2 ? "rgba(213, 34, 34, 1)" : orderDetail.status === 3 ? "rgba(213, 213, 34, 1)" : "white"}
                                backgroundColor={orderDetail.status === 1 ? "rgba(34, 213, 174, .21)" : orderDetail.status === 2 ? "rgba(213, 34, 34, .21)" : orderDetail.status === 3 ? "rgba(213, 213, 34, .21)" : "gray"}>
                                {orderDetail.status === 1 ? "დადასტურებული" : orderDetail.status === 2 ? "გაუქმებული" : orderDetail.status === 3 ? "პროცესში" : "დასასრულები"}
                            </Badge>
                            <AddressWrapperStyle>

                                <AddressTitle>მისამართი:</AddressTitle>
                                <AddressItem>
                                    <LocationIconStyle />
                                    <div className={styles.addressItemText}>
                                        <div className={styles.city}>{orderDetail.address?.city}</div>
                                        <div className={styles.address}>{orderDetail.address?.address_1}</div>
                                        <div className={styles.zip}>ZIP კოდი: {orderDetail.address?.zip}</div>
                                    </div>
                                </AddressItem>

                            </AddressWrapperStyle>

                            <PayMentMethodWrapper>
                                <AddressTitle>გადახდის მეთოდი</AddressTitle>
                                <PayMentMethod>უნაღდო ანგარიშწორება</PayMentMethod>
                                {/* <div className={styles.paymentMethod}>
                                <img className={styles.paymentIcon} src={'/assets/visa.png'} />
                                <div className={styles.cardNumber}>4332 **** **** **83  </div>
                            </div> */}
                            </PayMentMethodWrapper>
                        </WrapperStyle>

                    </div>

                    <DividerStyle />

                    <DescriptionTitle>
                        დამატებითი ინფორმაცია
                    </DescriptionTitle>
                    <DescriptionText>
                        {selectedItem?.product?.description ? ReactHtmlParser(selectedItem?.product?.description) : null}
                    </DescriptionText>
                </SectionStyle>
            </div>

        </>
    )
}

// styles
const SectionStyle = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;
`;
const ItemLabel = styled.span`
    color: var(--text-color);
    font-size: 1.8rem;
    font-family: 'helvetica';
    opacity: 0.5;
`;
const WrapperStyle = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 47px;
    gap: 15px;
        ${Responsive.tablet} {
            flex-direction: column;
            gap: 35px;
        }
        
        ${Responsive.mobile} {
            flex-direction: column;
            gap: 35px;
            margin-top: 44px;
        }
`;
const ItemValue = styled.span`
    color: var(--text-color);
    font-size: 1.8rem;
    font-family: fira-go;
    font-weight: 500;
`;


const Price = styled.span`
    color: var(--text-color);
    font-size: 32px;
    font-family: fira-go;
    font-weight: 600;
    margin-top: 8px;
        ${Responsive.mobile}{
            margin-top: -83px;
            margin-left: auto;
        }
`;

const OldPrice = styled(Price)`
    text-decoration: line-through;
    font-size: 28px;
    opacity: 0.3;
    margin-top: 0px;
`;


const IconWrapper = styled.div`
    height: 54px;
    width: 54px;
    /* background-color: rgba(224, 224, 224, .3); */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    margin-right: 18px;
    cursor: pointer;
        svg {
            width: 30px;
        }
    &:hover {
        background-color: rgba(224, 224, 224, 1);        
    }
`;

const ItemWrapper = styled.div`
    /* background-color: yellow; */
    
    ${Responsive.mobile}{
        
    }
`;

const BadgeStyle = styled(Badge)`

`;
const AddressTitle = styled.div`
    color: var(--text-color);
    font-size: 18px;
    font-family: 'BPG WEB 002 CAPS';
    margin-bottom: 20px;
    white-space: nowrap;
`;
const AddressItem = styled.div`
    display: flex;
    gap: 14px;
    position: relative;
    max-width: 290px;
`;
const LocationIconStyle = styled(IoLocationSharp)`
    color: var(--text-color);
    min-width: 20px;
    margin-top: 2px;
`;
const PayMentMethod = styled.span`
    font-size: 16px;
    font-family: 'helvetica';
    opacity: 0.5;
`;
const DividerStyle = styled.div`
    display: flex;
    border-bottom: 1px solid rgba(34, 34, 34, .1);
    margin-top: 50px;
    margin-bottom: 30px;
`;
const DescriptionTitle = styled.div`
    font-size: 17px;
    font-family: 'helvetica';
    font-weight: bold;
    color: var(--text-color);
    margin-bottom: 20px;
`;
const DescriptionText = styled.div`
    font-size: 18px;
    line-height: 27px;
    font-family: 'helvetica';
    color: var(--text-color);
`;
const AddressWrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
`;
const PayMentMethodWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

// item
const ItemImage = styled.img`
    object-fit: cover;
    width: 290px;
    height: 290px;
    border-radius: 14px;
    margin-right: 22px;
        ${Responsive.mobile}{
            width: 100%;
            max-height: 350px;
            margin-right: 0px;
            margin-bottom: 34px;
        }
`;
const ItemName = styled.div`
    color: var(--text-color);
    font-family: fira-go;
    font-weight: 600;
    /* background-color: aqua; */
    font-size: 24px;
    margin-bottom: 15px;
    margin-right: 0px;
`;
const StarsWrapper = styled.div`
    /* background-color: yellowgreen; */
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;
const Stars = styled.div`
    display: flex;
`;
const StartIcon = styled(BsStarFill)`
    height: 20px;
    width: 20px;
    margin-right: 10px !important;
        &:last-child {

            margin-right: 0px;
        }
`;
const ViewCount = styled(Count)`
    font-size: 16px;
    margin-left: 15px;
    white-space: nowrap;
`;
const ItemListWrapper = styled.div`
    /* background-color: green; */
    margin-bottom: 14px;
        span {
            font-size: 18px;
        }
        ${Responsive.mobile} {
            width: fit-content;
        }
`;
const ItemWrapperStyle = styled.div`
    display: flex;
        ${Responsive.mobile}{
            flex-direction: column;
        }
`;

const Breadcrumbs = styled.span`
    color: var(--text-color);
    font-size: 16px;
    font-family: 'helvetica';
    opacity: 0.8;
`;


export default History;



