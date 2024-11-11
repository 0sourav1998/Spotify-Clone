const BASE_URL : string = import.meta.env.VITE_API_BASE_URL;
console.log(BASE_URL)

export const authEndpoints = {
    SIGN_IN_OUT : `${BASE_URL}/auth/auth-user`
}

export const musicEndpoints = {
    GET_ALL_ALBUMS : `${BASE_URL}/album/all`,
    FETCH_SINGLE_ALBUM : `${BASE_URL}/album/:id`
}