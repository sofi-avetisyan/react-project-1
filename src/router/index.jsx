import { useRoutes } from "react-router-dom"
import SignUp from "../pages/SignUp"
import SignIn from "../pages/SignIn"
import Home from "../pages/Home"
import UserProfile from "../pages/UserProfile"
import Users from "../pages/Users"
import ProfileSetting from "../pages/UserProfile/ProfileSettings"
import Profile from "../pages/Users/Profile"
import AnkapComponent from "../pages/Ankap Folder"
import FakeUser from "../FakeUser"
import FakeUsers from "../FakeUsers"

const ROUTES = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/sign-up",
        element: <SignUp/>
    },
    {
        path: "/sign-in",
        element: <SignIn/>
    },
    {
        path:"/profile",
        element:<UserProfile/>
    },
    {
        path:"/users",
        element:<Users/>

    },
    {
        path:"/profile-settings",
        element:<ProfileSetting/>
    },
    {
        path:"/users/:id",
        element:<Profile/>
    },
    {
        path:"/ankap-component",
        element:<AnkapComponent/>
    },
    {
        path:"/fake-users",
        element:<FakeUsers/>
    },
    {
        path:"/fake-users/:id",
        element:<FakeUser/>
    }
]

export default function Router () {
    return useRoutes(ROUTES)
}