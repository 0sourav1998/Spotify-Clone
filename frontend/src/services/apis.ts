const BASE_URL : string = import.meta.env.VITE_API_BASE_URL;
console.log(BASE_URL)

export const authEndpoints = {
    SIGN_IN_OUT : `${BASE_URL}/auth/auth-user`
}

export const musicEndpoints = {
    GET_ALL_ALBUMS : `${BASE_URL}/album/all`,
    FETCH_SINGLE_ALBUM : `${BASE_URL}/album/:id`,
    FETCH_FEATURED_SONGS : `${BASE_URL}/song/featured-songs`,
    FETCH_MADE_FOR_YOU : `${BASE_URL}/song/made-for-you`,
    FETCH_TRENDING_SONGS : `${BASE_URL}/song/trending-songs`
}

export const userEndpoints = {
    GET_USERS : `${BASE_URL}/user/users`,
    IS_ADMIN : `${BASE_URL}/admin/check-admin`
}