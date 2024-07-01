import axios from "axios";
import "@testing-library/jest-dom";
import "./src/mocks/test/index.tsx";
import { headers } from "./src/services/api/configs.ts";

jest.mock("./src/services/api", () => ({
    api: axios.create({
        baseURL: process.env.VITE_API_BASE_URL,
        headers
    })
}));
