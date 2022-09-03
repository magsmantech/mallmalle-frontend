import classNames from "classnames";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import Link from "next/link";
import Responsive from "../config/Responsive";

type Props = {
  id?: number;
  imageUrl: string;
  price: string | number;
  oldPrice?: string | number | null;
  name: string;
  currency?: string;
  style?: { [p: string]: string | number };
};

type PriceProps = {
  old?: boolean;
  currency?: string;
};

const Span = styled.span`
  /* font-family: 'BPG WEB 002 Caps'; */
  /* font-weight: bold; */
`;

const Title = styled(Span)`
  font-size: 18px;
  font-family: "helvetica";
  color: var(--text-color);
  opacity: 0.5;
  text-transform: uppercase;
  font-feature-settings: "case" on;
  font-weight: bold;
    ${Responsive.mobile}{
      font-size: 11px;
    }
    ${Responsive.laptop}{
      font-size: 14px;
    }
`;

const Price = styled(Span)`
  font-size: ${(props: PriceProps) => (props.old ? "24px" : "32px")};
  margin-right: ${(props: PriceProps) => (props.old ? "0" : "25px")};
  margin-top: ${(props: PriceProps) => (props.old ? "5px" : "0px")};
  text-decoration: ${(props: PriceProps) =>
    props.old ? "line-through" : "none"};
  color: var(--text-color);
  opacity: ${(props: PriceProps) => (props.old ? 0.5 : 1)};
  font-weight: bold;
  font-family: fira-go;
    ${Responsive.mobile} {
      font-size: ${(props: PriceProps) => (props.old ? "14px" : "18px")};
      margin-right: ${(props: PriceProps) => (props.old ? "0" : "15px")};
      margin-top: ${(props: PriceProps) => (props.old ? "2px" : "0px")};
    }
    ${Responsive.laptop} {
      font-size: ${(props: PriceProps) => (props.old ? "18px" : "22px")};
      margin-right: ${(props: PriceProps) => (props.old ? "0" : "15px")};
      margin-top: ${(props: PriceProps) => (props.old ? "-2px" : "0px")};
    }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ProductItemImgWrapper = styled.div`
  border-radius: 14px;
  height: 330px;
    ${Responsive.mobile}{
      height: 185px;
    }
    ${Responsive.laptop}{
      height: 220px;
      width: 200px;
    }
`;
const ProductTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 20px 0px;
    ${Responsive.mobile} {
      margin: 14px 0px;
    }
    ${Responsive.laptop} {
      margin: 5px 0px;
    }
`;

const CurrencyMap: any = {
  gel: "₾",
  usd: "$",
};

const getCcySymbol = (ccy: string): string => {
  return ccy && CurrencyMap[ccy] ? CurrencyMap[ccy] : ccy;
};

const DiscountItem = ({
  imageUrl,
  id,
  style,
  price,
  oldPrice,
  name,
  currency = "gel",
}: Props) => {
  const wrapperClasses = classNames({
    [styles.itemImage]: true,
  });

  return (
    <>
      <Link href={"/discount/" + id}>
        <Wrapper>
          {/* <ItemImage backgroundImage={imageUrl}></ItemImage> */}
          <ProductItemImgWrapper className={styles.productItemImgWrapper}>
            <img src={imageUrl} className={styles.productItemImg} />
          </ProductItemImgWrapper>
          <ProductTextWrapper>
            <Price currency={currency}>
              {price} {CurrencyMap[currency]}
            </Price>
            <Price old currency={currency}>
              {oldPrice} {CurrencyMap[currency]}
            </Price>
          </ProductTextWrapper>
          <Title>{name}</Title>
        </Wrapper>
      </Link>
    </>
  );
};

export default DiscountItem;
