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



const ItemLabel = styled.span`
    color: var(--text-color);
    font-size: 1.8rem;
    font-family: 'helvetica';
    opacity: 0.5;
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
    background-color: rgba(224, 224, 224, .3);
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
    background-color: yellow;
    img {
        width: 290px;
        height: 290px;
        border-radius: 14px;
        margin-right: 22px;
    }
    img + div {
        background-color: red;
            div {
                &:nth-child(1) {// item main title
                    background-color: aqua;
                    font-size: 24px;
                    margin-bottom: 15px;
                    margin-right: 0px !important;
                }
                &:nth-child(2) {// start wrapper
                    background-color: yellowgreen;
                    margin-bottom: 0px !important;
                        div {
                            svg {// star
                                height: 20px;
                                width: 20px;
                                margin-right: 10px !important;
                                    &:last-child {
                                        margin-right: 0px;
                                    }
                            }
                        }
                         span {//view count text
                                font-size: 16px !important;
                                margin-left: 15px;
                                margin-top: -12px;
                                white-space: nowrap;
                            }
                }
                &:nth-child(3) {//size
                    background-color: brown;
                    margin-bottom: 14px !important;
                        span {
                            font-size: 18px;
                        }
                }
                &:nth-child(4) { // color
                    background-color: #616161;
                    margin-bottom: 14px !important;
                        span {
                            font-size: 18px;
                        }
                }
                &:nth-child(5) {// count
                    background-color: #ebebeb;
                    margin-bottom: 14px !important;
                        span {
                            font-size: 18px;
                        }
                }
            }
    }
`;

const BadgeStyle = styled(Badge)`

`;
const AddressTitle = styled.div`
    color: var(--text-color);
    font-size: 18px;
    font-family: 'BPG WEB 002 CAPS';
    margin-bottom: 20px;
`;
const AddressItem = styled.div`
    display: flex;
    gap: 14px;
    position: relative;
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


const History: NextPage = () => {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.container}>
                    <SectionTitle>ყიდვის ისტორია</SectionTitle>
                    <span className={styles.breadcrumbs}>მთავარი / პროდუქტები / ყიდვის ისტორია / Reima Overalls</span>
                    <Link href={{
                        pathname: '/profile',
                        query: { tab: 'orders-history' },
                    }} >
                        <div className={styles.backButton}>
                            <IconWrapper>
                                <BsArrowLeft color={'#3A7BD5'} />
                            </IconWrapper>
                            უკან დაბრუნება
                        </div>
                    </Link>
                    <div className={styles.wrapper}>
                        <ItemWrapper>
                            <Item />
                        </ItemWrapper>
                        <BadgeStyle>დადასტურებული</BadgeStyle>
                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '37.0rem' }}>

                            <AddressTitle>მისამართი:</AddressTitle>
                            <AddressItem>
                                <LocationIconStyle />
                                <div className={styles.addressItemText}>
                                    <div className={styles.city}>Tbilisi</div>
                                    <div className={styles.address}>მუხიანი, ალეკო გობრონიძის #11 / ბინა 177</div>
                                    <div className={styles.zip}>ZIP კოდი: 01103</div>
                                </div>
                            </AddressItem>

                        </div>

                        <div style={{ marginRight: '14.6rem', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '28.9rem' }}>
                            <AddressTitle>გადახდის მეთოდი</AddressTitle>
                            <PayMentMethod>უნაღდო ანგარიშწორება</PayMentMethod>
                            {/* <div className={styles.paymentMethod}>
                                <img className={styles.paymentIcon} src={'/assets/visa.png'} />
                                <div className={styles.cardNumber}>4332 **** **** **83  </div>
                            </div> */}
                        </div>
                    </div>

                </div>

                <div className={styles.divider}>
                </div>

                <div className={styles.descriptionTitle}>
                    დამატებითი ინფორმაცია
                </div>
                <div className={styles.descriptionText}>
                    შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის. შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის
                </div>
            </section>
        </>
    )
}

export default History;

const Item = () => {
    return (
        <>
            <div className={styles.itemWrapper}>
                <img src={'/assets/123123.png'} className={styles.itemImage} />
                <div className={styles.itemTextContainer}>
                    <div className={styles.itemName}>Reima Overalls  1x</div>
                    <div style={{ display: 'flex', marginBottom: '1.6rem', alignItems: 'center' }} className={styles.child}>
                        <div style={{ display: 'flex', marginRight: '.8rem' }} >
                            <BsStarFill style={{ marginRight: '.8rem' }} size={'2.4rem'} color={'#22D5AE'} />
                            <BsStarFill style={{ marginRight: '.8rem' }} size={'2.4rem'} color={'#22D5AE'} />
                            <BsStarFill style={{ marginRight: '.8rem' }} size={'2.4rem'} color={'#22D5AE'} />
                            <BsStarFill style={{ marginRight: '.8rem' }} size={'2.4rem'} color={'#22D5AE'} />
                            <BsStarFill style={{ marginRight: '.4rem' }} size={'2.4rem'} color={'#22D5AE'} />
                        </div>
                        <Count style={{ fontSize: '1.6rem' }}>402 ნახვა</Count>
                    </div>
                    <div style={{ marginBottom: '.6rem' }}>
                        <ItemLabel>ზომა: </ItemLabel> <ItemValue>XL</ItemValue>
                    </div>
                    <div style={{ marginBottom: '.6rem' }}>
                        <ItemLabel>ფერი: </ItemLabel> <ItemValue>მწვანე</ItemValue>
                    </div>
                    <div style={{ marginBottom: '1.6rem' }}>
                        <ItemLabel>რაოდენობა: </ItemLabel> <ItemValue>1x</ItemValue>
                    </div>
                    <Price>$79.90</Price>
                    <OldPrice>$123.90</OldPrice>
                </div>
            </div>
        </>
    )

}


// import { NextPage } from "next"

// const Test: NextPage = () => {
//     return <h1>Test</h1>
// }

// export default Test;
