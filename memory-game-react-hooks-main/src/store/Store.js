import { createContext, useContext, useReducer } from 'react';


const StoreContext = createContext();
StoreContext.displayName = 'Store';

const useStore = () => useContext(StoreContext);
export function useAppState() {
    return useContext(StoreContext)
  }


const StoreProvider = ({ children, initialState = {}, reducer }) => {
    const [globalState, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ globalState, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}
export { StoreProvider, StoreContext, useStore };