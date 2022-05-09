import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Address, Cart, CartItem, Category, Product, User, Order } from '../domain/shop'
import { getToken } from '../state/store';

const config = require('../config.json');

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
    // Checkout / Place Order
    //
    createOrder: builder.mutation<{
      success?: string;
      // error messages
      address_id: string[];// address field error message
     }, { addressId: number }>({
      query: ({ addressId }) => ({
        url: `/user/order?address_id=${addressId}`,
        method: 'POST',
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
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCartQuery } = api

export default api;
