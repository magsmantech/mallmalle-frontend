import type { NextPage } from "next";
import {
  BsBookmarkPlusFill,
  BsChevronDown,
  BsFilterLeft,
  BsStarFill,
} from "react-icons/bs";
import styled from "styled-components";
import styles from "../../styles/Catalog.module.css";

import {
  Wrapper as Pagination,
  Number,
} from "../../components/styled/pagination";

import {
  ChipIconWrapper,
  ChipTitle,
  ChipWrapper,
} from "../../components/styled/Chips";
import Link from "next/link";
import Button from "../../components/styled/button";
import { useState, useEffect, useContext } from "react";
import {
  Wrapper,
  Item as RadioItem,
  RadioButtonLabel,
} from "../../components/styled/radioButton";
import Slider from "../../components/slider";
import FilterSelect from "../../components/filterSelect";
import { Breadcrumbs } from "../../components/styled/breadcrumbs";
import ColorSelector from "../../components/ColorSelector";

import FilterIcon from "../../public/icons/react-icons/filter";
import { useDispatch } from "react-redux";
import { showFeedback } from "../../features/feedbackSlice";
import { getProducts, getProductsById } from "../../services/products-service";
import { useRouter } from "next/router";
import { CategoriesContext } from "../../components/Layout";
import { getFilteredItems, getFilters } from "../../services/category-services";
import config from "../../config.json";

import Respinsive from "../../config/Responsive"
import { Category, Product, FilteredCategory, FilterWithProps, ProductData } from '../../domain/shop';
import MoreFilterIcon from '../../public/icons/more-filter-icon.svg'
import api from "../../features/api";
import Responsive from "../../config/Responsive";
import DropDown from "../../components/customStyle/DropDown";
import RadioButton from "../../components/customStyle/RadioButton";
import SidebarFilter from "../../components/customStyle/SidebarFilter";
import Loader from "../../components/Loader";
import { Scrollbar } from "../../components/GlobalStyle";
import { uploadUrl } from '../../features/api';
import ReactPaginate from 'react-paginate';
import { CustomPaginationWrapper } from "../search";
import Fonts from './../../styles/Fonts';
import Raiting from "../../components/customStyle/Raiting";


const Heading = styled.h1`
  color: var(--text-color);
  font-size: 44px;
  font-family: "BPG WEB 002 Caps";
  font-weight: 400;
  margin: 0;
  /* text-transform: uppercase;
    font-feature-settings: "case" on; */
      ${Responsive.tablet} {
        margin-bottom: 28px;
      }
      ${Responsive.mobile} {
        margin-bottom: 28px;
        font-size: 28px;
      }
      ${Responsive.laptop}{
        font-size: 30px;
        margin-top: -15px;
    }
`;

const Quantity = styled.span`
  font-weight: 500;
  color: var(--text-color);
  opacity: 0.5;
  font-family: fira-go;
  font-size: 16px;
  transform: translateY(-0.9rem);
  margin-left: 2.2rem;
  margin-top: auto;
      ${Responsive.tablet} {
        margin-bottom: 20px;
      }
      ${Responsive.mobile} {
        margin-bottom: 20px;
      }
      ${Responsive.laptop}{
        font-size: 12px;
        margin-left: 35px;
    }
`;

const Grid = styled.div`
  width: 100%;
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3.2rem; */
/* background-color: aqua; */
  margin-top: 60px;
  margin-bottom: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); /* see notes below */
  grid-row-gap: 35px;
  grid-column-gap: 35px;
    ${Respinsive.laptop} {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* see notes below */
      grid-row-gap: 35px;
      margin-top: 0px;
    }
    ${Respinsive.tablet} {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* see notes below */
      grid-row-gap: 35px;
      grid-column-gap: 35px;
    }
    ${Respinsive.mobile} {
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); /* see notes below */
      grid-row-gap: 35px;
      grid-column-gap: 35px;

      margin-top: 30px;
      margin-bottom: 40px;
    }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 14px;
  cursor: pointer;
  /* background-color: yellow; */
  box-shadow: 0px -1px 27px -17px rgba(201,201,201,0.4);
-webkit-box-shadow: 0px -1px 27px -17px rgba(201,201,201,0.4);
-moz-box-shadow: 0px -1px 27px -17px rgba(201,201,201,0.4);
`;

const ItemBackground = styled.div`
  position: absolute;
  top: -1rem;
  bottom: -8rem;
  left: -1rem;
  right: -1rem;
  background-color: green;
  z-index: 1;
  box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.16);
`;

const Img = styled.div`
  width: 100%;
  /* height: 54.2rem; */
  height: 540px;
  background-image: ${(props: { backgroundImage: string }) =>
    `url(${props.backgroundImage})`};
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
  ${Respinsive.laptop} {
    height: 300px;
    width: 250px;
  }
  ${Respinsive.tablet} {
    height: 420px;
  }
  ${Respinsive.mobile} {
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

  border-radius: 14px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 2rem;
`;

const BookmarkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
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
  height: 5.6rem;
  font-weight: 600;
  font-family: "fira-go";
  font-size: 1.6rem;
  background-image: var(--button-gradient);
  /* margin-top: 2.0rem; */
  /* display: none; */
  ${Responsive.laptop}{
    font-size: 18px;
}
`;

const Price = styled.span`
  font-size: 28px;
  color: var(--text-color);
  font-weight: 700;
  font-family: "fira-go";
    ${Responsive.mobile} {
      font-size: 21px;
    }
    ${Responsive.laptop} {
      font-size: 18px;
      margin-bottom: -10px;
    }
`;

const OldPrice = styled.span`
  font-size: 18px;

  font-family: ${Fonts.FiraGORegular};
  color: var(--text-color);
  font-weight: 700;
  margin-left: 20px;
  margin-top: 5px;
  opacity: 0.5;
  text-decoration: line-through;
    ${Responsive.mobile}{
      margin-top: 2px;
    }
    ${Responsive.laptop}{
      font-size: 14px;
      margin-top: -2px;
  }
`;

const Title = styled.span`
  color: var(--text-color);
  /* font-family: 'BPG WEB 002 Caps'; */
  text-transform: uppercase;
  font-feature-settings: "case" on;

  font-weight: 700;
  font-size: 18px;

  font-family: "helvetica";
    ${Responsive.mobile} {
      font-size: 13px;
    }
    ${Responsive.laptop}{
      font-size: 12px;
  }
`;

export const Count = styled.span`
  font-size: 16px;
  font-family: ${Fonts.FiraGOMedium};
  color: var(--text-color);
  /* margin-top: -3px; */
  margin-top: 2px;
  margin-left: 10px;
    ${Responsive.mobile}{
      font-size: 13px;
      /* margin-top: -4px; */
    }
    ${Responsive.laptop}{
      font-size: 12px;
      margin-top: -4px;
    }
`;

const Badge = styled.span`
  font-size: 18px;
  font-family: "helvetica";
  color: #22d5ae;
  padding: 0.2rem 0.8rem;
  border-radius: 2.1rem;
  border: 0.15rem solid #22d5ae;
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
  color: #22d5ae;
  border: 0.2rem solid #22d5ae;
  &:hover {
    /* background-color: #22D5AE; */
    border: none;
    color: white;
    background-image: linear-gradient(to right, #22d5ae, #3a7bd5);
  }
`;
const TitileWrapper = styled.div`
  /* background-color: red; */
  display: flex;
  align-items: flex-end;
`;
const ItemTitleStyle = styled.div`
  /* margin-bottom: 10px; */
  color: var(--text-color);
  font-family: "'helvetica";
  font-size: 18px;
  text-transform: uppercase;
  font-feature-settings: '"case" on';
`;
const PriceWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px 10px 0px;
    ${Responsive.mobile}{
      margin: 14px 0px 10px 0px;
    }
`;
const StartsWrapper = styled.div`
  display: flex;
  gap: 7px;
  padding-bottom: 5px;
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
const BsBookmarkPlusFillStyle = styled(BsBookmarkPlusFill)`
  width: 20px;
`;
const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
        ${Responsive.tabletMobile} {
            flex-wrap: wrap;
        }
        
`;
const FilltersBox = styled.div`
    margin-right: 24px;
    margin-bottom: 20px;
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
      ${Responsive.tablet} {
        flex-direction: column;
      }
      ${Responsive.mobile} {
        flex-direction: column;
      }
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
    height: calc(100% - 100px);
    width: 490px;
    padding: 50px 30px 30px 30px;
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
    /* justify-content: space-between; */
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
            height: 70px;
        }
`;
const SliderWrapperStyle = styled.div`
    margin-top: auto;
    min-height: 130px;
`;


const Item = ({ product }: { product: ProductData }) => {
  const [hovered, setHovered] = useState(false);

  const imgSrc = product?.images?.length
    ? config.imagesEndpoint + product?.images[0]
    : "/assets/default-image.png";

  const dispatch = useDispatch();

  // const prices = calculateProductPrices(product);

  const _addToCart = () => {
    dispatch(
      showFeedback({
        show: true,
      })
    );
  };


  return (
    <>
      <Link href={"/detail/" + product.id}>
        <ItemWrapper
          className={styles.wrapper}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Img backgroundImage={uploadUrl(product.decoded_images[0])} className={styles.child}>
            {/* {hovered && (
              <ItemOverlay>
                <BookmarkWrapper style={{ zIndex: 20 }}>
                  <BsBookmarkPlusFillStyle color={"#ffffff"} />
                </BookmarkWrapper>
              </ItemOverlay>
            )} */}
          </Img>
          <PriceWrapper

            className={styles.child}
          >
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {/* <Price>{prices.finalPrice} ₾</Price> */}
              {product ? (
                <>
                  <Price>₾{product?.discount?.length >= 1 ? product?.low_price_discounted : product?.lowest_price}</Price>
                  {product?.discount?.length >= 1 ? (
                    <OldPrice>{product?.discount?.length >= 1 ? product?.lowest_price : null} ₾</OldPrice>
                  ) : null}
                </>
              ) : null}
            </div>
            {/* @ts-ignore */}
            {product.discount?.is_active && <Badge>-{product.discount.value}%</Badge>}
          </PriceWrapper>
          <ItemTitleStyle
            className={styles.child}

          >
            <Title>{product.product_name}</Title>
            {/* / შავი ზედა... */}
          </ItemTitleStyle>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className={styles.child}
          >
            {/* <StartsWrapper>
              <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
              <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
              <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
              <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
              <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
            </StartsWrapper> */}
            <Raiting raitingCount={product?.rating} />
            <Count>{product.views} ნახვა</Count>
          </div>
          {hovered && (
            null
            // <ItemButton
            //   className={styles.child}
            //   // onClick={_addToCart}
            //   onMouseOver={() => setHovered(true)}
            //   onMouseLeave={() => setHovered(false)}
            // >
            //   კალათაში დამატება
            // </ItemButton>
          )}
          {/* {hovered && <ItemBackground />} */}
        </ItemWrapper>
      </Link>
    </>
  );
};

type FilterSideBarProps = {
  filters: any;
  colorFilters: any;
  selectedFilter: number | undefined;
  onClose: Function;
  onEnter: Function;
};


const Catalog: NextPage = () => {

  const router = useRouter();

  const { id } = router.query;
  const { asPath } = useRouter()

  // console.log(asPath)

  const category_id_str = asPath.substring(asPath.lastIndexOf('/') + 1);

  const [showHideLoader, setshowHideLoader] = useState(false);

  const getFirstLevelFilters = (root: any, array: any) => {
    if (!root.childrens) return;
    for (const item of root.childrens) {
      array.push(item);
      getSecondLevelFilters(item, array);
    }
  };

  const getSecondLevelFilters = (root: any, array: any) => {
    if (!root.childrens) return;
    for (const elem of root.childrens) {
      array.push(elem);
    }
  };

  const _numberClick = (n: number) => {
    setPageIndex(n);
  };

  const findCategoryNode = (id: number, tree: any) => {
    // const found =tree.find((item: any) => item.id === id);
    // if(found) {
    //     return found;
    // }
    // console.log(id, tree);
    for (const item of tree) {
      // console.log(id, item.id);
      if (item.id === id) {
        return { level: 1, root: item, category: item };
      }
      if (!item.childrens) {
        continue;
      }
      for (const elem of item.childrens) {
        // console.log(id, elem.id);
        if (id === elem.id) {
          return { level: 2, root: elem, category: elem };
        }
        if (!elem.childrens) {
          continue;
        }
        for (const child of elem.childrens) {
          // console.log(id, child.id);
          if (id === child.id) {
            return { level: 3, root: elem, selectedId: id, category: child };
          }
        }
      }
    }
    return {};
  };

  const onFilterEnter = async (event: any) => {
    setOpenFilters(false);
    const params = {
      categories: [event.category],
      color_variation: event.color,
    };
    // console.log(event);
    if (!id) return;
    try {
      const resp = await getFilteredItems(+id, params);
      // console.log(resp);
      const array = _formatProductsData(resp?.data?.data);
      // console.log(array, "ascacacas");

      setProducts(array);
    } catch (error) {
      // console.log(error);
    }
  };

  const _formatProductsData = (data: any) => {
    return data?.map((item: any) => {
      if (item.images) {
        item.images = JSON.parse(item.images);
      }
      if (item.discount && item.discount[0]) {
        item.discount = item.discount[0];
      }
      return item;
    });
  };

  const [openFilters, setOpenFilters] = useState(false);

  const [products, setProducts] = useState<any>([]);
  const [items, setItems] = useState<any>([]);
  const [selectedFilterId, setSelectedFilterId] = useState<number | undefined>(
    undefined
  );
  const [colorFilters, setColorFilters] = useState<any>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const context = useContext(CategoriesContext);
  // console.log(context);


  // const category = findCategoryInAllCategories(+id, allCategories || []);
  // const categoryWithParents = findCategoryAndParents(id, allCategories);

  // @ts-ignore
  const category = findCategoryNode(+id, context)?.category;

  useEffect(() => {
    document.body.style.overflow = openFilters ? "hidden" : "auto";
  }, [openFilters]);

  useEffect(() => {
    // console.log(id, router);
    if (!id) return;

    Promise.all([getFilters(+id), getProductsById(+id)])
      .then(([filtersResp, dataResp]) => {
        // console.log(filtersResp);
        setshowHideLoader(true);
        const {
          data: { color_variations },
        } = filtersResp;
        setColorFilters(color_variations);
        const array = _formatProductsData(dataResp?.data);
        // console.log(array.lenght);
        setProducts(array);
        setshowHideLoader(false)
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (!id || !context?.length) return;
    const filtersNode = findCategoryNode(+id, context);
    // console.log(filtersNode);
    const array: any = [];
    if (filtersNode.level === 1) {
      getFirstLevelFilters(filtersNode.root, array);
    } else if (filtersNode.level === 2 || filtersNode.level === 3) {
      getSecondLevelFilters(filtersNode.root, array);
    }
    if (filtersNode.selectedId) {
      setSelectedFilterId(filtersNode.selectedId);
    }

    // console.log(array);
    setItems(array);
  }, [id, context]);


  const [selectedPrices, setSelectedPrices] = useState<any>("");
  const [sizeVariationID, setsizeVariationID] = useState<number>(0);
  const [colorVariationID, setcolorVariationID] = useState<number>(0);
  const [startPrice, setStartPrice] = useState<string>(selectedPrices?.startValue ? selectedPrices?.startValue : "");
  const [endPrice, setEndPrice] = useState<string>(selectedPrices?.endValue ? selectedPrices?.endValue : "");
  const [sortBy, setsortBy] = useState<string>("");
  const [brandId, setbrandId] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [otherFilterName, setotherFilterName] = useState<string>();
  const [category_id, setcategory_id] = useState<number>(0);

  // clear filters fields
  const clearFilterFields = () => {
    setsizeVariationID(0);
    setcolorVariationID(0);
    setStartPrice("");
    setEndPrice("");
    setbrandId(0);
    setsortBy("");
    setcategory_id(0);
  }
  // console.log(startPrice)
  // console.log(endPrice)

  // update selected price
  useEffect(() => {
    setStartPrice(selectedPrices?.startValue ? selectedPrices?.startValue : "");
    setEndPrice(selectedPrices?.endValue ? selectedPrices?.endValue : "");
  }, [selectedPrices])


  // filter data with category id and other props
  const { data: productFilter, isLoading: isProductFilteLoading, refetch: refetchProductFilte } = api.useProductFilterQuery({
    category_id: category_id_str,
    start_price: startPrice,
    end_price: endPrice,
    color_variation_id: colorVariationID,
    size_variation_id: sizeVariationID,
    sort_by: sortBy, //rating, time, discount, popularity
    brand_id: brandId,
    categories: category_id,
    page: currentPage
  });

  // filter fields with category id
  const { data: categoryFilter, isLoading: isCategoryFilterLoading, refetch: refetchCategoryFilter } = api.useCategoryFilterQuery(category_id_str);

  // update filters
  useEffect(() => {
    refetchProductFilte();
  }, [sizeVariationID, colorVariationID, startPrice, endPrice, category_id, brandId, sortBy])

  // pagination page changer
  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1)
  };

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

  // update sortByTitle
  useEffect(() => {
    // sortBy title
    const sortByTitle = sortByArray.find(x => x.value === sortBy);
    setotherFilterName(sortByTitle?.label);
  }, [sortBy])



  // all loader one variable
  const MainLoading = isProductFilteLoading || isCategoryFilterLoading;




  return MainLoading ? <Loader /> : !productFilter ? (<span>not found product by category</span>) : (
    <>
      {openFilters && (
        <div
          className={styles.overlay}
          onClick={() => setOpenFilters(false)}
        ></div>
      )}

      <Breadcrumbs>
        მთავარი / კატეგორიები / {category?.category_name}
      </Breadcrumbs>

      <HeadWrapperStyle>
        <TitileWrapper>
          <Heading>{category?.category_name}</Heading>
          <Quantity>{productFilter.data.length} პროდუქტი</Quantity>
        </TitileWrapper>
        <FilterWrapper>
          <FilltersBox>
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
          </FilltersBox>


          {categoryFilter?.brands ? (
            <FilltersBox>
              <DropDown dropdownTitle="ბრენდი">
                <RadioButton
                  id=""
                  onChange={(value) => setbrandId(value)}
                  options={[
                    ...categoryFilter?.brands.map((brandV, index) => ({
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
              მეტი ფილტრი
              <MoreFilterIconStyle />
            </MoreFilterBtn>
          </FilltersBox>


          {openModal && <MainFilterComponent>
            <Shadow onClick={() => setOpenModal(false)} />
            <Content>
              <Scrollbar hide={openModal === true ? true : false} />

              {categoryFilter?.categories ? (
                <>
                  <MediumTitle>კატეგორიები</MediumTitle>
                  <FilterInnterWrapper>
                    <RadioButton
                      id={`category_id`}
                      onChange={(value) => setcategory_id(value)}
                      options={[
                        ...categoryFilter.categories.map((c, index) => ({
                          label: c.category_name,
                          value: c.id
                        })),
                      ]}
                      value={category_id}
                    />
                  </FilterInnterWrapper>
                </>
              ) : null}

              {categoryFilter?.color_variations ? (
                <>
                  <MediumTitle>ფერი</MediumTitle>
                  <FilterInnterWrapper>
                    <RadioButton
                      id="color-id"
                      onChange={(value) => setcolorVariationID(value)}
                      options={[
                        ...categoryFilter.color_variations.map((colorV, index) => ({
                          label: colorV.color_name,
                          value: colorV.id
                        }))
                      ]}
                      value={colorVariationID}
                    />
                  </FilterInnterWrapper>
                </>
              ) : null}

              {categoryFilter?.size_variations ? (
                <>
                  <MediumTitle>ზომა</MediumTitle>
                  <FilterInnterWrapper>
                    <RadioButton
                      id="size-id"
                      onChange={(value) => setsizeVariationID(value)}
                      options={[
                        ...categoryFilter.size_variations.map((sizeV, index) => ({
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
                <MediumTitle style={{ marginBottom: '25px' }}>ფასი</MediumTitle>
                <Slider onChange={(e: any) => setSelectedPrices(e)} />
              </SliderWrapperStyle>

              {/* {categoryFilter.categories.length >= 1 ? (
                <MediumTitle>კატეგორიები</MediumTitle>
              ) : null}
              <FilterInnterWrapper>
                {categoryFilter.categories.map((category, index) => {
                  return (
                    <div>{category.category_name}</div>
                  )
                })}
              </FilterInnterWrapper> */}

              <BtnWithBorder onClick={clearFilterFields}>გასუფთავება</BtnWithBorder>
              <BtnWithBorder onClick={() => setOpenModal(false)}>არჩევა</BtnWithBorder>
            </Content>
          </MainFilterComponent>}


        </FilterWrapper>
      </HeadWrapperStyle>


      <Grid>
        {productFilter.data.map((product, index) => (
          <Item
            product={product}
            key={index}
          ></Item>
        ))}
      </Grid>

      <CustomPaginationWrapper>
        <ReactPaginate
          breakLabel="..."
          // nextLabel="next >"
          onPageChange={handlePageClick}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          pageCount={productFilter.links.length - 2}//add page count and remove prev & next buttons
        // previousLabel="< previous"
        />
      </CustomPaginationWrapper>

      {/* <Pagination style={{ margin: "3.2rem 0 3.7rem 0" }} gap={"1.4rem"}>
        {[1, 2, 3, 4].map((i, j) => (
          <Number
            key={j}
            onClick={() => _numberClick(j)}
            selected={pageIndex === j}
          >
            {i}
          </Number>
        ))}
      </Pagination> */}
    </>
  );
};

export default Catalog;
