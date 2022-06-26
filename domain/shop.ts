export type Page = {
  "id": number;// 1,
  "slug": string;// "contact",
  "title": string;// "კონტაქტი"
  "text": string;// "<p>კონტაქტის ტექსტი</p>\r\n<p>&nbsp;</p>",
  "created_at": string;// "2022-05-10T08:58:00.000000Z",
  "updated_at": string;// "2022-05-10T13:33:30.000000Z",
}

export const roundToCents = (amount: number | undefined) => {
  if (!amount) return 0;
  return Math.round(amount * 100) / 100;
}

// export const parse = (imgUrl: string) => {
//   const parse = JSON.parse(imgUrl);
//   return parse
// }

// const getProductImages = (product: Product) => {
//   try {
//     const images = JSON.parse(product.images);
//     console.log('product images:', images);
//     return "";
//   } catch (error) {
//     console.log('product images error:', error);
//     return null;
//   }
// }


type ProductWithImages = Product & {
  mainImage?: string;
  allImages: string[];
}


// export const getProductImages = (product: Product): ProductWithImages => {
//   if (!product.product_Data.images) {
//     return {
//       ...product,
//       mainImage: undefined,
//       allImages: [],
//     }
//   }

//   const allImages = JSON.parse(product.product_Data.images);
//   console.log('product images:', allImages);
//   const mainImage = allImages[0];
//   console.log('main image:', mainImage);
//   const productWithImages: ProductWithImages = {
//     ...product,
//     mainImage,
//     allImages,
//   };
//   console.log('productWithImages:', productWithImages);
//   return productWithImages;
// }










export type Category = {
  id: number;// 1
  category_name: string;// "ქალი"
  icon: string | null;// null
  childrens?: Category[] | null;
}
export type FilteredCategory = {
  categories: FilteredCategories[];
  size_variations: FilteredSizeVariations[];
  color_variations: FilteredColorVariations[];
}
export type FilteredCategories = {
  id: number;
  category_name: string;
  icon: string;
}
export type FilteredSizeVariations = {
  id: number;
  size_name: string;
}
export type FilteredColorVariations = {
  id: number;
  color_name: string;
  color: string;
}

export type Subscribe = {
  email: string;
}


export type CategoryWithParent = Category & {
  parent_id: number;
};

export type ProductData = {
  "id": number;// 1
  "product_name": string;// "ქალის მოსაცმელი";
  "created_at": Date;// "2021-09-23T07: 02: 00.000000Z";
  "description": string | null;
  "images": string | null;// JSON string: '["1.jpg","2.jpg"]'
  "variations": ProductVariation[];
  "discount": Discount[];
  "categories": Category[];
  "decoded_images": [] | string;
  "lowest_price": string;
  "highest_price": string;
}

export type Product = {
  "data": ProductData[];
  "current_page": number;
  "first_page_url": string;
  "from": number;
  "last_page": number;
  "last_page_url": string;
  "next_page_url": string;
  "path": string;
  "per_page": number;
  "prev_page_url": null | string | number;
  "to": number;
  "total": number;
  "links": FilteredProductLinks[];
}
export type Discount = {
  "id": number;// 4
  "is_active": 1 | 0;// 1
  "name": string;// "ფასდაკლება 20%";
  "value": number;// 10
  "background_image": string;// "discounts\/March2022\/9wS4Qsr9kTWivOi0OZjs.png";
  "decoded_images": [] | string;
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

/**
 * 
 * @param product 
 * @param variationId variation ID inside product.variations
 * @returns 
 */
export const calculateProductPrices = (product: ProductData | null, variationId = 0) => {
  const selectedVariation = product?.variations?.find(v => v.id == variationId);
  const originalPrice = parseFloat(product?.variations?.find(v => v.id == variationId)?.price || '0');
  const finalPrice = product
    ? (
      product?.discount?.length > 0
        ? product?.discount?.reduce((carryPrice, newDiscount) => carryPrice * (100 - newDiscount.value) / 100, originalPrice)
        : originalPrice
    )
    : null;
  // console.log('calculateProductPrices', { product, variationId, originalPrice, finalPrice });
  return {
    selectedVariation,
    selectedSize: selectedVariation?.size_variation,
    selectedColor: selectedVariation?.color_variation,
    hasDiscount: finalPrice != originalPrice,
    originalPrice,
    finalPrice,
  };
}


export type Cart = {
  // res.summary = 37 (total price)
  summary: number;
  items: CartItem[];
}

export type CartItem = {
  "id": number;// 14,
  "product_id": number;// 1,
  "variation_id": number;// 3,
  "quantity": number;// 1,
  "total": number;// 1,
  "product": ProductData;
}

export const calculateCartPrices = (cart: Cart | undefined) => {
  const processedCartItems = cart?.items?.map(item => calculateProductPrices(item.product, item.variation_id));
  const itemsSubtotalOriginalPrice = roundToCents(processedCartItems?.reduce((carry, productPrices) => carry + productPrices?.originalPrice, 0));
  const itemsSubtotal = roundToCents(processedCartItems?.reduce((carry, productPrices) => carry + (productPrices?.finalPrice || 0), 0) || 0);
  const hasDiscount = processedCartItems?.some(ci => ci.hasDiscount);
  // TODO is it always 5?
  const shippingCost = roundToCents(5);
  const cartTotal = itemsSubtotal + shippingCost;
  return {
    itemsSubtotalOriginalPrice,
    itemsSubtotal,
    hasDiscount,
    shippingCost,
    cartTotal,
  };
}

export type Address = {
  "id": number;// 154,
  "is_primary": 1 | 0;
  "user_id": number;// 144,
  "full_name": string | null,
  "address_1": string;// "rustaveli 35",
  "address_2": string | null,
  "country": string;// "georgia",
  "state": string | null,
  "city": string;// "tbilisi",
  "zip": string;// "0179",
  "mobile": string | null
};


export type User = {
  "id": number;
  "role_id": number;
  "email_verified": 1 | 0;
  "first_name": string;
  "last_name": string;
  "mobile": string;
  "email": string;
  "avatar": string | null;
  "email_verified_at": Date | null;
  "settings": any[];
  "created_at": string;// "2022-05-09T18:20:21.000000Z",
  "updated_at": string;// "2022-05-09T18:20:21.000000Z"
};

export type OrderItems = {
  id: number;
  user_id: number;
  product_id: number;
  price: string;
  discounted_price: number;
  order_id: number;
  created_at: string;
  updated_at: string;
  variation_id: number;
  quantity: number;
  product: OrderProduct;
  variation: OrderVariation;
}
export type OrderVariation = {
  id: number;
  product_id: number;
  title: string;
  price: string;
  image: [] | string;
  quantity: number;
  product_sku: string;
  "size_variation": SizeVariation;
  "color_variation": ColorVariation;
}



export type OrderProduct = {
  id: number;// 1
  product_name: string;// "ქალის მოსაცმელი";
  created_at: string;// "2021-09-23T07: 02: 00.000000Z";
  description: string | null;
  images: string | null;// JSON string: '["1.jpg","2.jpg"]'
  variations: ProductVariation[];
  user_id: number;
  product_id: number;
  price: string;
  discounted_price: number;
  order_id: number;
  updated_at: string;
  variation_id: number;
  quantity: number;
  product: OrderProduct;
  "decoded_images": [] | string;
}
export type Order = {
  id: number;
  status: number;
  sub_total: string;
  discounted_sub_total: number;
}
export type OrderDetails = {
  id: number;
  status: number;
  sub_total: string;
  discounted_sub_total: number;
  address: Address;
  "order_items": OrderItems[];
}


export type Favorite = {
  "id": number;// 1
  "created_at": string;// "2021-09-23T07: 02: 00.000000Z";
  "product": ProductData;
}

export type UpdatePassword = {
  success: boolean;
  message: string;
}

export type NewAdded = {
  id: number;
  product_name: string;
  created_at: string;
  description: string;
  images: [] | string;
  decoded_images: [] | string;
  discount: Discount[] | [];
  lowest_price: string;
  highest_price: string;
}

export type Offers = {
  id: number;
  product_name: string;
  created_at: string;
  description: string;
  images: [] | string;
  decoded_images: [] | string;
  discount: Discount[];
  lowest_price: string;
  highest_price: string;
}

export type DashboardData = {
  data: {
    discounts: Discount[];
    offers: Offers[];
    newAdded: NewAdded[];
  }
}

export type Recommended = {
  id: number;
  product_name: string;
  created_at: string;
  description: string;
  images: [] | string;
  decoded_images: [] | string;
  lowest_price: string;
  highest_price: string;
  discount: Discount[];
}
export type FilteredProduct = {
  current_page: number;
  data: FilteredProductData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: FilteredProductLinks[];
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: string;
  to: number;
  total: number;
}
export type FilteredProductData = {
  id: number;
  product_name: string;
  created_at: string;
  description: string;
  images: [] | string;
  decoded_images: [] | string;
  lowest_price: string;
  highest_price: string;
}
export type FilteredProductLinks = {
  url: string;
  label: string;
  active: boolean;
}
export type FilterWithProps = {
  size_variation?: number | 0;
  color_variation?: number;
  start_price?: string;
  end_price?: string;
  product_id: number;
}
export type Search = {
  current_page: number;
  data: ProductData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: FilteredProductLinks[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
};