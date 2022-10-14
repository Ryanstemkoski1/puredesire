import loadable from "@loadable/component";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./utils/cognitoAuth";
import { Hub } from "aws-amplify";
import AuthHub from "./components/authHub";
import GetUsers from "./components/getUsers";
import { NavLink as Link, Route, Routes, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import './fonts.css';
import Invoices, { Invoice } from "./Invoices";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";
import ProtectedPage from "./ProtectedPage";
import RouteAsObj from "./RouteAsObj";
import Search from "./Search";
import { Home } from './views/Home';

// import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
import {Authentication} from "./views/Authentication";
import {Dashboard} from "./views/Dashboard";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import theme from "./mainTheme";

// import {useState} from "@types/react";
import {
    ChangePassword,
    ForgotPassword,
    GoogleSignIn,
    LogIn,
    Register, ResendVerificationCode,
    SignOut,
    VerifyEmailWithCode,
    VerifyForgotPassword
} from "./components/auth";
// import Layout from './Layout';

// const Loading = () => {
//     return <div>Loading...</div>;
// };
//
// const Dashboard = loadable(() => import("./Dashboard.js"), {
//     fallback: <Loading />,
// });
//
// function App() {
//     return (
//         <div className="App">
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/" activeClassName="active" end>
//                             Home
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/dashboard" activeClassName="active">
//                             Dashboard
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/about" activeClassName="active">
//                             About
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/object_route" activeClassName="active">
//                             Route as Object
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/search" activeClassName="active">
//                             Search
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/public" activeClassName="active">
//                             Public Page
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/protected" activeClassName="active">
//                             Protected Page
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/invoices" activeClassName="active">
//                             Invoices
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>
//             <div className="main">
//                 <Routes>
//                     <Route path="/" element={<Home />}></Route>
//
//                     <Route path="about" element={<About />}></Route>
//                     <Route path="dashboard/*" element={<Dashboard />}></Route>
//                     <Route path="object_route/*" element={<RouteAsObj />}></Route>
//                     <Route path="search" element={<Search />}></Route>
//                     <Route path="public" element={<PublicPage />}></Route>
//                     <Route
//                         path="protected"
//                         element={
//                             <PrivateRoute>
//                                 <ProtectedPage x={1} />
//                             </PrivateRoute>
//                         }
//                     ></Route>
//                     <Route path="login" element={<LoginPage />}></Route>
//                     <Route path="invoices" element={<Invoices />}>
//                         <Route
//                             index
//                             element={<p>Please select an invoice above</p>}
//                         ></Route>
//                         <Route path=":invoiceId" element={<Invoice />} />
//                     </Route>
//
//                     <Route path="*" element={<NotFound />} />
//                 </Routes>
//             </div>
//         </div>
//     );
// }

// export const Home = () => {
//     return <div>You are in Home page</div>;
// };
// export const About = () => {
//     return <div>This is the page where you put details about yourself</div>;
// };
// export const PublicPage = () => {
//     return <div>This page can be accessed by anyone</div>;
// };
// export const NotFound = () => {
//     return <div>This is a 404 page</div>;
// };



function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        Hub.listen("auth", ({ payload: { event, data } }) => {
            // console.log('Event: ');
            // console.log(event);
            // console.log('__');
            switch (event) {
                case "signUp":
                    // console.log("User registered");
                    break;
                case "cognitoHostedUI":
                case "signIn":
                    getCurrentUser()
                        .then((userData) => {
                            // console.log(userData);
                            setCurrentUser(userData);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    break;
                case "signOut":
                    setCurrentUser(null);
                    break;
                case "signIn_failure":
                case "cognitoHostedUI_failure":
                    console.log("Sign in failure", data);
                    break;
                default:
            }
        });

        getCurrentUser()
            .then((userData) => setCurrentUser(userData))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="App">
            {!currentUser && (
                <>
                    <Authentication />
                </>
            )}
            {currentUser && (
                <>
                    <Dashboard />
                </>
            )}
        </div>
    );
}

export default App;
