import type { NextPage } from "next";
import styled from "styled-components";
import Item from "../../components/cartItem";
import Quantity from "../../components/quantity";

import { CgClose } from "react-icons/cg";
import OrderDetails from "../../components/OrderDetails";
import { Breadcrumbs } from "../../components/styled/breadcrumbs";

import CloseIcon from "../../public/icons/react-icons/close";
import { getBag } from "../../services/category-services";
import { useEffect } from "react";

const Grid = styled.div`
  /* display: grid; */
  /* row-gap: 5.0rem; */
  /* grid-template-columns: repeat(3, 1fr); */
  width: 100%;
  margin-right: 1.5rem;
  height: min-content;
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: stretch;
`;

export const SectionTitle = styled.div`
  color: var(--text-color);
  font-family: "BPG WEB 002 Caps";
  /* text-transform: uppercase;
  font-feature-settings: "case" on; */

  font-size: 4.4rem;
`;

const HeaderItem = styled.div`
  display: flex;
  width: 100%;
  /* align-self:  */
  font-size: 1.8rem;
  font-family: fira-go;
  font-weight: 500;
  color: var(--text-color);
  opacity: 0.5;
  /* border-bottom: .1rem solid rgba(33, 114, 129, 0.3); */
  /* padding-bottom: 2.4rem; */
`;
const Divider = styled.div`
  display: flex;
  width: 100%;
  margin: 2.4rem 0 3rem 0;

  border-bottom: 0.1rem solid rgba(33, 114, 129, 0.3);
`;

const Price = styled.span`
  color: var(--text-color);
  font-size: 2.4rem;
  font-family: fira-go;
  font-weight: 600;
`;

const OldPrice = styled(Price)`
  text-decoration: line-through;
  opacity: 0.3;
  margin-top: 0.3rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: stretch;
  width: 100%;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 34.7rem;
`;

const Home: NextPage = () => {
  useEffect(() => {
    getBag()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const items = [
    {
      name: "Reima Overalls",
      size: "XL",
      color: "ლურჯი",
    },
    {
      name: "Reima Overalls",
      size: "XL",
      color: "ლურჯი",
    },
    {
      name: "Reima Overalls",
      size: "XL",
      color: "ლურჯი",
    },
  ];

  return (
    <>
      <SectionTitle style={{ marginBottom: "1.7rem", fontSize: "3.2rem" }}>
        კალათა
      </SectionTitle>
      <Breadcrumbs style={{ marginBottom: "3.2rem" }}>
        მთავარი / ჩემი პროფილი / ჩემი კალათა
      </Breadcrumbs>
      <Container>
        <Grid>
          <FlexRow>
            <HeaderItem style={{ marginRight: "6.5rem", maxWidth: "40.0rem" }}>
              პროდუქტი
            </HeaderItem>
            <HeaderItem style={{ marginRight: "0rem", maxWidth: "34.7rem" }}>
              რაოდენობა
            </HeaderItem>
            <HeaderItem style={{ width: "auto" }}>ფასი</HeaderItem>
          </FlexRow>
          <Divider />
          {items.map((item, i) => (
            <FlexRow key={i} style={{ marginBottom: "5.0rem" }}>
              <Item
                name={item.name}
                size={item.size}
                color={item.color}
                style={{ marginRight: "6.5rem" }}
              />
              <QuantityWrapper>
                <Quantity />
              </QuantityWrapper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Price>$79.90</Price>
                  <OldPrice>$123.90</OldPrice>
                </div>
                <CloseIcon
                  width="1.4rem"
                  height={"1.4rem"}
                  style={{
                    opacity: 0.4,
                    marginRight: "3.2rem",
                    cursor: "pointer",
                  }}
                />
              </div>
            </FlexRow>
          ))}
        </Grid>
        <OrderDetails></OrderDetails>
      </Container>
    </>
  );
};

export default Home;
