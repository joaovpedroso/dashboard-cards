import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "~/router";
import { Header } from "./components/Header";
import { SearchContextProvider } from "./context/searchContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <SearchContextProvider>
        <Router />
      </SearchContextProvider>
    </QueryClientProvider>
  );
}

export default App;
