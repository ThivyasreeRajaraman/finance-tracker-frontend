import axios from 'axios';
import { message } from 'antd';

export const HandleErrorResponse = (error: any) => {
    if (axios.isAxiosError(error) && error.response) {
        console.log("ress2::",error.response)
        const errorResponse = error.response.data;
        console.log("err response;:",errorResponse)
        if(errorResponse.details) {
            message.error(`${errorResponse.details} Error: ${errorResponse.error}`);
        } else {
            message.error(errorResponse.error || `Error: ${errorResponse.error}`);
        }
        
    } else {
        message.error('Unexpected error occurred');
    }
};