import type { NextPage } from 'next'
import { BsBookmarkPlusFill, BsChevronDown, BsFilterLeft, BsStarFill } from 'react-icons/bs';
import styled from 'styled-components';
import styles from '../../styles/Catalog.module.css'

import { Wrapper as Pagination, Number } from '../../components/styled/pagination';

import Link from 'next/link';
import Button from '../../components/styled/button';
import { useState, useEffect } from 'react';
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
import api, { uploadUrl } from '../../features/api';
import Loader from '../../components/Loader';
import { Product, ProductData } from '../../domain/shop';
import { useRouter } from "next/router";
import { Scrollbar } from '../../components/GlobalStyle';
import ReactPaginate from 'react-paginate';
import Fonts from '../../styles/Fonts';
import Raiting from '../../components/customStyle/Raiting';
import Slider from '../../components/slider';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

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
        ${Responsive.laptop}{
            font-size: 30px;
            margin-top: -15px;
        }
`;

const BsBookmarkPlusFillStyle = styled(BsBookmarkPlusFill)`
        ${Responsive.laptop}{
            width: 20px;
            height: 20px;
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
        ${Responsive.laptop}{
            font-size: 12px;
            margin-left: 35px;
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
    ${Responsive.laptop} {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* see notes below */
        grid-row-gap: 35px;
        margin-top: 0px;
    }
`;


const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    overflow: hidden;
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
        height: 350px;
        width: 230px;
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
    ${Responsive.laptop}{
        width: 50px;
        height: 50px;
        margin-right: -10px;
        margin-bottom: -10px;
    }
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
    ${Responsive.laptop}{
        font-size: 18px;
    }
`;

const OldPrice = styled.span`
    font-size: 18px;
    font-family: ${Fonts.FiraGORegular};
    color: var(--text-color);
    font-weight: 700;
    margin-top: 5px;
    opacity: 0.5;
    text-decoration: line-through;
    ${Responsive.mobile}{
        margin-top: 5px;
    }
    ${Responsive.laptop}{
        font-size: 14px;
    }
`;

const Title = styled.span`
    color: var(--text-color);
    /* font-family: 'BPG WEB 002 Caps'; */
    text-transform: uppercase;
    font-feature-settings: "case" on;

    font-weight: 700;
    font-size: 18px;
    
    font-family: 'helvetica';
    ${Responsive.laptop}{
        font-size: 12px;
    }
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
    ${Responsive.laptop}{
        font-size: 10px;
    }
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
    ${Responsive.laptop} {
        margin-top: -13px;
    }
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
    ${Responsive.laptop} {
        font-size: 12px;
        padding: 3px 8px 3px 8px;
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
        ${Responsive.laptop} {
            margin-bottom: 0px;
        }
`;
const SearchCount = styled.div`
    font-size: 16px;
    color: #000;
    height: 300px;
`;
const Shadow = styled.div`
    position: fixed;
    top: 125px;
    left: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 20;
    height: 100%;
    width: 100%;
    border-radius: 37px 37px 0 0;
        ${Responsive.tabletMobile}{
            top: 100px;
            border-radius: 23px 23px 0 0;
        }
`;
const MainFilterComponent = styled.div`

`;
const Content = styled.div`
    position: fixed;
    right: 0;
    top: 125px;
    background-color: #fff;
    z-index: 22;
    height: calc(100% - 125px);
    width: 490px;
    padding: 50px 30px 0px 30px;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    overflow: scroll;

        ${Responsive.tabletMobile}{
            top: 100px;
        }
        ${Responsive.mobile}{
            width: 100%;
            height: 75%;
            bottom: 0;
            left: 0;
            top: unset;
            right: unset;
            padding-bottom: 20px;
            border-radius: 20px 20px 0px 0px;
            overflow-x: scroll;
        }
`;
const MediumTitle = styled.h4`
    font-size: 18px;
    color: #424F60;
    font-family: 'BPG WEB 002 CAPS';
    font-weight: 400;
        ${Responsive.mobile}{
            font-size: 14px;
        }
`;
const FilterInnterWrapper = styled.div`
  margin-bottom: 50px;
  margin-top: 10px;
`;
const BreadcrumbsStyle = styled(Breadcrumbs)`
        ${Responsive.laptop}{
            font-size: 12px;
            margin-top: 8px;
        }
`;

export const CustomPaginationWrapper = styled.div`
    margin: 70px 0 50px 0;
    ul {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
        li {
            user-select: none;
            font-size: 26px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-family: noto-sans;
            font-weight: 600;
            background-color: transparent;
            color: var(--text-color);
            height: 52px;
            width: 52px;
            cursor: pointer;
            margin: 0 15px;
            &.selected {
                background-color: #22D5AE;
                color: white;
            }
            &:first-child {//hide prev button
                display: none;
            }
            &:last-child {//hide next button
                display: none;
            }
        }
    }

    ${Responsive.tabletMobile} {
        ul {
            li {
                margin: 0 5px;
                font-size: 14px;
                height: 24px;
                width: 24px;
            }
        }
    }
    ${Responsive.laptop} {
        ul {
            li {
                height: 34px;
                width: 34px;
                font-size: 18px;
            }
        }
    }

`;
const BtnWithBorder = styled.button` //TODO Levan Madurashvili
    height: 70px;
    min-height: 70px;
    border: 3px solid #22D5AE;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: 0px 30px;
    font-size: 20px;
    font-family: 'helvetica';
    font-weight: 700;
    color: #22D5AE;
    cursor: pointer;
    width: 100%;
    margin-top: auto;
    margin-bottom: 20px;
    background: linear-gradient(90deg, #23CFB0 0%, #3882D2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
        ${Responsive.mobile}{
            font-size: 16px;
            height: 60px;
        }
`;
const SliderWrapperStyle = styled.div`
    margin-top: auto;
    min-height: 130px;
`;



const Item = ({ imgSrc, id, view, raiting, name, price, oldPrice, discountValue }: any) => {
    // const [productID, setproductID] = useState<number>(id);

    // const { data: productById, isLoading: isProductByIdLoading, refetch: refetchProductById } = api.useGetProductByIdQuery(productID);
    const [hovered, setHovered] = useState(false);
    const dispatch = useDispatch();
    const _addToCart = () => {
        dispatch(showFeedback({
            show: true,
        }))
    }

    const {t, i18n} = useTranslation();


    return (

        <>
            <Link href={"/detail/" + id}><ItemWrapper className={styles.wrapper}
                onMouseOver={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <Img backgroundImage={imgSrc} className={styles.child}>
                    {(hovered) && <ItemOverlay>
                        <BookmarkWrapper style={{ zIndex: 20 }}>
                            <BsBookmarkPlusFillStyle size={'30px'} color={'#ffffff'} />
                        </BookmarkWrapper>
                    </ItemOverlay>
                    }
                </Img>
                <PriceWrapperStyle className={styles.child}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Price style={{ marginRight: '1.6rem' }}>{price} ₾</Price>
                        {oldPrice !== null ? (
                            <OldPrice>{oldPrice} ₾</OldPrice>
                        ) : null}
                    </div>
                    {discountValue ? (
                        <Badge>- {discountValue}%</Badge>
                    ) : null}
                </PriceWrapperStyle>

                <PriceTitleStyle className={styles.child}><Title >{name}</Title></PriceTitleStyle>
                <div style={{ display: 'flex', alignItems: 'center' }} className={styles.child}>
                    <Raiting raitingCount={raiting} />
                    <Count>{view} {t('seen')}</Count>
                </div>

                {hovered && <ItemButton
                    className={styles.child}
                    onClick={() => alert("selected")}
                    onMouseOver={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >{t('addInBasket')}</ItemButton>}
                {hovered && <ItemBackground />}
            </ItemWrapper>
            </Link>
        </>
    )
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
    const router = useRouter();
    const searchResult = router.query.result as any;
    // console.log("search result " + searchResult);

    const [openFilters, setOpenFilters] = useState(false)


    const [selectedPrices, setSelectedPrices] = useState<any>("");
    const [sizeVariationID, setsizeVariationID] = useState<number>(0);
    const [colorVariationID, setcolorVariationID] = useState<number>(0);
    const [startPrice, setStartPrice] = useState<string>(selectedPrices?.startValue ? selectedPrices?.startValue : "");
    const [endPrice, setEndPrice] = useState<string>(selectedPrices?.endValue ? selectedPrices?.endValue : "");
    const [sortBy, setsortBy] = useState<string>("");
    const [sortByEn, setsortByEn] = useState<string>("");
    const [brandId, setbrandId] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [otherFilterName, setotherFilterName] = useState<string>();
    const [otherFilterNameEn, setotherFilterNameEn] = useState<string>();
    const [category_id, setcategory_id] = useState<number>(0);

    const {t, i18n} = useTranslation();


    // reset current page
    useEffect(() => {
        setCurrentPage(1)
    }, [searchResult])

    // update selected price
    useEffect(() => {
        setStartPrice(selectedPrices?.startValue ? selectedPrices?.startValue : "");
        setEndPrice(selectedPrices?.endValue ? selectedPrices?.endValue : "");
    }, [selectedPrices])

    const { data: getFilters, isLoading: isAGetFiltersLoading, refetch: refetchGetFilters } = api.useGetFiltersQuery(undefined);
    const { data: searchResults, isLoading: isSearchResultsLoading, refetch: refetchSearchResults } = api.useSearchQuery({
        keyword: searchResult,
        page: currentPage,
        start_price: startPrice,
        end_price: endPrice,
        color_variation_id: colorVariationID,
        size_variation_id: sizeVariationID,
        sort_by: sortBy, //rating, time, discount, popularity
        brand_id: brandId,
        categories: category_id
    });


    const [popular, setPopular] = useState();
    const [brand, setBrand] = useState();
    const [price, setPrice] = useState();

    const [openModal, setOpenModal] = useState(false);
    const MainLoader = isSearchResultsLoading || isAGetFiltersLoading;

    // pagination page changer
    const handlePageClick = (event: any) => {
        setCurrentPage(event.selected + 1)
    };

    // clear filters fields
    const clearFilterFields = () => {
        setsizeVariationID(0);
        setcolorVariationID(0);
        setStartPrice("");
        setEndPrice("");
        setcategory_id(0);
    }

    // sortBy array 
    const sortByArray = [
        {
            value: 'popularity',
            label: 'პოპულარობა'
        },
        {
            value: 'rating',
            label: 'რეიტინგი'
        },
        {
            value: 'time',
            label: 'ახალი'
        },
        {
            value: 'discount',
            label: 'ფასდაკლება'
        },
        {
            value: '',
            label: 'ყველა'
        },
    ];

    const sortByArrayEn = [
        {
            value: 'popularity',
            label: 'Popularity'
        },
        {
            value: 'rating',
            label: 'Rating'
        },
        {
            value: 'time',
            label: 'Time'
        },
        {
            value: 'discount',
            label: 'Discount'
        },
        {
            value: '',
            label: 'All'
        },
    ];

    // update sortByTitle
    useEffect(() => {
        // sortBy title
        const sortByTitle = sortByArray.find(x => x.value === sortBy);
        setotherFilterName(sortByTitle?.label);
    }, [sortBy])

    useEffect(() => {
        // sortBy title
        const sortByTitleEn = sortByArrayEn.find(x => x.value === sortByEn);
        setotherFilterNameEn(sortByTitleEn?.label);
    }, [sortByEn])

    return MainLoader ? <Loader /> : !searchResults ? (<span>{t('totalFound')} 0 {t('products')}</span>) : (
        <>

            {openFilters && <div className={styles.overlay} onClick={() => setOpenFilters(false)}></div>}
            {/* {openFilters && <FilterSideBar onClose={() => setOpenFilters(false)} onEnter={() => setOpenFilters(false)} />} */}
            <Breadcrumbs style={{ marginBottom: '2.0rem' }}>{t('main')} / {t('categories')} / {t('search')}</Breadcrumbs>

            <HeadWrapperStyle>

                <TopSideWrapper>
                    <Heading>{t('searchResults')}</Heading>
                    <Quantity>{searchResults.total} {t('products')}</Quantity>
                </TopSideWrapper>
                <FilterWrapper>

                    {/* <FilltersBox>
                        <DropDown dropdownTitle="მინ. ფასი">
                            <RadioButton
                                id="low-id"
                                onChange={(value) => setStartPrice(value)}
                                options={[
                                    { label: "0 ₾", value: "0" },
                                    { label: "100 ₾", value: "100" },
                                    { label: "200 ₾", value: "200" },
                                    { label: "300 ₾", value: "300" },
                                    { label: "400 ₾", value: "400" },
                                    { label: "500 ₾", value: "500" },
                                    { label: "600 ₾", value: "600" },
                                    { label: "700 ₾", value: "700" },
                                ]}
                                value={startPrice}
                            />
                        </DropDown>
                    </FilltersBox> */}

                    {/* <FilltersBox>
                        <DropDown dropdownTitle="მაქ. ფასი">
                            <RadioButton
                                id="hight-id"
                                onChange={(value) => setEndPrice(value)}
                                options={[
                                    { label: "განულება", value: "0" },
                                    { label: "100 ₾", value: "100" },
                                    { label: "200 ₾", value: "200" },
                                    { label: "300 ₾", value: "300" },
                                    { label: "400 ₾", value: "400" },
                                    { label: "500 ₾", value: "500" },
                                    { label: "600 ₾", value: "600" },
                                    { label: "700 ₾", value: "700" },
                                ]}
                                value={endPrice}
                            />
                        </DropDown>
                    </FilltersBox> */}
                    <FilltersBox>
                    {i18next.language != "en" ?
                        <DropDown dropdownTitle={`${otherFilterName}`}>
                            <RadioButton
                                id="low-id"
                                onChange={(value) => [setsortBy(value)]}
                                options={[
                                    ...sortByArray.map((s, index) => ({
                                        label: s.label,
                                        value: s.value
                                    }))
                                ]}
                                value={sortBy}
                            />
                        </DropDown>
                            :
                        <DropDown dropdownTitle={`${otherFilterNameEn}`}>
                            <RadioButton
                                id="low-id"
                                onChange={(value) => [setsortByEn(value)]}
                                options={[
                                    ...sortByArrayEn.map((s, index) => ({
                                        label: s.label,
                                        value: s.value
                                    }))
                                ]}
                                value={sortByEn}
                            />
                        </DropDown>
                    }
                    </FilltersBox>

                    {getFilters?.data.brands ? (
                        <FilltersBox>
                            <DropDown dropdownTitle={t('brand')}>
                                <RadioButton
                                    id=""
                                    onChange={(value) => setbrandId(value)}
                                    options={[
                                        ...getFilters?.data.brands.map((brandV, index) => ({
                                            label: brandV.brand_name,
                                            value: brandV.id
                                        }))
                                    ]}
                                    value={brandId}
                                />
                            </DropDown>
                        </FilltersBox>
                    ) : null}


                    <FilltersBox>
                        <MoreFilterBtn onClick={() => setOpenModal(true)}>
                        {t('moreFilters')}
                            <MoreFilterIconStyle />
                        </MoreFilterBtn>
                    </FilltersBox>

                    {openModal && <MainFilterComponent>
                        <Shadow onClick={() => setOpenModal(false)} />
                        <Content>
                            <Scrollbar hide={true} />

                            {getFilters?.data.categories ? (
                                <>
                                    <MediumTitle>{t('categories')}</MediumTitle>
                                    <FilterInnterWrapper>
                                        <RadioButton
                                            id={`category_id_${getFilters?.data.categories.map(c => c.id)}`}
                                            onChange={(value) => setcategory_id(value)}
                                            options={[
                                                ...getFilters.data.categories.map((c, index) => ({
                                                    label: c.category_name,
                                                    value: c.id
                                                })),
                                            ]}
                                            value={category_id}
                                        />
                                    </FilterInnterWrapper>
                                </>
                            ) : null}

                            {getFilters?.data.color_variations ? (
                                <>
                                    <MediumTitle>{t('color')}</MediumTitle>
                                    <FilterInnterWrapper>
                                        <RadioButton
                                            id="color-id"
                                            onChange={(value) => setcolorVariationID(value)}
                                            options={[
                                                ...getFilters.data.color_variations.map((colorV, index) => ({
                                                    label: colorV.color_name,
                                                    value: colorV.id
                                                }))
                                            ]}
                                            value={colorVariationID}
                                        />
                                    </FilterInnterWrapper>
                                </>
                            ) : null}

                            {getFilters?.data.size_variations ? (
                                <>
                                    <MediumTitle>{t('size')}</MediumTitle>
                                    <FilterInnterWrapper>
                                        <RadioButton
                                            id="size-id"
                                            onChange={(value) => setsizeVariationID(value)}
                                            options={[
                                                ...getFilters.data.size_variations.map((sizeV, index) => ({
                                                    label: sizeV.size_name,
                                                    value: sizeV.id
                                                })),
                                            ]}
                                            value={sizeVariationID}
                                        />
                                    </FilterInnterWrapper>
                                </>
                            ) : null}




                            <SliderWrapperStyle>
                                <MediumTitle style={{ marginBottom: '25px' }}>{t('price')}</MediumTitle>
                                <Slider onChange={(e: any) => setSelectedPrices(e)} />
                            </SliderWrapperStyle>

                            <BtnWithBorder onClick={clearFilterFields}>{t('remove')}</BtnWithBorder>
                            <BtnWithBorder onClick={() => setOpenModal(false)}>{t('select')}</BtnWithBorder>
                        </Content>
                    </MainFilterComponent>}
                </FilterWrapper>
            </HeadWrapperStyle>

            {i18next.language == "ge" ?
            <Grid style={{ marginBottom: "80px" }}>
                {searchResults?.data.length < 1 ? (<SearchCount></SearchCount>) : (
                    searchResults.data.map((p, index) => {

                        // console.log(p.discount[0]?.value)
                        return (
                            <Item key={index}
                                id={p.id}
                                price={p.discount.length >= 1 ? p.low_price_discounted : p.lowest_price}
                                oldPrice={p.discount.length >= 1 ? p.lowest_price : null}
                                view={p.views}
                                name={p.product_name}
                                discountValue={p.discount[0]?.value}
                                raiting={p.rating}
                                imgSrc={uploadUrl(p.decoded_images[0])}></Item>
                        )
                    })
                )}
            </Grid>
            :
            <Grid style={{ marginBottom: "80px" }}>
                {searchResults?.data.length < 1 ? (<SearchCount></SearchCount>) : (
                    searchResults.data.map((p, index) => {

                        // console.log(p.discount[0]?.value)

                        return (
                            <Item key={index}
                                id={p.id}
                                price={p.discount.length >= 1 ? p.low_price_discounted : p.lowest_price}
                                oldPrice={p.discount.length >= 1 ? p.lowest_price : null}
                                view={p.views}
                                name={p.product_name_en}
                                discountValue={p.discount[0]?.value}
                                raiting={p.rating}
                                imgSrc={uploadUrl(p.decoded_images[0])}></Item>
                        )
                    })
                )}
            </Grid>
            }


            <CustomPaginationWrapper>
                <ReactPaginate
                    breakLabel="..."
                    // nextLabel="next >"
                    onPageChange={handlePageClick}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    pageCount={searchResults.links.length - 2} // add page count and remove prev & next buttons 
                // previousLabel="< previous"
                />
            </CustomPaginationWrapper>

        </>
    )
}


export default Search;