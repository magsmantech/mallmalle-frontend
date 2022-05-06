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

type ButtonProps = {
  secondary?: boolean;
};
const Section = styled.section`
  display: flex;
  justify-content: stretch;
  width: 100%;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4.4rem;
  align-items: stretch;
  width: 100%;
`;

const Title = styled.h1`
  color: var(--text-color);
  font-size: 4.4rem;
  font-family: fira-go;
`;

const Price = styled(Title)`
  &::before {
    content: "$";
  }
`;

const OldPrice = styled(Price)`
  font-size: 2.4rem;
  opacity: 0.4;
  text-decoration: line-through;
`;

const Label = styled.span`
  color: var(--text-color);
  font-size: 1.6rem;
  font-family: "helvetica";
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 8rem;
  grid-gap: 1rem;
  width: 100%;
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
  font-size: 1.8rem;
  font-family: "helvetica";
`;

const Text = styled.span`
  color: var(--text-color);
  font-size: 1.8rem;
  font-family: "helvetica";
`;

const SectionTitle = styled.div`
  color: var(--text-color);
  font-family: "BPG WEB 002 CAPS";
  /* text-transform: uppercase;
  font-feature-settings: "case" on; */

  font-size: 2.4rem;
`;

const Grid = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 3.2rem;
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
      if(product && variation){
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

  const canAddToCart = typeof(selectedColorId) !== 'undefined' && typeof(selectedSizeId) !== 'undefined';

  return (
    <>
      <Section style={{ marginBottom: "13.0rem" }}>
        <ItemPreview images={images} />
        <DetailsWrapper>
          <Breadcrumbs
            style={{
              opacity: 0.5,
              fontWeight: 700,
              marginBottom: "0.8rem",
              textTransform: "uppercase",
              fontFeatureSettings: '"case" on',
            }}
          >{cart?.summary}a
            {'ფეხსაცმელი'} /
            <span style={{ fontWeight: 500 }}> {'მწვანე ფეხსაცმელი'}</span>
          </Breadcrumbs>
          <Title style={{ marginBottom: "1.6rem" }}>{product?.product_name}</Title>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "2.4rem",
            }}
          >
            <div
              style={{ display: "flex", gap: ".4rem", marginRight: ".8rem" }}
            >
              <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
              <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
              <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
              <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
              <BsStarFill size={"1.8rem"} color={"#22D5AE"} />
            </div>
            <Count>402 ნახვა</Count>
          </div>
          <div style={{ marginBottom: "3.5rem", display: "flex" }}>
            <Price style={{ marginRight: "1.6rem" }}>{finalPrice}</Price>
            {hasDiscount ? (
              <OldPrice>{originalPrice}</OldPrice>
            ): null}
          </div>

          {colors && !!colors.length && (
            <>
              <ColorSelector
                colors={colors}
                style={{ marginBottom: "3.2rem" }}
                defaultSelected={colors[0]?.id}
                gap={"2.1rem"}
                onColorSelected={(event: any) => _colorSelected(event)}
              />
              <Label style={{ marginBottom: "2.4rem" }}>აირჩიე ფერი: </Label>
            </>
          )}
          {sizes && !!sizes.length && (
            <>
              <SizeSelector
                style={{ marginBottom: "4.4rem" }}
                sizes={sizes}
                onSelectedChange={(event: any) => _sizeSelected(event)}
              />
            </>
          )}
          <ButtonWrapper style={{ marginBottom: "4.2rem" }}>
            <Button onClick={_showFeedback} style={{
              ...(!canAddToCart ? { filter: 'grayscale(1)' } : {}),
            }} disabled={!canAddToCart}>
              {/* <BsFillCartPlusFill size={'3.0rem'} style={{ marginRight: '2.4rem' }} /> */}
              <BagIcon
                height={"3.0rem"}
                width={"3.0rem"}
                style={{ marginRight: "2.4rem" }}
              />
              კალათაში დამატება
            </Button>
            <Button secondary>
              <BsBookmarkPlusFill size={"3.0rem"} />
            </Button>
          </ButtonWrapper>
          <Subtitle style={{ marginBottom: "1.8rem" }}>
            დამატებითი ინფორმაცია
          </Subtitle>
          {product?.description && <Text>{ReactHtmlParser(product?.description)}</Text>}
          {/* <Text>შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის. შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის</Text> */}
        </DetailsWrapper>
      </Section>
      <SectionTitle style={{ marginBottom: "5.0rem" }}>
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
