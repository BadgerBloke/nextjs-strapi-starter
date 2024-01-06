'use client';
import { createContext } from 'react';

import { MembershipAndUserDetail } from '../appwrite';

export const AuthContext = createContext<{
    authStatus: boolean;
    setAuthStatus: (status: boolean) => void;
    userData: MembershipAndUserDetail | null;
    setUserData: (data: MembershipAndUserDetail | null) => void;
}>({
    authStatus: false,
    setAuthStatus: () => {
        //
    },
    userData: null,
    setUserData: () => {
        //
    },
});

export const AuthProvider = AuthContext.Provider;
