import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import AddProject from "../Pages/AddProject/AddProject";
import ProjectsList from "../Pages/ProjectsList/ProjectsList";
import ProjectDetails from "../Pages/ProjectDetails/ProjectDetails";
import PrivateRoute from "./PrivateRoute";

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
                path: '/projects',
                Component: ProjectsList
            },
            {
                path: '/projects/:id',
                Component: ProjectDetails
            },
            {
                path: '/add-project',
                element: (
                    <PrivateRoute>
                        <AddProject />
                    </PrivateRoute>
                )
            }
        ]
    }
])