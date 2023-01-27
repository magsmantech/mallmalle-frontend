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
            margin-top: -10px;
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
    height: 470px;
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
        height: 300px;
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
    
    font-family: 'helvetica';
    color: var(--text-color);
    font-weight: 700;

    opacity: 0.5;
    text-decoration: line-through;
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
        ${Responsive.tabletMobile}{
            top: 120px;
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
        ${Responsive.tabletMobile}{
            top: 120px;
        }
        ${Responsive.mobile}{
            width: 100%;
            height: 75%;
            bottom: 0;
            left: 0;
            top: unset;
            right: unset;
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
            margin-top: 10px;
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




const Item = ({ imgSrc, id, discountValue }: any) => {
    const [productID, setproductID] = useState<number>(id);

    const { data: productById, isLoading: isProductByIdLoading, refetch: refetchProductById } = api.useGetProductByIdQuery(productID);
    const [hovered, setHovered] = useState(false);

    const {t, i18n} = useTranslation();


    const dispatch = useDispatch();

    return isProductByIdLoading ? <Loader /> : !productById ? (<span>not found product detail by id</span>) : (

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
                {productById.variations.slice(0, 1).map((v, index) => (
                    <PriceWrapperStyle className={styles.child}>
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Price style={{ marginRight: '1.6rem' }}>{v.price} ₾</Price>
                            <OldPrice>{''}</OldPrice>
                        </div>
                    </PriceWrapperStyle>
                ))}
                {/* {productById.variations.slice(0, 1).map((v, index) => (
                    <PriceWrapperStyle className={styles.child}>
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Price style={{ marginRight: '1.6rem' }}>{v.price} ₾</Price>
                            <OldPrice>{''}</OldPrice>
                        </div>
                        <Badge>- {productById.discount[0].value}%</Badge>
                    </PriceWrapperStyle>
                ))} */}

                <PriceTitleStyle className={styles.child}><Title >{productById.product_name}</Title></PriceTitleStyle>

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



const Discounts: NextPage = () => {
    const router = useRouter();
    const searchResult = router.query.result as any;
    const { id } = router.query;
    // @ts-ignore
    const discount_id_parse = parseFloat(id);
    // console.log(discount_id_parse)

    const [openFilters, setOpenFilters] = useState(false)
    const [lowestPrice, setLowestPrice] = useState<string>("0");
    const [highestPrice, setHighestPrice] = useState<string>("9999999999999");
    const [currentPage, setCurrentPage] = useState<number>(1);

    // reset current page
    useEffect(() => {
        setCurrentPage(1)
    }, [searchResult])


    const { data: newAdded, isLoading: isNewAddedLoading, refetch: refetchNewAdded } = api.useGetDashboardDataQuery(undefined);


    console.log(newAdded)

    const [openModal, setOpenModal] = useState(false);
    const MainLoader = isNewAddedLoading;

    // pagination page changer
    const handlePageClick = (event: any) => {
        setCurrentPage(event.selected + 1)
    };

    const {t, i18n} = useTranslation();



    return MainLoader ? <Loader /> : !newAdded ? (<span>{t('totalFound')} 0 {t('products')}</span>) : (
        <>

            {openFilters && <div className={styles.overlay} onClick={() => setOpenFilters(false)}></div>}
            <BreadcrumbsStyle style={{ marginBottom: '1.0rem' }}>{t('main')} / {t('newly')}</BreadcrumbsStyle>

            <HeadWrapperStyle>

                <TopSideWrapper>
                    <Heading>{t('newly')}</Heading>
                </TopSideWrapper>

            </HeadWrapperStyle>


            <Grid style={{ marginBottom: "80px" }}>
                {newAdded.data.newAdded.map((d, index) => (
                    <div>
                        <Item key={index} id={d.id} imgSrc={uploadUrl(d.decoded_images[0])}></Item>
                    </div>
                ))}


            </Grid>

            

        </>
    )
}


export default Discounts;