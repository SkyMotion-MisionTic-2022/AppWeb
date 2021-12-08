import { createContext, useContext } from 'react';

export const ContextoAutenticacion = createContext(null);

export const useAuth = () => {
    return useContext(ContextoAutenticacion);
};
