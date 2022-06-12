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
import { calculateProductPrices, Category, Product, FilteredCategory, FilterWithProps } from '../../domain/shop';
import MoreFilterIcon from '../../public/icons/more-filter-icon.svg'
import api from "../../features/api";
import Responsive from "../../config/Responsive";
import DropDown from "../../components/customStyle/DropDown";
import RadioButton from "../../components/customStyle/RadioButton";
import SidebarFilter from "../../components/customStyle/SidebarFilter";
import Loader from "../../components/Loader";
import { Scrollbar } from "../../components/GlobalStyle";


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
`;

const Quantity = styled.span`
  font-weight: 500;
  color: var(--text-color);
  opacity: 0.5;
  font-family: fira-go;
  font-size: 1.6rem;
  transform: translateY(-0.9rem);
  margin-left: 2.2rem;
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
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* see notes below */
      grid-row-gap: 35px;
      grid-column-gap: 35px;
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
    height: 450px;
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
`;

const Price = styled.span`
  font-size: 28px;
  color: var(--text-color);
  font-weight: 700;
  font-family: "fira-go";
    ${Responsive.mobile} {
      font-size: 21px;
    }
`;

const OldPrice = styled.span`
  font-size: 1.8rem;

  font-family: "helvetica";
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

  font-family: "helvetica";
    ${Responsive.mobile} {
      font-size: 13px;
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
  font-family: "helvetica";
  color: #22d5ae;
  padding: 0.2rem 0.8rem;
  border-radius: 2.1rem;
  border: 0.15rem solid #22d5ae;
  display: flex;
  font-weight: bold;
  align-items: center;
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
  margin: 20px 0px 16px 0px;
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


const Item = ({ product }: { product: Product }) => {
  const [hovered, setHovered] = useState(false);

  const imgSrc = product?.images?.length
    ? config.imagesEndpoint + product?.images[0]
    : "/assets/default-image.png";

  const dispatch = useDispatch();

  const prices = calculateProductPrices(product);

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
          <Img backgroundImage={imgSrc} className={styles.child}>
            {hovered && (
              <ItemOverlay>
                <BookmarkWrapper style={{ zIndex: 20 }}>
                  <BsBookmarkPlusFillStyle color={"#ffffff"} />
                </BookmarkWrapper>
              </ItemOverlay>
            )}
          </Img>
          <PriceWrapper

            className={styles.child}
          >
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <Price>{prices.finalPrice} ₾</Price>
              {prices.hasDiscount && (
                <OldPrice>{prices.originalPrice} ₾</OldPrice>
              )}
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
            {/* <Count>402 ნახვა</Count> */}
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

// const FilterSideBar = ({
//   onClose,
//   onEnter,
//   filters,
//   selectedFilter,
//   colorFilters,
// }: FilterSideBarProps) => {
//   const [selectedCategory, setSelectedCategory] = useState(selectedFilter);
//   const [selectedColor, setSelectedColor] = useState<any>(null);
//   const [selectedPrices, setSelectedPrices] = useState<any>(null);

//   const handleSelectChange = (event: any) => {
//     const value = event.target.value;
//     setSelectedCategory(+value);
//     console.log(value);
//   };

//   const array1 = [
//     {
//       label: "ყველა",
//       value: "all",
//     },
//     {
//       label: "ახალდამატებული",
//       value: "new",
//     },
//     {
//       label: "ზედები",
//       value: "tops",
//     },
//     {
//       label: "შარვლები",
//       value: "pants",
//     },
//     {
//       label: "კაბები",
//       value: "dresses",
//     },
//     {
//       label: "კორსეტები და პიჯაკები",
//       value: "coreset",
//     },
//     {
//       label: "ფეხსაცმელები",
//       value: "shoes",
//     },

//     {
//       label: "დიდი ზომები",
//       value: "big",
//     },
//     {
//       label: "აქსესუარები",
//       value: "accessories",
//     },
//   ];

//   const array2 = [
//     {
//       label: "ფასდაკლებები",
//       value: "sale",
//     },
//     {
//       label: "პოპულარულები",
//       value: "popular",
//     },
//     {
//       label: "ექსკლუზიურები",
//       value: "exclusive",
//     },
//     {
//       label: "დაბალ ბიუჯეტურები",
//       value: "low-budget",
//     },
//     {
//       label: "შეთავაზებები",
//       value: "offers",
//     },
//   ];

//   const [colors, setColors] = useState([
//     "#000000",
//     "#794428",
//     "#f6881b",
//     "#fee41f",
//     "#2bb430",
//     "#345fec",
//     "#a527f3",
//     "#fea6fb",
//   ]);
//   const [arr1, setArr1] = useState(array1);
//   const [arr2, setArr2] = useState(array2);

//   const _colorChanged = (e: any) => {
//     console.log(e);
//     setSelectedColor(e);
//   };

//   const _onEnter = () => {
//     const selectedFilters: any = {
//       color: selectedColor,
//       category: selectedCategory,
//       prices: selectedPrices,
//     };
//     console.log(selectedFilters);
//     onEnter(selectedFilters);
//   };

//   return (
//     <>
//       <div className={styles.filterSideBar}>
//         <div className={styles.filterTitle}>კატეგორიები</div>
//         <Wrapper>
//           {filters.map((item: any, i: number) => (
//             <RadioItem key={i}>
//               <RadioButton
//                 type="radio"
//                 name="radio"
//                 value={item.id}
//                 checked={selectedCategory === item.id}
//                 onChange={(event) => handleSelectChange(event)}
//               />
//               <RadioButtonLabel />
//               <div className={styles.radioButtonLabel}>
//                 {item.category_name}
//               </div>
//             </RadioItem>
//           ))}
//         </Wrapper>
//         <div className={styles.divider}></div>
//         <div className={styles.filterTitle}>ფასი</div>
//         <Slider onChange={(e: any) => setSelectedPrices(e)}></Slider>
//         <Wrapper style={{ marginTop: "5.0rem" }}>
//           {arr2.map((item, i) => (
//             <RadioItem key={i}>
//               <RadioButton
//                 type="radio"
//                 name="radio"
//                 value={item.value}
//                 checked={"test" === item.value}
//                 onChange={(event) => handleSelectChange(event)}
//               />
//               <RadioButtonLabel />
//               <div>{item.label}</div>
//             </RadioItem>
//           ))}
//         </Wrapper>
//         <div className={styles.filterTitle} style={{ marginTop: "4.2rem" }}>
//           ფერები
//         </div>
//         <div>
//           <ColorSelector
//             colors={colorFilters}
//             small
//             style={{ justifyContent: "space-between" }}
//             onColorSelected={(event: any) => _colorChanged(event)}
//           />
//         </div>
//         <div className={styles.filterFooter}>
//           <HoverButton
//             style={{ fontWeight: 500, height: "7.1rem" }}
//             lowercase
//             onClick={() => onClose()}
//           >
//             გაუქმება
//           </HoverButton>
//           <Button
//             style={{ fontWeight: 500, height: "7.1rem" }}
//             lowercase
//             onClick={() => _onEnter()}
//           >
//             აჩვენე 124
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

const Catalog: NextPage = () => {

  const router = useRouter();

  const { id } = router.query;
  const { asPath } = useRouter()

  // console.log(asPath)

  const lastId = asPath.substring(asPath.lastIndexOf('/') + 1);

  const category_id_parse = parseFloat(lastId)
  // console.log(typeof category_id_parse)


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
        // console.log(array, "ascacacas");
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


  const [getColor, setGetColor] = useState();
  const [getSize, setGetSize] = useState();


  const [sizeVariationID, setsizeVariationID] = useState<number>();
  const [colorVariationID, setcolorVariationID] = useState<number>();


  const [lowestPrice, setLowestPrice] = useState<string>("0");
  const [highestPrice, setHighestPrice] = useState<string>("9999999999999");


  const [openModal, setOpenModal] = useState(false);




  const { data: filtered, isLoading: isFilteredLoading, refetch: refetchFiltered } = api.useFilterQuery(category_id_parse);

  // const { data: FilteredCategory, isLoading: isFilteredCategoryLoading, refetch: refetchFilteredCategory } = api.useFilteredCategoryQuery({
  //   size_variation: sizeVariationID, color_variation: colorVariationID, start_price: startPrice, end_price: endPrice, category_id: parseInt(categoryID, 10)
  // });

  console.log(filtered)


  const mainFiltered = products.filter((p: Product) => {
    return lowestPrice <= p.lowest_price && highestPrice >= p.highest_price
  });

  // console.log(products)


  const MainLoading = isFilteredLoading

  return MainLoading ? <Loader /> : !filtered ? (<span>not found filtered data</span>) : (
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
          {/* <Quantity>12 323 პროდუქტი</Quantity> */}
        </TitileWrapper>
        <FilterWrapper>



          <FilltersBox>
            <DropDown dropdownTitle="მინ. ფასი">
              <RadioButton
                id="low-id"
                onChange={(value) => setLowestPrice(value)}
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
                value={lowestPrice}
              />
            </DropDown>
          </FilltersBox>

          <FilltersBox>
            <DropDown dropdownTitle="მახ. ფასი">
              <RadioButton
                id="hight-id"
                onChange={(value) => setHighestPrice(value)}
                options={[
                  { label: "განულება", value: "9999999999999" },
                  { label: "100 ₾", value: "100" },
                  { label: "200 ₾", value: "200" },
                  { label: "300 ₾", value: "300" },
                  { label: "400 ₾", value: "400" },
                  { label: "500 ₾", value: "500" },
                  { label: "600 ₾", value: "600" },
                  { label: "700 ₾", value: "700" },
                ]}
                value={highestPrice}
              />
            </DropDown>
          </FilltersBox>

          <FilltersBox>
            <MoreFilterBtn onClick={() => setOpenModal(true)}>
              მეტი ფილტრი
              <MoreFilterIconStyle />
            </MoreFilterBtn>
          </FilltersBox>

          {/* {openModal && <SidebarFilter product={products} openModal={setOpenModal} />} */}


          {openModal && <MainFilterComponent>
            <Shadow onClick={() => setOpenModal(false)} />
            <Scrollbar hide={true} />
            <Content>
              <MediumTitle>ფერი</MediumTitle>
              <FilterInnterWrapper>
                <RadioButton
                  id="color-id"
                  onChange={(value) => setGetColor(value)}
                  options={[
                    ...filtered.color_variations.map((c, index) => ({
                      label: c.color_name,
                      value: c.color
                    })),
                  ]}
                  value={getColor}
                />
              </FilterInnterWrapper>

              <MediumTitle>ზომა</MediumTitle>

              <FilterInnterWrapper>
                <RadioButton
                  id="size-id"
                  onChange={(value) => setGetColor(value)}
                  options={[
                    ...filtered.size_variations.map((s, index) => ({
                      label: s.size_name,
                      value: s.id
                    })),
                  ]}
                  value={getColor}
                />
              </FilterInnterWrapper>

              {filtered.categories.length >= 1 ? (
                <MediumTitle>კატეგორიები</MediumTitle>
              ) : null}
              <FilterInnterWrapper>
                {filtered.categories.map((category, index) => {
                  return (
                    <div>{category.category_name}</div>
                  )
                })}
              </FilterInnterWrapper>


            </Content>
          </MainFilterComponent>}


        </FilterWrapper>
      </HeadWrapperStyle>


      <Grid>
        {mainFiltered?.length ? (
          mainFiltered.map((item: Product, i: number) => (
            <Item
              product={item}
              key={i}
            ></Item>
          ))
        ) : (
          <h1>0 შედეგი</h1>
        )}

        {showHideLoader === true ? <Loader /> : null}

        {/* <Item id={2} imgSrc={'/assets/3112.png'}></Item>
                <Item id={3} imgSrc={'/assets/6.png'}></Item>
                <Item id={4} imgSrc={'/assets/3112.png'}></Item>

                <Item id={1} imgSrc={'/assets/6.png'}></Item>
                <Item id={2} imgSrc={'/assets/2.png'}></Item>
                <Item id={3} imgSrc={'/assets/2.png'}></Item>
                <Item id={4} imgSrc={'/assets/3112.png'}></Item>

                <Item id={1} imgSrc={'/assets/6.png'}></Item>
                <Item id={1} imgSrc={'/assets/3112.png'}></Item>
                <Item id={1} imgSrc={'/assets/3112.png'}></Item>
                <Item id={1} imgSrc={'/assets/2.png'}></Item> */}
      </Grid>

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
