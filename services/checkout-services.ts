import { Cart, CartItem } from "../domain/shop";
import { apiCall } from "../utilities/api-call"



export const getBag = async () => {
    return await apiCall('bag', 'GET');
}

export const addToCart = (productId: number, variationId: any, quantity: number) => {
    return apiCall(`bag?product_id=${productId}&variation_id=${variationId}&quantity=${quantity}`, 'POST');
}

export const addToFavorite = (productId: number) => {
    return apiCall(`user/favorites/add/${productId}`, 'POST');
}

export const removeFromFavorite = (productId: number) => {
    return apiCall(`user/favorites/remove/${productId}`, 'DELETE');
}

export const updateQuantity = (cartItemId: number, quantity: number) => {
    return apiCall(`bag/${cartItemId}?quantity=${quantity}`, 'PUT');
}

export const removeFromCart = (productId: number, variationId: number) => {
    return apiCall(`bag/${productId}`, 'DELETE');
}

// export const getProductsById = (id: number) => {
//     return apiCall('products/'+ id);
// }

// export const getProductDetailsById = (id: number) => {
//     return apiCall('product/'+ id);
// }


// export const getProductsByColor = async (color: string) => {
//     try {
//         const res = await apiCall('products')
//         if (!res || !res.data) {
//             return [];
//         }
//         // const products = res.data.filter((item: any) => item?.variations?.color_variation)
//         return products;

//     } catch (error) {
//         console.log(error);
        
//     }
// }
