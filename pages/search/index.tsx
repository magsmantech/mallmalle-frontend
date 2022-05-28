import type { NextPage } from 'next'
import { BsBookmarkPlusFill, BsChevronDown, BsFilterLeft, BsStarFill } from 'react-icons/bs';
import styled from 'styled-components';
import styles from '../../styles/Catalog.module.css'

import { Wrapper as Pagination, Number } from '../../components/styled/pagination';

import { ChipIconWrapper, ChipTitle, ChipWrapper } from '../../components/styled/Chips';
import Link from 'next/link';
import Button from '../../components/styled/button';
import { useState, useEffect } from 'react';
import { Wrapper, Item as RadioItem, RadioButtonLabel } from '../../components/styled/radioButton';
import Slider from '../../components/slider';
import FilterSelect from '../../components/filterSelect';
import { Breadcrumbs } from '../../components/styled/breadcrumbs';
import ColorSelector from '../../components/ColorSelector';

import FilterIcon from '../../public/icons/react-icons/filter';
import { useDispatch } from 'react-redux';
import { showFeedback } from '../../features/feedbackSlice';
import { getProducts, getProductsById } from '../../services/products-service';
import Responsive from '../../config/Responsive';
import MoreFilterIcon from '../../public/icons/more-filter-icon.svg'
import DropDown from '../../components/customStyle/DropDown';
import RadioButton from "../../components/customStyle/RadioButton";
import SidebarFilter from '../../components/customStyle/SidebarFilter';



const Heading = styled.h1`
    color: var(--text-color);
    font-size: 44px;
    font-family: 'BPG WEB 002 Caps';
    font-weight: 400;
    margin: 0;
    /* text-transform: uppercase;
    font-feature-settings: "case" on; */
        ${Responsive.mobile} {
            font-size: 28px;
        }

`;

const Quantity = styled.span`
    font-weight: 500;
    color: var(--text-color);
    opacity: 0.5;
    font-family: fira-go;
    font-size: 16px;
    transform: translateY(-0.9rem);
    margin-left: 50px;
        ${Responsive.mobile} {
            margin-left: 0px;
            margin-top: 20px;
            margin-right: auto;
        }
`;

const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 32px;
    grid-row-gap: 80px;
    ${Responsive.mobile} {
        grid-template-columns: 1fr;
        grid-row-gap: 50px;
    }
`;


const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    /* z-index: ; */
    /* &:hover {
        z-index: 3;
    } */
`;

const ItemBackground = styled.div`
    position: absolute;
    top: -1.0rem;
    bottom: -8.0rem;
    left: -1.0rem;
    right: -1.0rem;
    background-color: white;
    border-radius: 1.4rem;
    z-index: 1;
    box-shadow: 1.0rem 1.0rem 1.0rem rgba(0, 0, 0, 0.16);
    
`;

const Img = styled.div`
    width: 100%;
    height: 540px;
    background-image: ${(props: { backgroundImage: string }) => `url(${props.backgroundImage})`};
    background-size: 105%;
    background-repeat: no-repeat;
    
    transition: all 150ms ease-in-out;
    position: center;
    border-radius: 14px;
    position: relative;
    &:hover {
        background-size: 110%;
    } 

    background-position: center center;
    background-size: cover;
    ${Responsive.laptop} {
    height: 450px;
    }
    ${Responsive.tablet} {
    height: 420px;
    }
    ${Responsive.mobile} {
        height: 420px;
    }
`;

const ItemOverlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    /* opacity: 0.3; */
    
    border-radius: 1.4rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 2.0rem;
`;

const BookmarkWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    backdrop-filter: blur(10px);
    /* -webkit-backdrop-filter: blur(10px); */
    background-color: rgba(0, 0, 0, 0.7);
`;

const ItemButton = styled(Button)`
    position: absolute;
    width: 100%;
    bottom: -7rem;
    z-index: 1;
    height: 77px;
    font-weight: 600;
    font-family: fira-go;
    font-size: 18px;
    background-image: var(--button-gradient);
    /* margin-top: 2.0rem; */
    /* display: none; */

`;

const Price = styled.span`
    font-size: 28px;
    color: var(--text-color);
    font-weight: 700;
    font-family: fira-go;
`;

const OldPrice = styled.span`
    font-size: 18px;
    
    font-family: 'helvetica';
    color: var(--text-color);
    font-weight: 700;

    opacity: 0.5;
    text-decoration: line-through;
`;

const Title = styled.span`
    color: var(--text-color);
    /* font-family: 'BPG WEB 002 Caps'; */
    text-transform: uppercase;
    font-feature-settings: "case" on;

    font-weight: 700;
    font-size: 18px;
    
    font-family: 'helvetica';
`;


export const Count = styled.span`
    font-size: 16px;
    font-family: "helvetica";
    color: var(--text-color);
    margin-top: -3px;
    ${Responsive.mobile}{
        font-size: 12px;
        margin-top: -4px;
    }
`;

const Badge = styled.span`
    font-size: 18px;
    font-family: 'helvetica';
    color: #22D5AE;
    padding: 5px 8px;
    border-radius: 2.1rem;
    border: .15rem solid #22D5AE;
    display: flex;
    font-weight: bold;
    align-items: center;
`;
const HoverButton = styled(Button)`
    background-image: none;
    /* height: 5.4rem;  */
    color: #22D5AE;
    border: .2rem solid #22D5AE;
    &:hover {
        /* background-color: #22D5AE; */
        border: none;
        color: white;
        background-image: linear-gradient(to right, #22D5AE, #3A7BD5);
    }
`;
const TopSideWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    margin-bottom: 20px;
        ${Responsive.mobile}{
            flex-direction: column;
        }
`;
const PriceWrapperStyle = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 14px 0px 15px 0px;
`;
const PriceTitleStyle = styled.span`
    color: var(--text-color);
    font-family: 'helvetica';
    font-size: 18px;
    text-transform: uppercase;
    font-feature-settings: 'case' on;
`;
const StartsWrapperStyle = styled.div`
    display: flex;
    gap: 7px;
    margin-right: 10px;
        svg {
            width: 16px;
        }
      ${Responsive.mobile} {
        svg {
          width: 14px;
        }
      }
`;
const PaginationWrapper = styled.div`
    margin-top: 150px;
      ${Responsive.mobile} {
          margin-top: 80px;
      }
`;
const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    /* position: fixed;
    right: 20px;
    top: 200px;
    z-index: 10;
    background-color: #fff;
    padding: 20px;
    border-radius: 60px; */
  
        ${Responsive.tabletMobile} {
            flex-wrap: wrap;
        }
        
`;
const FilltersBox = styled.div`
    margin-right: 24px;
        &:last-child {
            margin-right: 0px;
        }
        ${Responsive.tabletMobile}{
            margin-bottom: 20px;
        }
`;
const MoreFilterBtn = styled.button`
    display: flex;
    align-items: center;
    box-shadow: unset !important;
    padding: 10px 10px 10px 15px;
    border: 0px;
    border-radius: 25px;
    font-size: 18px;
    color: #424F60;
    user-select: none;
    font-family: 'helvetica';
    font-weight: 500;
    background-color: #F2F2F2;
    color: #424F60;
    position: relative;
    &:hover {
        background-color: #C9F5EB;
        color: #424F60;
    }
    &::after {
        content: '';
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: 0px;
        margin-left: 20px;
        cursor: pointer;
    }
`;
const MoreFilterIconStyle = styled(MoreFilterIcon)`
    position: absolute;
    right: 13.2px;
    transform: scale(0.75);
    
`;
const HeadWrapperStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 20px 0px 60px 0px;
        ${Responsive.mobile} {
            margin: 10px 0px 30px 0px;
        }
`;













const Item = ({ imgSrc, id }: any) => {
    const [hovered, setHovered] = useState(false);

    const dispatch = useDispatch();

    const _addToCart = () => {
        dispatch(showFeedback({
            show: true,
        }))
    }

    return <><Link href={"/detail/" + id}><ItemWrapper className={styles.wrapper}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
        <Img backgroundImage={imgSrc} className={styles.child}>
            {(hovered) && <ItemOverlay>
                <BookmarkWrapper style={{ zIndex: 20 }}>
                    <BsBookmarkPlusFill size={'30px'} color={'#ffffff'} />
                </BookmarkWrapper>
            </ItemOverlay>
            }
        </Img>
        <PriceWrapperStyle className={styles.child}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Price style={{ marginRight: '1.6rem' }}>85,99 ₾</Price>
                <OldPrice>120,00 ₾</OldPrice>
            </div>
            <Badge>-10%</Badge>
        </PriceWrapperStyle>
        <PriceTitleStyle className={styles.child}><Title >ზედა სული</Title> / შავი ზედა...</PriceTitleStyle>
        <div style={{ display: 'flex', alignItems: 'center' }} className={styles.child}>
            <StartsWrapperStyle>
                <BsStarFill size={'1.8rem'} color={'#22D5AE'} />
                <BsStarFill size={'1.8rem'} color={'#22D5AE'} />
                <BsStarFill size={'1.8rem'} color={'#22D5AE'} />
                <BsStarFill size={'1.8rem'} color={'#22D5AE'} />
                <BsStarFill size={'1.8rem'} color={'#22D5AE'} />
            </StartsWrapperStyle>
            <Count>402 ნახვა</Count>
        </div>

        {hovered && <ItemButton
            className={styles.child}
            // onClick={_addToCart}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >კალათაში დამატება</ItemButton>}
        {hovered && <ItemBackground />}
    </ItemWrapper></Link></>
}

type FilterSideBarProps = {
    onClose: Function,
    onEnter: Function,
};


// const FilterSideBar = ({ onClose, onEnter }: FilterSideBarProps) => {
//     const [select, setSelect] = useState('all');
//     const handleSelectChange = (event: any) => {
//         const value = event.target.value;
//         setSelect(value);
//     };

//     const array1 = [
//         {
//             label: 'ყველა',
//             value: 'all'
//         },
//         {
//             label: 'ახალდამატებული',
//             value: 'new'
//         },
//         {
//             label: 'ზედები',
//             value: 'tops'
//         },
//         {
//             label: 'შარვლები',
//             value: 'pants'
//         },
//         {
//             label: 'კაბები',
//             value: 'dresses'
//         },
//         {
//             label: 'კორსეტები და პიჯაკები',
//             value: 'coreset'
//         },
//         {
//             label: 'ფეხსაცმელები',
//             value: 'shoes'
//         },

//         {
//             label: 'დიდი ზომები',
//             value: 'big'
//         },
//         {
//             label: 'აქსესუარები',
//             value: 'accessories'
//         },
//     ];

//     const array2 = [
//         {
//             label: 'ფასდაკლებები',
//             value: 'sale'
//         },
//         {
//             label: 'პოპულარულები',
//             value: 'popular'
//         },
//         {
//             label: 'ექსკლუზიურები',
//             value: 'exclusive'
//         },
//         {
//             label: 'დაბალ ბიუჯეტურები',
//             value: 'low-budget'
//         },
//         {
//             label: 'შეთავაზებები',
//             value: 'offers'
//         },
//     ];

//     const [colors, setColors] = useState([
//         '#000000',
//         '#794428',
//         '#f6881b',
//         '#fee41f',
//         '#2bb430',
//         '#345fec',
//         '#a527f3',
//         '#fea6fb',
//     ]);
//     const [arr1, setArr1] = useState(array1)
//     const [arr2, setArr2] = useState(array2)


//     return (<>
//         <div className={styles.filterSideBar}>
//             <div className={styles.filterTitle} >კატეგორიები</div>
//             <Wrapper>
//                 {arr1.map((item, i) =>
//                     <RadioItem
//                         key={i}>
//                         <RadioButton
//                             type="radio"
//                             name="radio"
//                             value={item.value}
//                             checked={select === item.value}
//                             onChange={(event) => handleSelectChange(event)}
//                         />
//                         <RadioButtonLabel />
//                         <div className={styles.radioButtonLabel}>{item.label}</div>
//                     </RadioItem>
//                 )}
//             </Wrapper>
//             <div className={styles.divider}></div>
//             <div className={styles.filterTitle} >ფასი</div>
//             <Slider></Slider>
//             <Wrapper style={{ marginTop: '5.0rem' }}>
//                 {arr2.map((item, i) =>
//                     <RadioItem key={i}>
//                         <RadioButton
//                             type="radio"
//                             name="radio"
//                             value={item.value}
//                             checked={select === item.value}
//                             onChange={(event) => handleSelectChange(event)}
//                         />
//                         <RadioButtonLabel />
//                         <div>{item.label}</div>
//                     </RadioItem>
//                 )}
//             </Wrapper>
//             <div className={styles.filterTitle} style={{ marginTop: '4.2rem' }} >ფერები</div>
//             <div>
//                 {/* @ts-ignore */}
//                 <ColorSelector colors={colors} small style={{ justifyContent: 'space-between' }} />
//             </div>
//             <div className={styles.filterFooter}>
//                 <HoverButton style={{ fontWeight: 500, height: '7.1rem' }} lowercase onClick={() => onClose()}>გაუქმება</HoverButton>
//                 <Button style={{ fontWeight: 500, height: '7.1rem' }} lowercase onClick={() => onEnter()}>აჩვენე 124</Button>
//             </div>

//         </div>
//     </>)
// }


const Search: NextPage = () => {
    const [openFilters, setOpenFilters] = useState(false)

    useEffect(() => {
        document.body.style.overflow = openFilters ? "hidden" : 'auto';
    }, [openFilters])

    useEffect(() => {
        getProductsById(1).then((res) => {
            console.log(res);

        })
            .catch(err => {
                console.log(err);

            })
    }, []);

    const [popular, setPopular] = useState();
    const [brand, setBrand] = useState();
    const [price, setPrice] = useState();

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            {openFilters && <div className={styles.overlay} onClick={() => setOpenFilters(false)}></div>}
            {/* {openFilters && <FilterSideBar onClose={() => setOpenFilters(false)} onEnter={() => setOpenFilters(false)} />} */}
            <Breadcrumbs style={{ marginBottom: '2.0rem' }}>მთავარი / კატეგორიები / ძებნა</Breadcrumbs>

            {/* <div style={{ display: 'flex',
                    alignItems: 'center',
                    gap: '2.4rem',
                    padding: '1.7rem',
                    height: '8.2rem',
                    backgroundColor: 'white',
                    position: 'fixed',
                    zIndex: 3,
                    borderRadius: '4.2rem',
                    top: '21.0rem',
                    right: '2.4rem',
                }}>
                <FilterSelect/>
                <ChipWrapper>
                    <ChipTitle>ბრენდი</ChipTitle>
                    <ChipIconWrapper>
                        <BsChevronDown size={'2.0rem'}></BsChevronDown>
                    </ChipIconWrapper>
                </ChipWrapper>

                <ChipWrapper>
                    <ChipTitle>ფასი</ChipTitle>
                    <ChipIconWrapper>
                        <BsChevronDown size={'2.0rem'}></BsChevronDown>
                    </ChipIconWrapper>
                </ChipWrapper>
                <ChipWrapper onClick={()=> setOpenFilters(true)}>
                    <ChipTitle>მეტი ფილტრი</ChipTitle>
                    <ChipIconWrapper>
                        <FilterIcon width={'2.4rem'} height={'2.4rem'}/>
                    </ChipIconWrapper>
                </ChipWrapper>
            </div> */}

            <HeadWrapperStyle>
                <TopSideWrapper>
                    <Heading>ძებნის შედეგები</Heading>
                    <Quantity>12 323 პროდუქტი</Quantity>
                </TopSideWrapper>
                <FilterWrapper>
                    <FilltersBox>
                        <DropDown dropdownTitle="პოპულარული">
                            <RadioButton
                                id="popular-id"
                                onChange={(value) => setPopular(value)}
                                options={[
                                    { label: "პოპულარული 1", value: "პოპულარული 1" },
                                    { label: "პოპულარული 2", value: "პოპულარული 2" },
                                ]}
                                value={popular}
                            />
                        </DropDown>{popular === undefined ? null : popular}
                    </FilltersBox>
                    <FilltersBox>
                        <DropDown dropdownTitle="ბრენდი">
                            <RadioButton
                                id="brand-id"
                                onChange={(value) => setBrand(value)}
                                options={[
                                    { label: "ბრენდი 1", value: "ბრენდი 1" },
                                    { label: "ბრენდი 2", value: "ბრენდი 2" },
                                ]}
                                value={brand}
                            />
                        </DropDown>{brand === undefined ? null : brand}
                    </FilltersBox>

                    <FilltersBox>
                        <DropDown dropdownTitle="ფასი">
                            <RadioButton
                                id="price-id"
                                onChange={(value) => setPrice(value)}
                                options={[
                                    { label: "ფასი 1", value: "ფასი 1" },
                                    { label: "ფასი 2", value: "ფასი 2" },
                                ]}
                                value={price}
                            />
                        </DropDown>{price === undefined ? null : price}
                    </FilltersBox>

                    <FilltersBox>
                        <MoreFilterBtn onClick={() => setOpenModal(true)}>
                            მეტი ფილტრი
                            <MoreFilterIconStyle />
                        </MoreFilterBtn>
                    </FilltersBox>

                    {openModal && <SidebarFilter openModal={setOpenModal} />}


                </FilterWrapper>
            </HeadWrapperStyle>

            <Grid>
                <Item id={1} imgSrc={'/assets/2.png'}></Item>
                <Item id={2} imgSrc={'/assets/3112.png'}></Item>
                <Item id={3} imgSrc={'/assets/6.png'}></Item>
                <Item id={4} imgSrc={'/assets/3112.png'}></Item>
                <Item id={5} imgSrc={'/assets/3112.png'}></Item>
                <Item id={6} imgSrc={'/assets/3112.png'}></Item>
                <Item id={7} imgSrc={'/assets/3112.png'}></Item>
            </Grid>

            <PaginationWrapper>
                <Pagination gap={'30px'}>
                    <Number selected>1</Number>
                    <Number>2</Number>
                    <Number>3</Number>
                    <Number>4</Number>
                </Pagination>
            </PaginationWrapper>

        </>
    )
}

export default Search;