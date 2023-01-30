import type { NextPage } from "next";
import styles from "../../styles/Detail.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ItemPreview from "../../components/ItemPreview";
import SizeSelector, { SizeType } from "../../components/SizeSelector";
import ColorSelector from "../../components/ColorSelector";
import {
  BsBookmarkPlusFill,
  BsFillCartPlusFill,
  BsStarFill,
} from "react-icons/bs";
import Item from "../../components/item";
import { Count } from "../catalog/[id]";
import { Breadcrumbs } from "../../components/styled/breadcrumbs";
import Button from "../../components/styled/button";
import { useDispatch } from "react-redux";
import { showFeedback } from "../../features/feedbackSlice";
import BagIcon from "../../public/icons/react-icons/bag";
import { useRouter } from "next/router";
import { getProductDetailsById } from "../../services/products-service";
import config from "../../config.json";
import ReactHtmlParser from "html-react-parser";
import { ColorType } from "../../interfaces/products";
import { Product, ProductData, ProductVariationDetail, VariationSize } from "../../domain/shop";
import { addToCart, addToFavorite } from "../../services/checkout-services";
import api, { uploadUrl } from "../../features/api";
import Responsive from "../../config/Responsive";
import { Alert, Snackbar } from "@mui/material";
import Loader from "../../components/Loader";
import Fonts from "../../styles/Fonts";
import Raiting from '../../components/customStyle/Raiting';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


type ButtonProps = {
  secondary?: boolean;
};
const Section = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
    ${Responsive.tablet}{
      flex-direction: column;
    }
    ${Responsive.mobile}{
      flex-direction: column;
    }
`;
const DetailMainWrapper = styled.div`
  flex-basis: 40%;
  margin-left: 45px;
    ${Responsive.tablet} {
      flex-basis: 100%;
      margin-left: 150px;
      margin-top: 30px;
    }
    ${Responsive.mobile}{
      margin-left: 0px;
      margin-top: 25px;
    }
    ${Responsive.laptop}{
      margin-left: 30px;
    }
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemPreviewWrapper = styled.div`
  flex-basis: 60%;
  ${Responsive.tablet} {
    flex-basis: 100%;
  }
  ${Responsive.laptop} {
    margin-top: 5px;
  }
`;

const Title = styled.h1`
  color: var(--text-color);
  font-size: 44px;
  font-family: fira-go;
    ${Responsive.mobile}{
      font-size: 32px;
    }
    ${Responsive.laptop} {
      font-size: 29px;
      margin-top: -4px;
    }
`;

const Price = styled(Title)`
  font-size: 44px;
  margin-right: 15px;
  &::before {
    content: "";
  }
  ${Responsive.mobile}{
    font-size: 32px;
  }
  ${Responsive.laptop}{
    font-size: 28px;
    margin-top: -8px;
  }
`;

const OldPrice = styled(Price)`
  font-size: 24px;
  margin-top: 2px;
  opacity: 0.4;
  text-decoration: line-through;
    ${Responsive.mobile}{
      font-size: 18px;
      margin-top: 5px;
    }
    ${Responsive.laptop}{
      margin-top: -10px;
      font-size: 16px;
    }
`;

const Label = styled.span`
  color: var(--text-color);
  font-size: 16px;
  font-weight: 700;
  font-family: "helvetica";
  margin-bottom: 25px;
    ${Responsive.mobile}{
      font-size: 14px;
      margin-bottom: 17px;
    }
`;
const SelectSizeLabel = styled.div`
  color: var(--text-color);
  font-size: 16px;
  font-weight: 700;
  font-family: "helvetica";
  margin-bottom: 25px;
    ${Responsive.mobile}{
        font-size: 14px;
        margin-bottom: 17px;
      }
      ${Responsive.laptop}{
        font-size: 11px;
      }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4rem;
  grid-gap: 10px;
  width: 100%;
  margin-bottom: 40px;
      ${Responsive.mobile}{
        display: flex;
        justify-content: space-between;
          button {
            &:first-child {
              width: 100%;
            }
          }
      }
      ${Responsive.laptop}{
        height: 35px;
          button {
            &:first-child {
              width: 100%;
              height: 100%;
            }
          }
        margin-top: -15px;
      }
`;

const BreadcrumbsStyle = styled(Breadcrumbs)`
    ${Responsive.laptop}{
        margin-top: 4px;
        font-size: 11px;
      }
`;
const ButtonStyle = styled(Button)`
    ${Responsive.laptop}{
        height: 50px!important;
        border-radius: 10px;
      }
`;
// const Button = styled.button`
//   display: inline-flex;
//   height: 8.0rem;
//   background-image: ${(props: ButtonProps) => props.secondary ? 'none' : 'linear-gradient(to right, #22D5AE, #3A7BD5)'};
//   /* background-color: ${(props: ButtonProps) => props.secondary ? 'white' : 'none'} */
//   background-color: white;
//   align-items: center;
//   justify-content: center;
//   color: ${({ secondary }: ButtonProps) => secondary ? '#424F60' : 'white'};
//   font-size: 2.0rem;
//   border: ${({ secondary }: ButtonProps) => secondary ? '.2rem solid rgba(0, 0, 0, 0.08)' : 'none'};
//   border-radius: 1.4rem;
//   cursor: pointer;
// `;

const Subtitle = styled.span`
  color: var(--text-color);
  font-weight: bold;
  font-size: 18px;
  font-family: "helvetica";
  margin-bottom: 20px;
  ${Responsive.laptop}{
    font-size: 12px;
    margin-bottom: 5px;
    font-weight: bolder;
  }
`;

const Text = styled.span`
  color: var(--text-color);
  font-size: 18px;
  margin-bottom: 15px;
  font-family: "helvetica";
  ${Responsive.laptop} {
    font-size: 12px;
    font-weight: 400;
  }
`;

const SectionTitle = styled.div`
  color: var(--text-color);
  font-family: "BPG WEB 002 CAPS";
  /* text-transform: uppercase;
  font-feature-settings: "case" on; */
  font-size: 24px;
  margin-top: 140px;
  :hover{
    cursor: pointer;
  }
      ${Responsive.mobile}{
        margin-top: 50px;
      }
`;

const Grid = styled.section`
  margin-top: 50px;
  overflow-x: scroll;
  padding-bottom: 20px;
  border-radius: 14px;
  display: flex;
`;
const GridChild = styled.div`
  margin: 0px 30px;
  min-width: 280px;
      &:first-child {
        margin-left: 0px;
      }
      &:last-child {
        margin-right: 0px;
      }
    ${Responsive.tablet} {
      min-width: 250px;
      margin: 0px 20px;
    }
    ${Responsive.mobile} {
      min-width: 170px;
      margin: 0px 10px;
    }
    ${Responsive.laptop} {
      min-width: 155px;
    }
`;

const RevieStartWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
  ${Responsive.laptop} {
    margin-top: 12px;
  }
`;
const DetailCount = styled(Count)`
  font-size: 16px;
  margin-left: 15px;
  line-height: 15px;
  margin-top: 2px;
  font-family: ${Fonts.FiraGORegular};
    ${Responsive.mobile}{
      margin-left: 10px;
    }
    ${Responsive.laptop}{
      margin-left: 8px;
      font-size: 10px;
      margin-top: -2px;
      font-weight: 400;
    }
`;
const PriceWrapperStyle = styled.div`
  display: flex;
  margin-bottom: 35px;
`;
const SelectSizeWrapper = styled.div`
  margin-top: 35px;
  margin-bottom: 44px;
    ${Responsive.mobile}{
      margin-bottom: 25px;
      margin-top: 25px;
    }
    ${Responsive.laptop}{
      margin-top: 20px;
    }
`;
const BagIconStyle = styled(BagIcon)`
  width: 30px;
  margin-right: 25px;
    ${Responsive.mobile}{
      width: 25px;
      margin-right: 10px;
    }
    ${Responsive.laptop}{
      width: 20px;
    }
`;
const BsBookmarkPlusFillStyle = styled(BsBookmarkPlusFill)`
  width: 26px;
  height: 25px;
  ${Responsive.laptop}{
    width: 18px;
    height: 18px;
  }
`;
const AddCartButton = styled(Button)`
  width: 77px;
  height: 77px;
    ${Responsive.mobile}{
      min-width: 64px;
      height: 64px;
    }
    ${Responsive.laptop}{
      width: 52px;
      height: 52px;
      border-radius: 9px;
    }
`;





const ProductDetails: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: recommended = [], isLoading: isRecommendedLoading, refetch: refetchRecommended } = api.useGetRecommendedQuery(undefined);
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<ProductVariationDetail[]>([]);
  const [colors, setColors] = useState<ProductVariationDetail[]>([]);

  const [disableFavoriteBtn, setdisableFavoriteBtn] = useState(false);

  const [selectedColorId, setSelectedColorId] = useState<any>(undefined);
  const [selectedSizeId, setSelectedSizeId] = useState<any>(undefined);

  const [product, setProduct] = useState<ProductData | null>(null);

  const { id } = router.query;
  // console.log(id);

  // const { originalPrice, finalPrice, hasDiscount } = calculateProductPrices(product, selectedSizeId);
  // console.log(product, product?.variations);
  const { data: favorites, isLoading: isFavoritesLoading, refetch: refetchFavorites } = api.useGetFavoritesQuery(undefined);
  const { data: cart, isLoading: isCartLoading, refetch: refetchCart } = api.useGetCartQuery(undefined);

  const [addToCart, { isLoading: isAddToCartLoading }] = api.useAddToCartMutation();

  const { data: authData, isLoading: isUserLoading } = api.useProfileQuery(undefined);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackMsgStatus, setsnackMsgStatus] = useState<any>('' || 'warning'); // error | warning | info | success
  
  const [clicked, setClicked] = useState<any>(undefined);
  
  const MainLoading = isRecommendedLoading || isFavoritesLoading || isCartLoading;

  const {t, i18n} = useTranslation();

  useEffect(() => {
    // console.log(id, router);
    if (!id) return;

    getProductDetailsById(+id)
      .then((res) => {
        // console.log(res);
        const { data } = res;
        setProduct(data);
        //
        if (data?.variations?.length) {
          const colorsArray = data.variations.map(
            (item: any) => item.color_variation
          );
          const sizesArray = data.variations.map(
            (item: any) => item.size_variation
          );
          const imagesArray = data.variations.map((item: any) => item.image);
          setColors(colorsArray);
          setSizes(sizesArray);
          setImages([...images, ...imagesArray]);
          // auto-select first color
          _colorSelected(colorsArray[0]?.id);
          // console.log('colorsArray', colorsArray);

          return;
        }
        if (data.images) {
          const parsedImages = JSON.parse(data.images);
          // console.log(parsedImages);
          const imagesArray = parsedImages.map(
            (image: string) => image
          );

          const singleImageArray = parsedImages.map(
            (image: string) => config.imagesEndpoint + image
          );

          {imagesArray.length == 1 ? (
          setImages([...images, ...singleImageArray])
          ) : 
          setImages([...images, ...imagesArray]);
          }
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [id]);

  const _addToCart = async () => {
    if (!authData?.profile?.user) {
      {i18next.language == "ge"?
      setSnackMessage("კალათაში დასამატებლად, გთხოვთ დარეგისტრირდეთ.")
      :
      setSnackMessage("Register to add to basket")
      }
      setOpenSnack(true);
      setsnackMsgStatus('info');
      return;
    }
    if (product && product.variants) {
      try {
        await addToCart({
          productId: product.id,
          variationId: selectedSizeId,
          quantity: 1
        });
        refetchCart();
        {i18next.language == "ge"?
        setSnackMessage("პროდუქტი დაემატა კალათში!")
        :
        setSnackMessage("Product added to basket")
        }
        setOpenSnack(true);
        setsnackMsgStatus('success');
        setClicked(true);
        setTimeout(() =>setClicked(false), 1000);

      } catch (error) {
        {i18next.language == "ge"?
        setSnackMessage("მოხდა შეცდომა, გთხოვთ სცადოთ მოგვიანებით!")
        :
        setSnackMessage("Error, please try again later")
        }
        setOpenSnack(true);
        setsnackMsgStatus('error');
      }
    }
  };

  const _chooseSizeMessage = async () => {
    if(!canAddToCart){
    {i18next.language == "ge"?
    setSnackMessage("გთხოვთ, აირჩიეთ ზომა და ფერი!")
    :
    setSnackMessage("Please choose size and color")
    }
    setOpenSnack(true);
    setsnackMsgStatus('info');
    }
};


  // const _showFeedback = () => {
  //   if (!authData?.profile?.user) {
  //     // alert("კალათაში დასამატებლად, გთხოვთ დარეგისტრირდეთ.");
  //     setSnackMessage("კალათაში დასამატებლად, გთხოვთ დარეგისტრირდეთ.");
  //     setOpenSnack(true);
  //     setsnackMsgStatus('info');
  //     return;
  //   }
  //   // console.log("test", product);
  //   // dispatch(
  //   //   showFeedback({ show: true }),
  //   // );
  //   if (product?.variants) {
  //     console.log(selectedColorId, selectedSizeId);
  //     const variation = product?.variants?.find(
  //       (item: any) =>
  //       (item.color_variation.id =
  //         selectedColorId && item.size_variation.id === selectedSizeId)
  //     );
  //     console.log('var', variation);
  //     if (product && variation) {
  //       // TODO use api.getAddToCartMutation()
  //       addToCart(product.id, variation.id, 1).then(({ data }) => {
  //         // alert(data.success || data.error || "მოხდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.");
  //         refetchCart();
  //         setSnackMessage(data.success || data.error || "მოხდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.");
  //         setOpenSnack(true);
  //         setsnackMsgStatus(data.success ? 'success' : data.error ? "error" : "info");
  //       });
  //     }
  //   }
  // };


  const _showFavoriteFeedback = () => {
    if (!authData?.profile?.user) {
      // alert("ფავორიტებში დასამატებლად, გთხოვთ დარეგისტრირდეთ.");
      setdisableFavoriteBtn(true)

      {i18next.language == "ge"?
      setSnackMessage("ფავორიტებში დასამატებლად, გთხოვთ დარეგისტრირდეთ.")
      :
      setSnackMessage("Please register to add to favourites")
      }
      setOpenSnack(true);
      setsnackMsgStatus('info');
      return;
    }
    if (product) {
      addToFavorite(product.id).then(({ data }) => {
        // alert(data.success || data.error || "პროდუქტი წარმატებით დაემატა ფავორიტებში");
        setdisableFavoriteBtn(true);
        refetchFavorites();
        {i18next.language == "ge"?
        setSnackMessage("პროდუქტი დაემატა ფავორიტებში")
        :
        setSnackMessage("Product added in favourites")
        }
        setOpenSnack(true);
        setsnackMsgStatus('success');
      });
    }
  };


  const _colorSelected = (e: any) => {
    // console.log('color selected:', e);
    setSelectedColorId(e);
    setSelectedSizeId(undefined);
  };

  const _sizeSelected = (e: any) => {
    // console.log('size selected:', e);
    setSelectedSizeId(e);
  };


  const colorsTemp = ["#E536BD", "#536DDB", "#EDC6A7", "#8D5843", "#D53232"];

  const canAddToCart = typeof (selectedColorId) !== 'undefined' && typeof (selectedSizeId) !== 'undefined';

  const canAddToFavorite = typeof (selectedColorId) !== 'undefined' && typeof (selectedSizeId) !== 'undefined';

  // const { data: allCategories, isLoading: isAllCategoriesLoading } = api.useGetCategoriesQuery(undefined);

  // const categoryParents = product?.categories?.length > 0 && findCategoryAndParents(product?.categories?.[0]);



  const sizeVariantResult = product?.variants.filter(x => x.id === selectedColorId);

  const sizeV = sizeVariantResult ? sizeVariantResult[0] : null;

  const forPrice = sizeV?.sizes?.filter(x => x.id === selectedSizeId);

  const mainPrice = forPrice ? forPrice[0]?.price : null;



  return MainLoading ? <Loader /> : !recommended ? (<span>not found Recommended</span>) : (
    <>
      <Section>
        <ItemPreviewWrapper>
          <ItemPreview images={images} />
        </ItemPreviewWrapper>
        <DetailMainWrapper>
          <DetailsWrapper>
            <Breadcrumbs
              style={{
                opacity: 0.5,
                fontWeight: 700,
                marginBottom: "0.8rem",
                textTransform: "uppercase",
                fontFeatureSettings: '"case" on',
              }}
            >
              {/* {'ფეხსაცმელი'} /
            <span style={{ fontWeight: 500 }}> {'მწვანე ფეხსაცმელი'}</span> */}
            {i18next.language == "ge" ?
              <span style={{ fontWeight: 500 }}> {product?.categories?.[0]?.category_name}</span>
              :
              <span style={{ fontWeight: 500 }}> {product?.categories?.[0]?.category_name_en}</span>
            }
            </Breadcrumbs>
            <Title>{product?.product_name}</Title>
            <RevieStartWrapper>
              {product?.rating ? (
                <Raiting raitingCount={product?.rating} />
              ) : (
                null
              )}

              <DetailCount>
                {product?.views} {t('seen')}
              </DetailCount>
            </RevieStartWrapper>
            {/* <PriceWrapperStyle>
              <Price>{finalPrice}</Price>
              {hasDiscount ? (
                <OldPrice>{originalPrice}</OldPrice>
              ) : null}
            </PriceWrapperStyle> */}

            {product ? (
              <PriceWrapperStyle>
                <Price>₾{mainPrice ? mainPrice : product?.discount?.length >= 1 ? product?.low_price_discounted : product?.lowest_price}</Price>
                {product?.discount?.length >= 1 ? (
                  <OldPrice>{product?.discount?.length >= 1 ? product?.lowest_price : null}</OldPrice>
                ) : null}
              </PriceWrapperStyle>
            ) : null}



            {/* <h1>{selectedColorId}</h1> */}

            {colors && !!colors.length && product?.variants && (
              <>
                {/* <Label>აირჩიე ფერი: </Label> */}
                <ColorSelector
                  colors={product?.variants}
                  defaultSelected={colors[0]?.id}
                  gap={"20px"}
                  onColorSelected={(event: any) => _colorSelected(event)}
                />

              </>
            )}
            {/* <h1>{selectedSizeId}</h1> */}



            <SelectSizeWrapper>
              {sizes && !!sizes.length && sizeV && sizeVariantResult && (
                <>
                  <SelectSizeLabel>{t('selectSize')}: </SelectSizeLabel>
                  <SizeSelector
                    sizes={sizeV.sizes}
                    onSelectedChange={(event: any) => _sizeSelected(event)}
                  />
                </>
              )}
            </SelectSizeWrapper>
            <ButtonWrapper onClick={_chooseSizeMessage}>
              {/* onClick={_showFeedback} */}
              <Button onClick={_addToCart} style={{
                ...(!canAddToCart ? { filter: 'grayscale(1)' } : {}), ...(clicked ? { filter: 'grayscale(1)' } : {}),
              }} disabled={!canAddToCart}>
                {/* <BsFillCartPlusFill size={'3.0rem'} style={{ marginRight: '2.4rem' }} /> */}
                <BagIconStyle />
                {t('addInBasket')}
              </Button>

              <AddCartButton secondary onClick={_showFavoriteFeedback} disabled={disableFavoriteBtn}>
                <BsBookmarkPlusFillStyle />
              </AddCartButton>

            </ButtonWrapper>
            <Subtitle>
            {t('additionalInformation')}
            </Subtitle>
            {product?.description && <Text>{ReactHtmlParser(product?.description)}</Text>}
          </DetailsWrapper>
        </DetailMainWrapper>
      </Section>

      <Snackbar
        open={openSnack}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        onClose={() => setOpenSnack(false)}>
        <Alert severity={snackMsgStatus}>
          {snackMessage}
        </Alert>
      </Snackbar>


      <SectionTitle onClick={() => {router.push(`/discounts`);}}>
      {t('recommended')}
      </SectionTitle>
      <Grid>
        {recommended.map((r, index) => (
          <GridChild key={index}>
            <Item
              name={r.product_name}
              price={r.lowest_price}
              id={r.id}
              oldPrice={''}
              currency="gel"
              imageUrl={uploadUrl(r.decoded_images[0])}
            />
          </GridChild>
        ))}
      </Grid>
    </>
  );
};
export default ProductDetails;
