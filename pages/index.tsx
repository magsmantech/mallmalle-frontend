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
      <div className={styles.container}>
        <SaleItem imageUrl={"/assets/122.png"} style={{ gridArea: "a" }} big />
        <SaleItem imageUrl={"/assets/3.png"} style={{ gridArea: "b" }} />
        <SaleItem imageUrl={"/assets/31.png"} style={{ gridArea: "c" }} />
        <SaleItem imageUrl={"/assets/311.png"} style={{ gridArea: "d" }} />
        <SaleItem imageUrl={"/assets/photo-1.jpg"} style={{ gridArea: "e" }} />
      </div>
      <div className={styles.dividerWrapper}>
        <div className={styles.divider}></div>
        <img className={styles.dividerImage} src={"/assets/mallmalle.png"} />
      </div>

      <h3 className={styles.sectionTitle}>შემოთავაზება</h3>

      <div className={styles.itemsContainer}>
        {offers?.length ? (
          offers.map((product, index) => (
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
          newProducts.map((product, index) => (
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

export default Home;
