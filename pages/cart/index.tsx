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
import { Cart, CartItem } from "../../domain/shop";
import api from "../../features/api";
import Responsive from "../../config/Responsive";
import Loader from '../../components/Loader';
import { Alert, Snackbar } from "@mui/material";
import Link from "next/link";

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
    ${Responsive.mobile}{
}
${Responsive.laptop}{
  height: 10px;
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
    ${Responsive.laptop}{
      font-size: 13px;
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
    ${Responsive.laptop}{
      margin-top: -15px;
    }
`;
const ItemWrapper = styled.div`
  /* background-color: gray; */
  flex-basis: 55%;
  ${Responsive.laptop}{
    margin-bottom: -10px;
  }
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
    ${Responsive.laptop}{
      flex-basis: 10%;
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
  display: flex;
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
  ${Responsive.laptop}{
    font-size: 24px;
    margin-bottom: 10px;
}
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
  ${Responsive.laptop}{
    font-size: 17px;
}
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
  flex-basis: 64%;
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
    ${Responsive.laptop}{
      flex-basis: 34%;
      width: 34%;
      margin-top: 45px;
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
    ${Responsive.laptop}{
      height: 20px;
      width: 20px;
  }
`;

const DetailLink = styled.a`
  cursor: pointer;
  text-decoration: none;
`;
const BreadcrumbLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: var(--text-color);
  &:hover{
    color: var(--text-color);
  }
  margin-right: 5px;
  margin-left: 5px;
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

  const {t, i18n} = useTranslation();

  // TODO allow changing selected address on the right side, OrderDetails
  useEffect(() => {
    if (addresses && addresses?.length > 0) {
      setSelectedAddressId(addresses?.[0].id);
    }
  }, [addresses]);



  return (
    <>
      <MainTitle>
      {t('cart')}
      </MainTitle>
      <BreadcrumbsStyle >
        <BreadcrumbLink href={`/`}>{t('main')}</BreadcrumbLink> / <BreadcrumbLink href={`/profile`}>{t('myProfile')} </BreadcrumbLink> / <BreadcrumbLink href={`/cart`}>{t('myCart')}</BreadcrumbLink>
      </BreadcrumbsStyle>
      <Container>
        <Grid>
          <FlexRow>
            <HeaderItem>
            {t('product')}
            </HeaderItem>
            <HeaderItem>
            {t('quantity')}
            </HeaderItem>
            <HeaderItem>{t('price')}</HeaderItem>
          </FlexRow>
          <Divider />
          {cart?.items?.map((item, i) => {
            const { product } = item;
            const variantID = item.variation_id;
            const filterWithVariant = item.product.variations?.filter(x => x.id === variantID);
            const price = parseFloat(filterWithVariant[0].price);
            const discount = product.discount.length >= 1 ? price * product.discount[0]?.value / 100 : null;
            const productDiscount = discount ? price - discount : price;


            // mainPrice * product.discount[0]?.value / 100
            console.log(productDiscount)

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
                    // console.log('updateQuantity result:', result);
                    await refetchCart();
                  }} />
                </QuantityWrapper>
                <PriceHorizontalWrapper>
                  <PriceWrapperStyle>

                    {product.discount.length >= 1 ? (
                      <Price>{'₾ ' + productDiscount}</Price>
                    ) : (
                      <Price>{'₾ ' + price}</Price>
                    )}

                    {product.discount.length >= 1 ? (
                      <OldPrice>₾ {price}</OldPrice>
                    ) : null}

                  </PriceWrapperStyle>
                  <CloseIconStyle onClick={async () => {
                    const result = await removeFromCart({
                      cartItemId: item.id,
                      // variationId: item.variation_id,
                    });
                    await refetchCart();
                    {i18next.language == 'ge' ?
                    setSnackMessage("Product successfully removed from the basket")
                    :
                    setSnackMessage("პროდუქტი წარმატებით წაიშალა კალათიდან")
                    }
                    setOpenSnack(true);
                    setsnackMsgStatus('success');
                    // console.log('removeFromCart result:', result);
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
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
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
