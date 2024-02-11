import React, {createContext, useContext, useState} from 'react'

const OrderContext = createContext();

export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error("There is not exist an order provider");
    return context;
  };
  
export const OrderContextProvider =({children})=>{
    const [order, setOrder] = useState([]);

    const addOrder =(data)=>
        setOrder([...order, data]);

    const deleteOrder =(id)=>{
        let products = order.filter(el=> el.id !== id);
        setOrder(products)
    }    

    return(
        <OrderContext.Provider value={{
            order,
            addOrder,
            deleteOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}  