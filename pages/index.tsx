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
import { Product, DashboardData } from '../domain/shop';
import styled from 'styled-components';
import Responsive from "../config/Responsive";
import RadioButton from "../components/customStyle/RadioButton";
import DropDown from "../components/customStyle/DropDown";
import SidebarFilter from "../components/customStyle/SidebarFilter";
import SearchBar from "../components/search-bar";
import api, { uploadUrl } from "../features/api";
import Loader from '../components/Loader';
import DiscountItem from "../components/DiscountItem";
import Fonts from "../styles/Fonts";


const Home: NextPage = () => {
  const _scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const { data: DashboardData, isLoading: isDashboardDataLoading, refetch: refetchDashboardData } = api.useGetDashboardDataQuery(undefined);

  const [offers, setOffers] = useState<any>(null);
  const [newProducts, setNewProducts] = useState<any>(null);
  const [discounts, setDiscounts] = useState<any>(null);





  // useEffect(() => {
  //   getDashboardData()
  //     .then((res) => {
  //       const { data } = res;
  //       setOffers(data.data.offers);
  //       setNewProducts(data.data.newAdded);
  //       setDiscounts(data.data.discounts);
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // carousel images
  const images = [
    "/assets/cover.png",
    "/assets/cover.png",
    "/assets/cover.png",
    "/assets/cover.png",
  ];


  return isDashboardDataLoading ? <Loader /> : !DashboardData ? (<span>not found dashboard data</span>) : (
    <>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
      <Carousel images={images} />
      <SaleItemWrapper className={styles.container}>
        <OneSaleItemWrapper>
          {DashboardData.data.discounts.slice(0, 1).map((d, index) => (
            <SaleItem key={index} id={d.id} imageUrl={uploadUrl(d.background_image)} big />
          ))}
        </OneSaleItemWrapper>
        <FourSaleItemWrapper>
          {DashboardData.data.discounts.slice(1, 5).map((d, index) => (
            <SaleItem id={d.id} key={index} imageUrl={uploadUrl(d.background_image)} />
          ))}
        </FourSaleItemWrapper>
      </SaleItemWrapper>

      <DividerWrapperStyle>
        <div className={styles.divider}></div>
        {/* <DividerImageStyle src={"/assets/mallmalle.png"} /> */}
        <DividerImageStyle src={"/assets/mallmalle2.png"} />
      </DividerWrapperStyle>

      <SectionTitle className={styles.sectionTitle}>შემოთავაზება</SectionTitle>

      {/* offers */}
      <DiscountItemContainerStyle>
        {DashboardData.data.offers.map((o, index) => {
          return (
            <DiscountItem
              key={index}
              name={o.product_name}
              id={o.id}
              price={o.lowest_price}
              oldPrice={''}
              currency="gel"
              imageUrl={uploadUrl(o.decoded_images[0])}
            />
          )
        })}
      </DiscountItemContainerStyle>
      {/* offers */}

      <MiddleContainer className={styles.middleContainer}>
        {DashboardData.data.discounts.slice(5, 7).map((d, index) => (
          <SaleItem id={d.id} big key={index} imageUrl={uploadUrl(d.background_image)} gradient />
        ))}
      </MiddleContainer>

      <SectionTitle className={styles.sectionTitle}>ახალი დამატებული</SectionTitle>

      {/* new products */}
      <ItemsContainerStyle>
        {DashboardData.data.newAdded.slice(0, 12).map((n, index) => {
          return (
            <Item
              key={index}
              name={n.product_name}
              id={n.id}
              price={n.lowest_price}
              oldPrice={``}
              currency="gel"
              imageUrl={uploadUrl(n.decoded_images[0])}
            />
          )
        })}
      </ItemsContainerStyle>
      {/* new products */}


      <div className={styles.scrollToTopButton} onClick={_scrollToTop}>
        <ArrowTop className={styles.scrollButtonIcon} />
      </div>
    </>
  );
};


const DividerImageStyle = styled.img`
  z-index: 1;
  width: 290px;
    ${Responsive.mobile} {
      width: 158px;
    }
`;
const DividerWrapperStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  margin-bottom: 70px;
    ${Responsive.mobile}{
      margin-bottom: 50px;
    }
`;


const SearchWrapper = styled.div`
      div {
        border-color: #DBDBDB;
          svg {
            g {
              stroke: #DBDBDB;
            }
          }
      }
      input{
        color: #DBDBDB;
          &::placeholder  {
            color: #DBDBDB;
          }
      }
      display: none;
        ${Responsive.mobile}{
          display: block;
          margin-bottom: 30px;
        }
`;
const ItemsContainerStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-row-gap: 50px;
  grid-column-gap: 30px;
  /* background-color: red; */
    ${Responsive.mobile}{
      grid-column-gap: 10px;
      grid-template-columns: repeat(2, 1fr);
      grid-row-gap: 30px;
    }
`;

const DiscountItemContainerStyle = styled(ItemsContainerStyle)`
  margin-bottom: 100px;
    ${Responsive.laptop} {
      margin-bottom: 80px;
    }
    ${Responsive.tabletMobile}{
      margin-bottom: 50px;
    }
`;
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
const SectionTitle = styled.h3`
  font-size: 32px;
  margin: 0 0 60px 0;
  color: var(--text-color);
  font-weight: 600;
  text-transform: uppercase;
  font-feature-settings: "case" on;
  font-family: ${Fonts.FiraGOSemiBold};
`;
const MiddleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 310px;
  grid-gap: 30px;
  margin-bottom: 110px;
    ${Responsive.tabletMobile}{
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      height: fit-content;
      grid-gap: 20px;
    }
    ${Responsive.mobile}{
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      height: fit-content;
      grid-gap: 20px;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
            &:nth-child(3){
              right: unset !important;
              top: unset !important;
              transform: scale(0.45) !important;
              width: fit-content;
              bottom: unset !important;
            }
          }
    }
`;


export default Home;
