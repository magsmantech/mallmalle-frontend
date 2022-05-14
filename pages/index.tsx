import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Carousel from "../components/carousel";
import SaleItem from "../components/saleItem";
import Item from "../components/item";
import ArrowTop from "../public/icons/react-icons/arrow-top";
import { getDashboardData } from "../services/dashboard-services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import config from "../config.json";
import { Product } from "../domain/shop";
import styled from 'styled-components';
import Responsive from "../config/Responsive";


const Home: NextPage = () => {
  const _scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const [offers, setOffers] = useState<any>(null);
  const [newProducts, setNewProducts] = useState<any>(null);
  const [discounts, setDiscounts] = useState<any>(null);

  useEffect(() => {
    getDashboardData()
      .then((res) => {
        const { data } = res;
        setOffers(data.data.offers);
        setNewProducts(data.data.newAdded);
        setDiscounts(data.data.discounts);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const images = [
    "/assets/cover.png",
    "/assets/cover.png",
    "/assets/cover.png",
    "/assets/cover.png",
  ];

  return (
    <>
      <Carousel images={images} />
      <SaleItemWrapper className={styles.container}>
        <OneSaleItemWrapper>
          <SaleItem imageUrl={"/assets/122.png"} big />
        </OneSaleItemWrapper>
        <FourSaleItemWrapper>
          <SaleItem imageUrl={"/assets/3.png"} />
          <SaleItem imageUrl={"/assets/31.png"} />
          <SaleItem imageUrl={"/assets/311.png"} />
          <SaleItem imageUrl={"/assets/photo-1.jpg"} />
        </FourSaleItemWrapper>
      </SaleItemWrapper>
      <div className={styles.dividerWrapper}>
        <div className={styles.divider}></div>
        <img className={styles.dividerImage} src={"/assets/mallmalle.png"} />
      </div>

      <h3 className={styles.sectionTitle}>შემოთავაზება</h3>

      <div className={styles.itemsContainer}>
        {offers?.length ? (
          offers.map((product: Product, index: number) => (
            <Item
              name={product.product_name}
              id={product.id}
              price="85,99"
              oldPrice={
                product.discount ? "-" + product.discount[0].value + "%" : ""
              }
              currency="gel"
              imageUrl={
                product?.images?.length
                  ? config.imagesEndpoint + JSON.parse(product?.images)[0]
                  : "/assets/2.png"
              }
            ></Item>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className={styles.middleContainer}>
        <SaleItem big imageUrl={"/assets/122.png"} gradient />
        <SaleItem big imageUrl={"/assets/122.png"} gradient />
      </div>

      <h3 className={styles.sectionTitle}>ახალი დამატებული</h3>
      <div
        className={styles.itemsContainer}
        style={{ marginBottom: "17.5rem" }}
      >
        {newProducts?.length ? (
          newProducts.map((product: Product, index: number) => (
            <Item
              name={product.product_name}
              price="85,99"
              id={product.id}
              oldPrice={
                product.discount?.length
                  ? "-" + product.discount[0].value + "%"
                  : ""
              }
              currency="gel"
              imageUrl={
                product?.images?.length
                  ? config.imagesEndpoint + JSON.parse(product?.images)[0]
                  : "/assets/2.png"
              }
            ></Item>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className={styles.scrollToTopButton} onClick={_scrollToTop}>
        <ArrowTop className={styles.scrollButtonIcon} />
      </div>
    </>
  );
};


const SaleItemWrapper = styled.div`
  height: 100vh;
  max-height: 580px;
  margin-bottom: 120px;
  display: flex;
  justify-content: space-between;
    ${Responsive.tablet}{
      max-height: 450px;
      margin-bottom: 80px;
    }
    ${Responsive.tabletMobile}{
      flex-direction: column-reverse;
      width: 100%;
      max-height: unset;
      height: fit-content;
      margin-bottom: 50px;
    }
`;
const FourSaleItemWrapper = styled.div`
  width: calc(50% - 15px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
    ${Responsive.tabletMobile}{
      width: 100%;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
    }
`;
const OneSaleItemWrapper = styled.div`
  width: calc(50% - 15px);
    ${Responsive.tabletMobile}{
      width: 100%;
      margin-top: 20px;
    }
`;



export default Home;
