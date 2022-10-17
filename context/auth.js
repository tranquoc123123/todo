import { createContext, useState } from "react";

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
});