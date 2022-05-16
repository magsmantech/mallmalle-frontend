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
import { calculateProductPrices, Product } from "../../domain/shop";
import { addToCart } from "../../services/checkout-services";
import api from "../../features/api";
import Responsive from "../../config/Responsive";

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
`;

const Title = styled.h1`
  color: var(--text-color);
  font-size: 44px;
  font-family: fira-go;
    ${Responsive.mobile}{
      font-size: 32px;
    }
`;

const Price = styled(Title)`
  font-size: 44px;
  margin-right: 15px;
  &::before {
    content: "$";
  }
  ${Responsive.mobile}{
    font-size: 32px;
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
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 8rem;
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
`;

const Text = styled.span`
  color: var(--text-color);
  font-size: 18px;
  margin-bottom: 15px;
  font-family: "helvetica";
`;

const SectionTitle = styled.div`
  color: var(--text-color);
  font-family: "BPG WEB 002 CAPS";
  /* text-transform: uppercase;
  font-feature-settings: "case" on; */
  font-size: 24px;
  margin-top: 140px;
      ${Responsive.mobile}{
        margin-top: 50px;
      }
`;

const Grid = styled.section`
  margin-top: 50px;
  overflow-x: scroll;
  display: grid;
  grid-auto-flow:column; 
  grid-gap: 30px; 
  white-space: nowrap;
  padding-bottom: 20px;
  border-radius: 14px;
`;

const RevieStartWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;
const DetailCount = styled(Count)`
  font-size: 16px;
  margin-left: 15px;
    ${Responsive.mobile}{
      margin-left: 10px;
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
`;
const BagIconStyle = styled(BagIcon)`
  width: 30px;
  margin-right: 25px;
    ${Responsive.mobile}{
      width: 25px;
      margin-right: 10px;
    }
`;
const BsBookmarkPlusFillStyle = styled(BsBookmarkPlusFill)`
  width: 26px;
  height: 25px;
`;
const AddCartButton = styled(Button)`
  width: 77px;
  height: 77px;
    ${Responsive.mobile}{
      min-width: 64px;
      height: 64px;
    }
`;





const ProductDetails: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<SizeType[]>([]);
  const [colors, setColors] = useState<ColorType[]>([]);

  const [selectedColorId, setSelectedColorId] = useState<any>(undefined);
  const [selectedSizeId, setSelectedSizeId] = useState<any>(undefined);

  const [product, setProduct] = useState<Product | null>(null);

  const { id } = router.query;
  console.log(id);

  const { originalPrice, finalPrice, hasDiscount } = calculateProductPrices(product, selectedSizeId);
  console.log(product, product?.variations);

  const { data: cart, isLoading: isCartLoading, refetch: refetchCart } = api.useGetCartQuery(undefined);

  const { data: authData, isLoading: isUserLoading } = api.useProfileQuery(undefined);

  useEffect(() => {
    console.log(id, router);
    if (!id) return;

    getProductDetailsById(+id)
      .then((res) => {
        console.log(res);
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
          console.log('colorsArray', colorsArray);

          return;
        }
        if (data.images) {
          const parsedImages = JSON.parse(data.images);
          console.log(parsedImages);
          const imagesArray = parsedImages.map(
            (image: string) => config.imagesEndpoint + image
          );

          setImages([...images, ...imagesArray]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const _showFeedback = () => {
    if (!authData?.profile?.user) {
      alert("კალათაში დასამატებლად, გთხოვთ დარეგისტრირდეთ.");
      return;
    }
    console.log("test", product);
    // dispatch(
    //   showFeedback({ show: true }),
    // );
    if (product?.variations) {
      console.log(selectedColorId, selectedSizeId);
      const variation = product?.variations?.find(
        (item: any) =>
        (item.color_variation.id =
          selectedColorId && item.size_variation.id === selectedSizeId)
      );
      console.log('var', variation);
      if (product && variation) {
        // TODO use api.getAddToCartMutation()
        addToCart(product.id, variation.id, 1).then(({ data }) => {
          alert(data.success || data.error || "მოხდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.");
        });
      }
    }
  };

  const _colorSelected = (e: any) => {
    console.log('color selected:', e);
    setSelectedColorId(e);
  };

  const _sizeSelected = (e: any) => {
    console.log('size selected:', e);
    setSelectedSizeId(e);
  };

  const imagesTemp = [
    "/assets/1.png",
    "/assets/13_024_540x.png",
    "/assets/13_034_540x.png",
    "/assets/13_053_540x.png",
  ];

  const sizesTemp = ["34", "36", "38", "40", "42"];

  const colorsTemp = ["#E536BD", "#536DDB", "#EDC6A7", "#8D5843", "#D53232"];

  const canAddToCart = typeof (selectedColorId) !== 'undefined' && typeof (selectedSizeId) !== 'undefined';

  const { data: allCategories, isLoading: isAllCategoriesLoading } = api.useGetCategoriesQuery(undefined);

  // const categoryParents = product?.categories?.length > 0 && findCategoryAndParents(product?.categories?.[0]);

  return (
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
              <span style={{ fontWeight: 500 }}> {product?.categories?.[0]?.category_name}</span>
            </Breadcrumbs>
            <Title>{product?.product_name}</Title>
            <RevieStartWrapper>
              <div
                style={{ display: "flex", gap: ".4rem", marginRight: ".8rem" }}
              >
                <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
                <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
                <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
                <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
                <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
              </div>
              <DetailCount>402 ნახვა</DetailCount>
            </RevieStartWrapper>
            <PriceWrapperStyle>
              <Price>{finalPrice}</Price>
              {hasDiscount ? (
                <OldPrice>{originalPrice}</OldPrice>
              ) : null}
            </PriceWrapperStyle>

            {colors && !!colors.length && (
              <>
                <Label>აირჩიე ფერი: </Label>
                <ColorSelector
                  colors={colors}
                  defaultSelected={colors[0]?.id}
                  gap={"20px"}
                  onColorSelected={(event: any) => _colorSelected(event)}
                />

              </>
            )}
            <SelectSizeWrapper>
              {sizes && !!sizes.length && (
                <>
                  <SelectSizeLabel>აირჩიე ზომა: </SelectSizeLabel>
                  <SizeSelector
                    sizes={sizes}
                    onSelectedChange={(event: any) => _sizeSelected(event)}
                  />
                </>
              )}
            </SelectSizeWrapper>
            <ButtonWrapper>
              <Button onClick={_showFeedback} style={{
                ...(!canAddToCart ? { filter: 'grayscale(1)' } : {}),
              }} disabled={!canAddToCart}>
                {/* <BsFillCartPlusFill size={'3.0rem'} style={{ marginRight: '2.4rem' }} /> */}
                <BagIconStyle />
                კალათაში დამატება
              </Button>
              <AddCartButton secondary>
                <BsBookmarkPlusFillStyle />
              </AddCartButton>
            </ButtonWrapper>
            <Subtitle>
              დამატებითი ინფორმაცია
            </Subtitle>
            {product?.description && <Text>{ReactHtmlParser(product?.description)}</Text>}
            <Text>შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის. შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის</Text>
          </DetailsWrapper>
        </DetailMainWrapper>
      </Section>


      <SectionTitle>
        რეკომენდირებული
      </SectionTitle>
      <Grid>
        <Item
          name="საზაფხულო ფეხსაცმელი"
          price="80.00"
          oldPrice="125.00"
          currency="gel"
          imageUrl={"/assets/2.png"}
        ></Item>
        <Item
          name="საზაფხულო ფეხსაცმელი"
          price="80.00"
          oldPrice="125.00"
          currency="gel"
          imageUrl={"/assets/5.png"}
        ></Item>
        <Item
          name="საზაფხულო ფეხსაცმელი"
          price="80.00"
          oldPrice="125.00"
          currency="gel"
          imageUrl={"/assets/4.png"}
        ></Item>
        <Item
          name="საზაფხულო ფეხსაცმელი"
          price="80.00"
          oldPrice="125.00"
          currency="gel"
          imageUrl={"/assets/6.png"}
        ></Item>
        <Item
          name="საზაფხულო ფეხსაცმელი"
          price="80.00"
          oldPrice="125.00"
          currency="gel"
          imageUrl={"/assets/2.png"}
        ></Item>
        <Item
          name="საზაფხულო ფეხსაცმელი"
          price="80.00"
          oldPrice="125.00"
          currency="gel"
          imageUrl={"/assets/5.png"}
        ></Item>
      </Grid>
    </>
  );
};

export default ProductDetails;
