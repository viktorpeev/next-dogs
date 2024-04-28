
'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";


interface ContextProps {
    favImages: string[],
    setFavImages: Dispatch<SetStateAction<string[]>>
}

const GlobalContext = createContext<ContextProps>({
    favImages: [],
    setFavImages: (): string[] => []
})

export const GlobalContextProvider = ({ children }: any) => {
    const [favImages, setFavImages] = useState<[] | string[]>([]);

    return (
        <GlobalContext.Provider value={{ favImages, setFavImages }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);