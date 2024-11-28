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
    FETCH_TRENDING_SONGS : `${BASE_URL}/song/trending-songs`,
    GET_ALL_SONGS : `${BASE_URL}/song/songs` ,
    DELETE_SONG : `${BASE_URL}/admin/song/:id` ,
    CREATE_SONG : `${BASE_URL}/admin/createSong` ,
    CREATE_ALBUM : `${BASE_URL}/admin/createAlbum` ,
    DELETE_ALBUM : `${BASE_URL}/admin/album/:id`
}


export const statEndpoint = {
    FETCH_STATS : `${BASE_URL}/stat/stats`
}

export const userEndpoints = {
    GET_USERS : `${BASE_URL}/user/users`,
    IS_ADMIN : `${BASE_URL}/admin/check-admin`,
    USER_BY_ID : `${BASE_URL}/user/user/:id`
}

export const messageEndpoints = {
    GET_ALL : `${BASE_URL}/message/allMessages/:id`,
    SEND_MESSAGE : `${BASE_URL}/message/send`
}

export const playlistEndpoints = {
    CREATE_PLAYLIST : `${BASE_URL}/playlist/createPlaylist`,
    DELETE_PLAYLIST : `${BASE_URL}/playlist/delete`,
    GET_SINGLE : `${BASE_URL}/playlist/single`,
    GET_ALL : `${BASE_URL}/playlist/all`,
    ADD_REMOVE : `${BASE_URL}/playlist/addOrRemove`
}