import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

//custom hook to use method defined in StoreContextValue interface
// through this hook we will access basket , setBasket and removeItem method in other component
export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) throw Error("Ops! We do no seem to inside provide");

    return context;
}

// provider that provides access to property and method to underlying component [used in index.jsx]
export function StoreProvider({ children }: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number) {
        if (!basket) return;
        const item = [...basket.items];
        const itemIndex = item.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            item[itemIndex].quantity -= quantity;
            if (item[itemIndex].quantity === 0) item.splice(itemIndex, 1);
            setBasket((prevState) => {
                return { ...prevState!, item };
            })
        }
    }


    return (
        <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </StoreContext.Provider>
    )
}