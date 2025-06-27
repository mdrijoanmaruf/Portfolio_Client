import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import AddProject from "../Pages/AddProject/AddProject";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component : Home
            },
            {
                path: '/add-project',
                Component: AddProject
            }
        ]
    }
])