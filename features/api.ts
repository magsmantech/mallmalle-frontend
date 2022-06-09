import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Address, Cart, CartItem, Category, Product, User, Order, Page, Favorite, OrderDetails, Discount, UpdatePassword, DashboardData, FilteredCategory, Subscribe, Recommended, FilteredProduct, FilterWithProps } from '../domain/shop'
import { getToken } from '../state/store';

const config = require('../config.json');

export const uploadUrl = (uploadedFile: string) =>
  `https://mallmalle-images.s3.eu-central-1.amazonaws.com/${uploadedFile}`;

// Define a service using a base URL and expected endpoints
// only use default import to avoid confusion
// export 
const api = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiEndpoint,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      // const token = (getState() as RootState).auth.token;
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //
    // Text pages
    //
    getPage: builder.query<{ success: boolean; data: Page }, string>({
      query: (slug) => ({
        url: `/pages/${slug}`,
        method: 'GET',
      })
    }),
    //
    // Categories
    //
    getCategories: builder.query<Category[], undefined>({
      query: (_args) => ({
        url: `/categories`,
        method: 'GET',
      })
    }),
    //
    // Product
    //
    //
    // Cart
    //
    getCart: builder.query<Cart, undefined>({
      query: (_args) => ({
        url: `/bag`,
        method: 'GET',
      })
    }),
    addToCart: builder.mutation<Cart, { productId: number, variationId: number, quantity: number }>({
      query: ({ productId, variationId, quantity }) => ({
        url: `bag?product_id=${productId}&variation_id=${variationId}&quantity=${quantity}`,
        method: 'POST',
      })
    }),
    // 
    // 
    // Favorite
    // 
    // 
    addToFavorite: builder.mutation<Favorite, { productId: number }>({ //working
      query: ({ productId }) => ({
        url: `user/favorites/add/${productId}`,
        method: 'POST',
      })
    }),
    getFavorites: builder.query<Favorite[], undefined>({ //working
      query: (_args) => ({
        url: `user/favorites`,
        method: 'GET',
      })
    }),
    removeFromFavorite: builder.mutation<Favorite, { productId: number }>({ //working
      query: ({ productId }) => ({
        url: `user/favorites/remove/${productId}`,
        method: 'DELETE',
      }),
    }),
    // 
    // 
    // Favorite
    // 
    // 
    updateQuantity: builder.mutation<Cart, { cartItemId: number, quantity: number }>({
      query: ({ cartItemId, quantity }) => ({
        url: `/bag/${cartItemId}?quantity=${quantity}`,
        method: 'PUT',
      }),
    }),

    removeFromCart: builder.mutation<Cart, { cartItemId: number }>({
      query: ({ cartItemId }) => ({
        url: `bag/${cartItemId}`,
        method: 'DELETE',
      }),
    }),
    //
    // Addresses
    //
    getAddresses: builder.query<Address[], undefined>({
      query: (_args) => ({
        url: `/user/addresses`,
        method: 'GET',
      })
    }),
    //
    // products<---
    //
    getProducts: builder.query<Product[], undefined>({
      query: (_args) => ({
        url: `/products`,
        method: 'GET',
      })
    }),
    //
    // product <---
    //
    getProductById: builder.query<Product, number>({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: 'GET',
      })
    }),
    //
    // get order history
    //
    getMyOrders: builder.query<Order[], undefined>({
      query: (_args) => ({
        url: `user/orders`,
        method: 'GET',
      })
    }),
    //
    // order details
    //
    getOrderDetails: builder.query<OrderDetails, number>({
      query: (orderId) => ({
        url: `user/order/${orderId}`,
        method: 'GET',
      })
    }),
    //
    // get all discount
    //
    getAllDiscount: builder.query<Discount[], undefined>({
      query: (_args) => ({
        url: `discounts`,
        method: 'GET',
      })
    }),
    //
    // order details
    //
    getDiscountById: builder.query<Discount, number>({
      query: (discountId) => ({
        url: `discounts/${discountId}`,
        method: 'GET',
      })
    }),
    //
    // Checkout / Place Order
    //
    createOrder: builder.mutation<{
      success: string;
      data: {
        status: number;// 0
        sub_total: number;// 25;
        discounted_sub_total: number;// 25
        id: number;// 3
      }
    } | {
      // error messages
      address_id: string[];// address field error message
    }, { addressId: number }>({
      query: ({ addressId }) => ({
        url: `/user/order?address_id=${addressId}`,
        method: 'POST',
      }),
    }),
    initiatePayment: builder.mutation<{
      message: string;
      redirect_url: string;
    }, { orderId: number }>({
      query: ({ orderId }) => ({
        url: `/pay/${orderId}`,
        method: 'GET',
      }),
    }),
    //
    // Profile
    //
    profile: builder.query<{
      profile: {
        user: User,
        addresses: Address[],
      },
      order_history: Order[],
    }, undefined>({
      query: (_args) => ({
        url: `/user/profile`,
        method: 'GET',
      })
    }),
    // 
    // 
    // update address
    // 
    // 
    updateAddress: builder.mutation<Address, Partial<Address> & Pick<Address, 'id'>>({ //not working
      query: (Address) => ({
        url: `user/address/${Address.id}`,
        method: 'PUT',
        body: Address
      })
    }),
    // 
    // 
    // update address
    // 
    // 
    addAddress: builder.mutation<Address, Partial<Address>>({
      query: (addAddress) => ({
        url: `user/address`,
        method: 'POST',
        body: addAddress
      })
    }),
    // 
    // 
    // subscribe notification
    // 
    // 
    subscribe: builder.mutation<string, Subscribe>({
      query: (email) => ({
        url: `subscribe`,
        method: 'POST',
        body: email
      })
    }),
    // 
    // 
    // add primary address
    // 
    // 
    addPrimaryAddress: builder.mutation<Address, number>({
      query: (id) => ({
        url: `user/address/${id}`,
        method: 'POST',
      })
    }),
    // 
    // 
    // get all address
    // 
    // 
    getAllAddress: builder.query<Address, undefined>({
      query: (_arg) => ({
        url: `user/addresses`,
        method: 'GET',
      })
    }),
    // 
    // 
    // get recommendes
    // 
    // 
    getRecommended: builder.query<Recommended[], undefined>({
      query: (_arg) => ({
        url: `recommended`,
        method: 'GET',
      })
    }),
    // 
    // 
    // get dashboard data
    // 
    // 
    getDashboardData: builder.query<DashboardData, undefined>({
      query: (_arg) => ({
        url: `dashboard`,
        method: 'GET',
      })
    }),
    // 
    // 
    // get filtered category data
    // 
    // 
    filter: builder.query<FilteredCategory, number>({
      query: (category_id) => ({
        url: `categories/${category_id}/filters`,
        method: 'GET',
      })
    }),
    // 
    // 
    // get filtered product data
    // 
    // 
    filteredCategory: builder.query<FilteredProduct, { sizeVariationID?: number, colorVariationID?: number, startPrice?: string, endPrice?: string, productID: number }>({
      query: ({ sizeVariationID, colorVariationID, startPrice, endPrice, productID }) => ({
        url: `products/${productID}/filters`,
        method: 'GET',
        json: sizeVariationID, colorVariationID, startPrice, endPrice
      })
    }),
    // 
    // 
    // delete address
    // 
    // 
    deleteAddress: builder.mutation({ //work
      query: (addressId) => ({
        url: `user/address/${addressId}`,
        method: "DELETE",
      }),
    }),
    // 
    // 
    // change password
    // 
    // 
    changePassword: builder.mutation<UpdatePassword, { currentPassword: string, newPassword: string }>({
      query: ({ currentPassword, newPassword }) => ({
        url: `user/change-password?current_password=${currentPassword}&new_password=${newPassword}`,
        method: 'POST',
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCartQuery } = api

export default api;
