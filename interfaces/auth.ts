export interface RegistrationParams {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    confirm?: string,
    agreed?: boolean,
};

export interface LogInParams {
    email: string,
    password: string,
};

export interface AddAddressParams {
    full_name?: string,
    address: string,
    country: string,
    state?: string,
    city: string,
    zip: string,
    mobile?: string,
}

export interface ResetPasswordParams {
    token?: string,
    password: string,
    confirm?: string,
};
