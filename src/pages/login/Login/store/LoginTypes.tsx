import React from 'react';

export interface GoogleLoginButtonProps {
    onSuccess: (user: { name: string }) => void;
    onFailure: (error: any) => void;
    className?: string;
}

export interface GoogleCodeResponse {
    code: string;
}

export interface User {
    name: string;
}

export interface Error {
}

export type currentUserType = {
    user_id: number;
    name: string;
    email: string;
    isLoggedIn: boolean;
    currency:string
}

