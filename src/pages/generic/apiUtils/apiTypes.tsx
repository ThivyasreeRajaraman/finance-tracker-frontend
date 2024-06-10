export interface DataResponseType {
    success: boolean;
    message: string;
    [key: string]: any; 
}

export interface ErrorResponseType {
    success: boolean;
    "status code": number;
    error: string;
    details?: string;
}

export interface DataResponseForExistingEntry {
    success: boolean;
    message: string;
    existingId: number
    [key: string]: any; 
}