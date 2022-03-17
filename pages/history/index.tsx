// import { NextPage } from "next/types";
// import { SectionTitle } from "../cart";

// import styles from '../../styles/History.module.css';
// import { ReactElement } from "react";
// import { BsArrowLeft, BsStarFill } from "react-icons/bs";
// import { Count } from "../catalog";
// import styled from "styled-components";
// import { Badge } from "../../components/OrdersList";
// import { IoLocationSharp } from "react-icons/io5";
// import Link from "next/link";



// const ItemLabel = styled.span`
// color: var(--text-color);
// font-size: 1.8rem;
// font-family: 'helvetica';
// opacity: 0.5;
// `;

// const ItemValue = styled.span`
// color: var(--text-color);
// font-size: 1.8rem;
// font-family: fira-go;
// font-weight: 500;
// `;


// const Price = styled.span`
// color: var(--text-color);
// font-size: 3.2rem;
// font-family: fira-go;
// font-weight: 600;
// `;

// const OldPrice = styled(Price)`
//     text-decoration: line-through;
//     font-size: 2.8rem;
//     opacity: 0.3;
// `;


// const IconWrapper = styled.div`
//     height: 5.4rem;
//     width: 5.4rem;
//     background-color: rgba(224, 224, 224, .3);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 1.4rem;
//     margin-right: 1.8rem;
//     cursor: pointer;
//     &:hover {
//         background-color: rgba(224, 224, 224, 1);        
//     }
// `;


// const History: NextPage = () => {
//     return (
//         <>
//         <section className={styles.section}>
//             <div className={styles.container}>
//                 <SectionTitle style={{ marginBottom: '1.7rem' }}>ყიდვის ისტორია</SectionTitle>
//                 <span className={styles.breadcrumbs}>მთავარი / პროდუქტები / ყიდვის ისტორია / Reima Overalls</span>
//                 <Link href={{
//                     pathname: '/profile',
//                     query: {tab: 'orders-history'},
//                 }} >
//                     <div className={styles.backButton}>
//                         <IconWrapper>
//                             <BsArrowLeft size={'2.0rem'} color={'#3A7BD5'} />
//                         </IconWrapper>
//                         უკან დაბრუნება
//                     </div>
//                 </Link>
//                 <div className={styles.wrapper}>
//                     <Item></Item>
//                     <Badge>დადასტურებული</Badge>
//                     <div style={{display: 'flex', flexDirection: 'column', maxWidth: '37.0rem'}}>

//                         <div className={styles.addressTitle}>მისამართი:</div>
//                         <div className={styles.addressItem}>
//                             {/* <div> */}
//                             <IoLocationSharp size={'3.2rem'} color={'var(--text-color)'} />
//                             {/* </div> */}
//                             <div className={styles.addressItemText}>
//                                 <div className={styles.city}>Tbilisi</div>
//                                 <div className={styles.address}>მუხიანი, ალეკო გობრონიძის #11 / ბინა 177</div>
//                                 <div className={styles.zip}>ZIP კოდი: 01103</div>
//                             </div>
//                         </div>

//                     </div>

//                     <div style={{marginRight: '14.6rem', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '28.9rem'}}>
//                         <div className={styles.addressTitle}>გადახდის მეთოდი</div>
//                         <div className={styles.paymentMethod}>
//                             <img className={styles.paymentIcon} src={'/assets/visa.png'}/>
//                             <div className={styles.cardNumber}>4332 **** **** **83  </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>

//             <div className={styles.divider}>
//             </div>

//             <div className={styles.descriptionTitle}>
//                 დამატებითი ინფორმაცია
//             </div>
//             <div className={styles.descriptionText}>
//                 შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის. შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის
//             </div>
//             </section>
//         </>
//     )
// }

// export default History;

// const Item = () => {
//     return (
//         <>
//             <div className={styles.itemWrapper}>
//                 <img src={'/assets/123123.png'} className={styles.itemImage} />
//                 <div className={styles.itemTextContainer}>
//                     <div className={styles.itemName}>Reima Overalls  1x</div>
//                     <div style={{ display: 'flex', marginBottom: '1.6rem', alignItems: 'center' }} className={styles.child}>
//                         <div style={{ display: 'flex', marginRight: '.8rem' }} >
//                             <BsStarFill style={{marginRight: '.8rem'}} size={'2.4rem'} color={'#22D5AE'} />
//                             <BsStarFill style={{marginRight: '.8rem'}} size={'2.4rem'} color={'#22D5AE'} />
//                             <BsStarFill style={{marginRight: '.8rem'}} size={'2.4rem'} color={'#22D5AE'} />
//                             <BsStarFill style={{marginRight: '.8rem'}} size={'2.4rem'} color={'#22D5AE'} />
//                             <BsStarFill style={{marginRight: '.4rem'}} size={'2.4rem'} color={'#22D5AE'} />
//                         </div>
//                         <Count style={{ fontSize: '1.6rem' }}>402 ნახვა</Count>
//                     </div>
//                     <div style={{ marginBottom: '.6rem' }}>
//                         <ItemLabel>ზომა: </ItemLabel> <ItemValue>XL</ItemValue>
//                     </div>
//                     <div style={{ marginBottom: '.6rem' }}>
//                         <ItemLabel>ფერი: </ItemLabel> <ItemValue>მწვანე</ItemValue>
//                     </div>
//                     <div style={{ marginBottom: '1.6rem' }}>
//                         <ItemLabel>რაოდენობა: </ItemLabel> <ItemValue>1x</ItemValue>
//                     </div>
//                     <Price>$79.90</Price>
//                     <OldPrice>$123.90</OldPrice>
//                 </div>
//             </div>
//         </>
//     )

// }


import { NextPage } from "next"

const Test: NextPage = () => {
    return <h1>Test</h1>
}

export default Test;
