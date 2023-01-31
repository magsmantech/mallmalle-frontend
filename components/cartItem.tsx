import styled from "styled-components";
import Responsive from "../config/Responsive";
import { CartItem } from "../domain/shop";
import { uploadUrl } from "../features/api";

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


const Item = ({ item, style }: { item: CartItem } & { style?: any }) => {
  const { product, product_id, variation_id, quantity, total } = item;
  // const {
  //   selectedVariation,
  //   selectedSize,
  //   selectedColor,
  // } = calculateProductPrices(item.product, variation_id);

  var imgUrl = item.product.decoded_images;
  // console.log("first " + imgUrl);

  // console.log(variation_id)

  const productItem = product?.variations.filter(x => x.id === variation_id)
  
  const {t, i18n} = useTranslation();


  // console.log(productItem)

  return (
    <ItemWrapper style={{ ...style }}>
      <ItemImg src={uploadUrl(imgUrl[0])} />
      <ItemTextWrapper>
        {i18next.language == "ge" ?
        <ItemName>{product.product_name} {productItem[0].id}</ItemName>
        :
        <ItemName>{product.product_name_en} {productItem[0].id}</ItemName>
        }
        <div><ItemLabel>{t('size')}:</ItemLabel> <ItemValue>{productItem[0].size_variation.size_name}</ItemValue></div>
        {i18next.language == "ge" ?
        <div><ItemLabel>{t('color')}:</ItemLabel> <ItemValue>{productItem[0].color_variation.color_name}</ItemValue></div>
        :
        <div><ItemLabel>{t('color')}:</ItemLabel> <ItemValue>{productItem[0].color_variation.color_name_en}</ItemValue></div>
        }
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
  ${Responsive.laptop}{
    font-size: 16px;
    margin-bottom: -3px;
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
  ${Responsive.laptop}{
    font-size: 13px;
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
  ${Responsive.laptop}{
    font-size: 13px;
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
  ${Responsive.laptop}{
    height: 78px;
    width: 78px;
    min-width: 78px;
    margin-right: 15px;
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

export default Item;
