import { aPost } from "./apiService"

export const userLogin = async (url,body) => {
    const response  = await aPost(url,body); 
    return response;  
}

export const userLogout = async (url) => {
    const response = await aPost(url);
    return response;
}

export const userSignUp = async (url,data) => {
    const response = await aPost(url,data);
    return response;
}