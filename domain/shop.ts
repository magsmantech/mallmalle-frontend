
export type Product = {
  "id": number;// 1
  "product_name": string;// "ქალის მოსაცმელი";
  "created_at": Date;// "2021-09-23T07: 02: 00.000000Z";
  "description": string | null;
  "images": string | null;// JSON string: '["1.jpg","2.jpg"]'
  "variations":  ProductVariation[];
  "discount": Discount[]
}
export type Discount = {
  "id": number;// 4
  "is_active": 1 | 0;// 1
  "name": string;// "ფასდაკლება 20%";
  "value": number;// 10
  "backgorund_image": string;// "discounts\/March2022\/9wS4Qsr9kTWivOi0OZjs.png";
  "created_at": Date;// "2022-03-08T15: 54: 26.000000Z";
  "updated_at": Date;// "2022-03-08T15: 54: 26.000000Z";
  "pivot": {
    "product_id": number;// 1
    "discount_id": number// 4
  }
};
export type SizeVariation = {
  "id": 1;
  "size_name": string;// "XL"
};
export type ColorVariation = {
  "id": 1;
  "color_name": string;// "წითელი";
  "color": string;// "#ff0000"
};
export type ProductVariation = {
  "id": number;// 3
  "product_id": number;// 1
  "title": string;// "ტანის სამოსი XL";
  "price": string;// "1";
  "image": string;// "product-variations\/March2022\/NoFhETlt3HhYNfqKehv6.webp";
  "quantity": number;// 5
  "product_sku": string | null;
  "size_variation": SizeVariation;
  "color_variation": ColorVariation;
};

export const calculateProductPrices = (product: Product | null, sizeIndex = 0) => {
  const originalPrice = product?.variations[sizeIndex]?.price;
  const finalPrice = product 
  ? (
    product?.discount.length > 0
      ? originalPrice
      : originalPrice
    )
  : null;
  return {
    hasDiscount: finalPrice != originalPrice,
    originalPrice,
    finalPrice,
  };
}