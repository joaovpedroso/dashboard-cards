import "@testing-library/jest-dom";
import "./src/mocks/test/index.tsx";
import axios from "axios";

jest.mock("./src/services/api", () => ({
    api: axios.create({
        baseURL: process.env.VITE_API_BASE_URL,
        headers: {
            "Content-Type": "application/json"
        }
    })
}));
