import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import EducationPage from "../Pages/Education/EducationPage";
import Contact from "../Pages/Contact/Contact";
import AddProject from "../Pages/AddProject/AddProject";
import ProjectsList from "../Pages/ProjectsList/ProjectsList";
import ProjectDetails from "../Pages/ProjectDetails/ProjectDetails";
import Admin from "../Pages/Admin/Admin";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Login from "../Pages/Login/Login";
import Forbidden from "../Pages/Forbidden/Forbidden";

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
                path: '/about',
                Component: About
            },
            {
                path: '/education',
                Component: EducationPage
            },
            {
                path: '/contact',
                Component: Contact
            },
            {
                path: '/projects',
                Component: ProjectsList
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/projects/:id',
                Component: ProjectDetails
            },
            {
                path: '/forbidden',
                Component: Forbidden
            },
            {
                path: "*",
                Component: PageNotFound
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout/>
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: (
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                )
            },
            {
                path: 'add-project',
                element: <PrivateRoute>
                    <AddProject></AddProject>
                </PrivateRoute>
            }
        ]
    }
])