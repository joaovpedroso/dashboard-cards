import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { SearchContextProvider } from "~/context/searchContext";

const queryClient = new QueryClient();
const renderByQueryClient = (children: React.ReactElement) => 
    render(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

const renderByContext = (children: React.ReactElement) => render(
    <SearchContextProvider>
        {children}
    </SearchContextProvider>
);

const hookWrapper = () => {
    return ({ children }: {children: React.ReactNode}) => (
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
    );
};

export { renderByQueryClient, renderByContext, hookWrapper };