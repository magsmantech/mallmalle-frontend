import styled from "styled-components";
import { calculateProductPrices, CartItem } from "../domain/shop";


const ItemName= styled.span`
color: var(--text-color);
font-size: 24px;
line-height: 21px;
font-family: fira-go;
font-weight: 600;
margin-bottom: 15px;
`;

const ItemLabel= styled.span`
color: var(--text-color);
font-size: 18px;
font-family: 'helvetica';
opacity: 0.5;
font-weight: 500;
`;

const ItemValue= styled.span`
color: var(--text-color);
font-size: 18px;
font-weight: 500;
font-family: fira-go ;
`;

const ItemImg = styled.img`
height: 130px;
width: 130px;
border-radius: 14px;
object-fit: cover;
object-position: center;
margin-right: 20px;
min-width: 130px;
`;

const ItemTextWrapper = styled.div`
display: flex;
flex-direction: column;
`;

const ItemWrapper = styled.div`
display: flex;
width: 100%;
max-width: 40.0rem;

`;


const Item = ({ item, style } : { item: CartItem } & { style?: any }) => {
    const { product, product_id, variation_id, quantity, total } = item;
    const {
      selectedVariation,
      selectedSize,
      selectedColor,
    } = calculateProductPrices(item.product, variation_id);
    return (
    <ItemWrapper style={{...style}}>
      <ItemImg src={'/assets/photo-3.jpg'}/>
      <ItemTextWrapper>
        <ItemName>{product.product_name}</ItemName>
        <div><ItemLabel>ზომა:</ItemLabel> <ItemValue>{selectedSize?.size_name}</ItemValue></div>
        <div><ItemLabel>ფერი:</ItemLabel> <ItemValue>{selectedColor?.color_name}</ItemValue></div>
      </ItemTextWrapper>
    </ItemWrapper>
    );
}

export default Item;
