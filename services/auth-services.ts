import { RegistrationParams, LogInParams, AddAddressParams, ResetPasswordParams } from "../interfaces/auth";
import { apiCall } from "../utilities/api-call"

import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInState } from "../features/authSlice";


export const register = (data: RegistrationParams) => {
    // console.log(data);
    const { firstName, lastName, phone, email, password } = data;
    const params  = {
        first_name: firstName,
        last_name: lastName,
        mobile: phone,
        email,
        password,
    }

    return apiCall('user/register', 'POST', params);
}

export const logIn = (data: LogInParams) => {
    return apiCall('user/login', 'POST', data);
};

export const addAddress = (data: AddAddressParams)=> {    
    const params = {
        address_1: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
        zip: data.zip,
    };
    return apiCall('user/address', 'POST', params);
}

export const forgotPassword = (email: string) => {
    return apiCall('user/forgot/change-request', 'POST', { email: email });
}

export const resetPassword = (data: ResetPasswordParams) => {
    const params = {
        token: data.token,
        new_password: data.password,
    }

    return apiCall('user/forgot/change-password', 'POST', params);
}

export const getUserData = () => {
    return apiCall('user/profile');    
}

export const decodeJwt = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
        return jwtDecode(token);
    }
    return null;
}

// export const isLoggedIn = (dispatch: Function) => {
//     const isLogged = localStorage.getItem('access_token');
//     dispatch(
//         setLoggedInState({loggedIn: !!isLogged}),
//     )
//     return isLogged;
// }


export const setAccessToken = (token: string, dispatch: Function) => {
    localStorage.setItem('access_token', token);
    dispatch(
        setLoggedInState({loggedIn: true})
    )
} 

export const removeAccessToken = (dispatch: Function) => {
    localStorage.removeItem('access_token');
    dispatch(
        setLoggedInState({loggedIn: false})
    )
};

