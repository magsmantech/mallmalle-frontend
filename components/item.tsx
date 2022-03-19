import classNames from "classnames";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import Link from "next/link";

type Props = {
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
  font-size: 1.8rem;
  font-family: "helvetica";
  color: var(--text-color);
  opacity: 0.5;
  text-transform: uppercase;
  font-feature-settings: "case" on;
  font-weight: bold;
`;

const Price = styled(Span)`
  font-size: ${(props: PriceProps) => (props.old ? "2.4rem" : "3.2rem")};
  text-decoration: ${(props: PriceProps) =>
    props.old ? "line-through" : "none"};
  color: var(--text-color);
  opacity: ${(props: PriceProps) => (props.old ? 0.5 : 1)};
  font-weight: bold;
  font-family: fira-go;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
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
      <Link href={"/detail/" + id}>
        <Wrapper>
          {/* <ItemImage backgroundImage={imageUrl}></ItemImage> */}
          <div className={styles.productItemImgWrapper}>
            <img src={imageUrl} className={styles.productItemImg} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              margin: "1.4rem 0",
            }}
          >
            <Price style={{ marginRight: "1.5rem" }} currency={currency}>
              {price} {CurrencyMap[currency]}
            </Price>
            <Price old currency={currency}>
              {oldPrice} {CurrencyMap[currency]}
            </Price>
          </div>
          <Title>{name}</Title>
        </Wrapper>
      </Link>
    </>
  );
};

export default SaleItem;
