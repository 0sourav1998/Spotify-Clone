const BASE_URL : string = import.meta.env.VITE_API_BASE_URL;
console.log(BASE_URL)

export const authEndpoints = {
    SIGN_IN_OUT : `${BASE_URL}/auth/auth-user`
}