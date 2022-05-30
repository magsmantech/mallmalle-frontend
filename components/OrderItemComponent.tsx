import styled from "styled-components";
import Responsive from "../config/Responsive";
import { OrderItems } from "../domain/shop";
import api from "../features/api";
import Loader from "./Loader";



const OrderItemComponent: React.FC<{ productId: number; orderId: number; style?: any }> = ({ productId, orderId, style }) => {

  const { data: orderDetail, isLoading: isOrderDetailLoading, refetch: refetchOrderDetail, isSuccess: isOrderDetailSucces } = api.useGetOrderDetailsQuery(orderId);

  // console.log(JSON.stringify(orderDetail?.order_items))

  return isOrderDetailLoading ? <Loader /> : !orderDetail ? (<span>not found</span>) : (
    <ItemWrapper style={{ ...style }}>
      <ItemImg src={'/assets/default-image.png'} />
      <ItemTextWrapper>
        <ItemName>{productId} {orderId}</ItemName>
        {orderDetail.order_items.map((o, index) => {
          <div>{o.product.product_name} asdasas</div>
      })}
        <div><ItemLabel>ზომა:</ItemLabel> <ItemValue>zoma</ItemValue></div>
        <div><ItemLabel>ფერი:</ItemLabel> <ItemValue>feri</ItemValue></div>
      </ItemTextWrapper>
    
    </ItemWrapper>
  )
};




const ItemName = styled.span`
color: var(--text-color);
font-size: 24px;
line-height: 21px;
font-family: fira-go;
font-weight: 600;
margin-bottom: 15px;
  ${Responsive.mobile}{
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 10px;
    padding-right: 30px;
  }
`;

const ItemLabel = styled.span`
color: var(--text-color);
font-size: 18px;
font-family: 'helvetica';
opacity: 0.5;
font-weight: 500;
  ${Responsive.mobile}{
    font-size: 14px;
  }
`;

const ItemValue = styled.span`
color: var(--text-color);
font-size: 18px;
font-weight: 500;
font-family: fira-go ;
  ${Responsive.mobile}{
    font-size: 14px;
  }
`;

const ItemImg = styled.img`
height: 130px;
width: 130px;
border-radius: 14px;
object-fit: cover;
object-position: center;
margin-right: 20px;
min-width: 130px;
  ${Responsive.mobile}{
    height: 78px;
    width: 78px;
    min-width: 78px;
    margin-right: 10px;
  }
`;

const ItemTextWrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 5px;
  ${Responsive.mobile}{
    margin-top: 1px;
  }
`;

const ItemWrapper = styled.div`
display: flex;
width: 100%;

`;

export default OrderItemComponent;