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
import Responsive from "../../config/Responsive";
import Loader from '../../components/Loader';
import { Alert, Snackbar } from "@mui/material";
import Link from "next/link";


const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
    ${Responsive.mobile}{

}
`;

const PriceWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
const HeaderItem = styled.div`
  display: flex;
  width: 100%;
  font-size: 18px;
  font-family: fira-go;
  font-weight: 500;
  color: var(--text-color);
  opacity: 0.5;
    &:first-child {
      flex-basis: 55%;
      /* background-color: gray; */
      ${Responsive.mobile}{
        flex-basis: 100%;
        font-size: 14px;
        }
    }
    &:nth-child(2){
      flex-basis: 21%;
      /* background-color: brown; */
        ${Responsive.mobile}{
          display: none;
        }
    }
    &:nth-child(3){
      flex-basis: 21%;
      padding-left: 10px;
      /* background-color: yellow; */
        ${Responsive.mobile}{
          display: none;
        }
    }
 
`;
const FlexRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
  /* background-color: green; */
    ${Responsive.mobile}{
      flex-direction: column;
      position: relative;
      margin-bottom: 35px;
    }
`;
const ItemWrapper = styled.div`
  /* background-color: gray; */
  flex-basis: 55%;
   
`;
const QuantityWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  /* background-color: brown; */
  flex-basis: 21%;
    ${Responsive.mobile}{
      margin-left: 88px;
      margin-bottom: 15px;
    }
`;
const PriceHorizontalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 21%;
  padding-left: 10px;
  margin-top: 4px;
  /* background-color: yellow; */
    ${Responsive.mobile}{
      margin-left: 88px;
      padding-left: 0px;
    }
`;





const BreadcrumbsStyle = styled(Breadcrumbs)`
  margin-bottom: 40px;
`;
export const SectionTitle = styled.div`
  color: var(--text-color);
  font-family: "BPG WEB 002 Caps";
  /* text-transform: uppercase;
  font-feature-settings: "case" on; */

  font-size: 44px;
  margin-bottom: 20px;
`;
export const MainTitle = styled.div`
  color: var(--text-color);
  font-family: "BPG WEB 002 Caps";
  /* text-transform: uppercase;
  font-feature-settings: "case" on; */

  font-size: 32px;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  display: flex;
  width: 100%;
  margin: 24px 0 30px 0;
    ${Responsive.mobile}{
      margin: 18px 0px 18px 0px;
    }

  border-bottom: 1px solid rgba(33, 114, 129, 0.3);
`;

const Price = styled.span`
  color: var(--text-color);
  font-size: 24px;
  font-family: fira-go;
  font-weight: 600;
`;

const OldPrice = styled(Price)`
  text-decoration: line-through;
  opacity: 0.3;
  margin-top: 9px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
    ${Responsive.tablet}{
      flex-direction: column;
    }
    ${Responsive.mobile}{
      flex-direction: column;
    }
`;
const Grid = styled.div`
  width: 100%;
  height: min-content;
  display: flex;
  flex-direction: column;
  flex-basis: 65%;
`;
const OrderDetailsWrapper = styled.div`
  flex-basis: 34%;
    ${Responsive.tablet}{
      flex-basis: 100%;
      width: 100%;
    }
    ${Responsive.mobile}{
      flex-basis: 100%;
      width: 100%;
    }
`;


const CloseIconStyle = styled(CloseIcon)`
  cursor: pointer;
  height: 24px;
  width: 24px;
  opacity: 0.4;
  padding: 5px;
    ${Responsive.mobile}{
      position: absolute;
      top: 0px;
      right: 0px;
    }
`;

const DetailLink = styled.a`
  cursor: pointer;
  text-decoration: none;
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

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackMsgStatus, setsnackMsgStatus] = useState<any>('' || 'warning'); // error | warning | info | success

  const { data: cart, isLoading: isCartLoading, refetch: refetchCart } = api.useGetCartQuery(undefined);
  const { data: profile, isLoading: isProfileLoading, refetch: refetchProfile } = api.useProfileQuery(undefined);

  const [updateQuantity, { isLoading: isUpdateQuantityLoading }] = api.useUpdateQuantityMutation();

  const [removeFromCart, { isLoading: isRemoveFromCartLoading }] = api.useRemoveFromCartMutation();

  const { data: addresses, isLoading: isAddressesLoading, refetch: refetchAddresses } = api.useGetAddressesQuery(undefined);

  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(undefined);
  // TODO allow changing selected address on the right side, OrderDetails
  useEffect(() => {
    if (addresses && addresses?.length > 0) {
      setSelectedAddressId(addresses?.[0].id);
    }
  }, [addresses]);


  return (
    <>
      <MainTitle>
        კალათა
      </MainTitle>
      <BreadcrumbsStyle >
        მთავარი / ჩემი პროფილი / ჩემი კალათა
      </BreadcrumbsStyle>
      <Container>
        <Grid>
          <FlexRow>
            <HeaderItem>
              პროდუქტი
            </HeaderItem>
            <HeaderItem>
              რაოდენობა
            </HeaderItem>
            <HeaderItem>ფასი</HeaderItem>
          </FlexRow>
          <Divider />
          {cart?.items?.map((item, i) => {
            const { product } = item;
            const { hasDiscount, originalPrice, finalPrice, selectedVariation } = calculateProductPrices(item.product, item.variation_id);
            console.log('cart item prices:', { hasDiscount, originalPrice, finalPrice, item });
            return (
              <FlexRowWrapper key={i}>
                <DetailLink href={`detail/${item.product_id}`}>
                  <ItemWrapper>
                    <Item item={item} />
                  </ItemWrapper>
                </DetailLink>
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
                <PriceHorizontalWrapper>
                  <PriceWrapperStyle>
                    <Price>{'₾ ' + finalPrice}</Price>
                    {hasDiscount && (
                      <OldPrice>₾ {originalPrice}</OldPrice>
                    )}
                  </PriceWrapperStyle>
                  <CloseIconStyle onClick={async () => {
                    const result = await removeFromCart({
                      cartItemId: item.id,
                      // variationId: item.variation_id,
                    });
                    await refetchCart();
                    setSnackMessage("პროდუქტი წარმატებით წაიშალა კალათიდან");
                    setOpenSnack(true);
                    setsnackMsgStatus('success');
                    console.log('removeFromCart result:', result);
                  }}
                  />
                </PriceHorizontalWrapper>
              </FlexRowWrapper>
            );
          })}
        </Grid>

        <OrderDetailsWrapper>
          <OrderDetails cart={cart} selectedAddressId={selectedAddressId}></OrderDetails>
        </OrderDetailsWrapper>
        <Snackbar
          open={openSnack}
          autoHideDuration={5000}
          onClose={() => setOpenSnack(false)}>
          <Alert severity={snackMsgStatus}>
            {snackMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default CartScreen;
