import { apiCall } from "../utilities/api-call"


export const getProducts = () => {
    return apiCall('products');
}

export const getProductsById = (id: number) => {
    return apiCall('products/'+ id);
}

export const getProductDetailsById = (id: number) => {
    return apiCall('product/'+ id);
}


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
