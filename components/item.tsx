import classNames from "classnames";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import Link from "next/link";
import Responsive from "../config/Responsive";
import Fonts from "../styles/Fonts";

type Props = {
  id?: number;
  imageUrl: string;
  price: string;
  oldPrice?: string;
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
  font-family: ${Fonts.FiraGOBold};
  color: var(--text-color);
  opacity: 0.5;
  text-transform: uppercase;
  font-feature-settings: "case" on;
  font-weight: bold;
    ${Responsive.mobile}{
      font-size: 11px;
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
`;
const ProductTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 20px 0px;
    ${Responsive.mobile} {
      margin: 14px 0px;
    }
`;

const CurrencyMap: any = {
  gel: "₾",
  usd: "$",
};

const getCcySymbol = (ccy: string): string => {
  return ccy && CurrencyMap[ccy] ? CurrencyMap[ccy] : ccy;
};

const SaleItem = ({
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
      <Link href={`/detail/${id}`}>
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
              {oldPrice === '' ? null : (
                <>
                  {oldPrice} {CurrencyMap[currency]}
                </>
              )}

            </Price>
          </ProductTextWrapper>
          <Title>{name}</Title>
        </Wrapper>
      </Link>
    </>
  );
};

export default SaleItem;
