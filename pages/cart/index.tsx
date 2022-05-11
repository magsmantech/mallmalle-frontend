import type { NextPage } from "next";
import styled from "styled-components";
import Item from "../../components/cartItem";
import Quantity from "../../components/quantity";

import { CgClose } from "react-icons/cg";
import OrderDetails from "../../components/OrderDetails";
import { Breadcrumbs } from "../../components/styled/breadcrumbs";

import CloseIcon from "../../public/icons/react-icons/close";
import { getBag } from "../../services/checkout-services";
import { useEffect, useState } from "react";
import { calculateProductPrices, Cart, CartItem } from "../../domain/shop";
import api from "../../features/api";

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

  font-size: 44px;
  margin-bottom: 20px;
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

const CartScreen: NextPage = () => {

  // const [items, setItems] = useState<CartItem[]>([]);
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
  //   getBag()
  //     .then(({ data }: { data: Cart }) => {
  //       console.log(data);
  //       // res.summary = 37 (total price)
  //       setCartTotal(data.summary);
  //       setItems(data.items);
        
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // }, []);
  
  const { data: cart, isLoading: isCartLoading, refetch: refetchCart } = api.useGetCartQuery(undefined);

  const [updateQuantity, { isLoading: isUpdateQuantityLoading }] = api.useUpdateQuantityMutation();

  const [removeFromCart, { isLoading: isRemoveFromCartLoading }] = api.useRemoveFromCartMutation();

  const { data: addresses, isLoading: isAddressesLoading, refetch: refetchAddresses } = api.useGetAddressesQuery(undefined);

  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(undefined);
  // TODO allow changing selected address on the right side, OrderDetails
  useEffect(() => {
    if(addresses && addresses?.length > 0){
      setSelectedAddressId(addresses?.[0].id);
    }
  }, [addresses]);

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
          {cart?.items?.map((item, i) => {
            const { product } = item;
            const { hasDiscount, originalPrice, finalPrice, selectedVariation } = calculateProductPrices(item.product, item.variation_id);
            console.log('cart item prices:', { hasDiscount, originalPrice, finalPrice, item });
            return (
            <FlexRow key={i} style={{ marginBottom: "5.0rem" }}>
              <Item
                item={item}
                style={{ marginRight: "6.5rem" }}
              />
              <QuantityWrapper>
                <Quantity value={item.quantity} onChange={async (newQuantity) => {
                  const result = await updateQuantity({
                    cartItemId: item.id,
                    quantity: newQuantity,
                  });
                  console.log('updateQuantity result:', result);
                  await refetchCart();
                }} />
              </QuantityWrapper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Price>{'$' + finalPrice}</Price>
                  {hasDiscount && (
                    <OldPrice>${originalPrice}</OldPrice>
                  )}
                </div>
                <CloseIcon
                  width="1.4rem"
                  height={"1.4rem"}
                  style={{
                    opacity: 0.4,
                    marginRight: "3.2rem",
                    cursor: "pointer",
                  }}
                  onClick={async () => {
                    const result = await removeFromCart({
                      cartItemId: item.id,
                      // variationId: item.variation_id,
                    });
                    await refetchCart();
                    console.log('removeFromCart result:', result);
                  }}
                />
              </div>
            </FlexRow>
           );
          })}
        </Grid>
        <OrderDetails cart={cart} selectedAddressId={selectedAddressId}></OrderDetails>
      </Container>
    </>
  );
};

export default CartScreen;
