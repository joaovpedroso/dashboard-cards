import { useContext } from "react";
import { SearchContext } from "~/context/searchContext";

const useSearchTermContext = () => {
    const {term, changeTerm} = useContext(SearchContext);

    return {
        term,
        changeTerm
    };
};

export default useSearchTermContext;