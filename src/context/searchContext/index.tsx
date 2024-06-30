import { createContext, useState } from "react";

const initialValue = {term: "", changeTerm: (_: string) => {}};

const SearchContext = createContext(initialValue);

const SearchContextProvider = ({children}: {children: React.ReactNode}) => {

    const [term, setTerm] = useState("");

    const changeTerm = (newTerm: string) => {
        setTerm(newTerm);
    };

    return (
        <SearchContext.Provider value={{
            term,
            changeTerm
        }}>
            {children}
        </SearchContext.Provider>
    );
};
export { SearchContext, SearchContextProvider};