import { apiCall } from "../utilities/api-call";

export const getCategories = async () => {
    return await apiCall('categories');
}

// type ColorType = {
//     color_name: string,
//     color: string,
// }


// export const getAllColors = async () => {
//     try {   
//         const res = await apiCall('products');
//         if (!res || !res.data) {
//             return [];
//         }
//         const colors: ColorType[] = [];
//         for (const item of res.data) {
//             if (!item?.variations?.length) {
//                 continue;
//             }
//             for (const variation of item?.variations) {
                
//             }
//         }

//         return colors;

//     } catch (error) {
//         console.log(error);
//     }
// }

export const getFilters = async (categoryId: number) => {
    return await apiCall(`categories/${categoryId}/filters`);
}

export const getFilteredItems =async (categoryId: number, params: any) => {
    // console.log(params, 'aascascascascascsacscs');
    // let query = '';
    // for (const [key, value] of Object.entries(params)) {
    //     if (!value && value !== 0) {
    //         return;
    //     }
    //     query += `${key}=${encodeURIComponent(value)}`
    // }
    return await apiCall(`products/${categoryId}/filters`, 'GET', params);
}

export const getBag = async () => {
    return await apiCall('bag');
}