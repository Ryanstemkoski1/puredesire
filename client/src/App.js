import loadable from "@loadable/component";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./utils/cognitoAuth";
import { Hub } from "aws-amplify";
// import AuthHub from "./components/authHub";
// import GetUsers from "./components/getUsers";
// import { NavLink as Link, Route, Routes, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import './fonts.css';
// import Invoices, { Invoice } from "./Invoices";
// import LoginPage from "./LoginPage";
// import PrivateRoute from "./PrivateRoute";
// import ProtectedPage from "./ProtectedPage";
// import RouteAsObj from "./RouteAsObj";
// import Search from "./Search";
// import { Home } from './views/Home';

// import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
import {Authentication} from "./views/Authentication";
import {Dashboard} from "./views/Dashboard";
import {CircularProgress} from "@mui/material";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signUp":
                    break;
                case "cognitoHostedUI":
                case "signIn":
                    getCurrentUser()
                        .then((userData) => {
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
            .then((userData) => {
                setLoading(true);
                setCurrentUser(userData);
                setTimeout(function() { setLoading(false); }, 500);
            })
            .catch((err) => { console.log(err); setLoading(false); });

    }, []);

    if (loading) {
        return (
            <div style={{
                position: 'absolute',
                zIndex: 2000,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                textAlign: 'center',
            }}><CircularProgress style={{
                top: '50%',
                position: 'absolute',
            }} /></div>
        );
    }

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
