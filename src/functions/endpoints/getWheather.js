import axios from 'axios';
import {API_KEY} from './../../utils/API_KEY';
/**
 * @user    Vlect/juanferdaza23@gmail.com
 * @date    April 17 2021 
 * @description This function fetch the end-point. We can get access to the end-point just with the API_KEY.
 * @returns Returns an object with data from the server.
 */
export const getWheather = async () => {
    const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/?api_key=${API_KEY}`)
    .then(response => response.data)
    .then(response => {
        return response;
    })
    .catch((error) => {
        console.error(error);
        console.log("Something went wrong!");
    })

    return data;
};
