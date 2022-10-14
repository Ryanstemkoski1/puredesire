import React, {useEffect, useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {ForgotPassword, GoogleSignIn, LogIn, Register, VerifyForgotPassword} from "./auth";
import {getCurrentUser} from "../utils/cognitoAuth";

export default function GetUsers() {
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCurrentUser()
            .then((userData) => setCurrentUser(userData))
            .catch((err) => console.log(err));
    }, []);

    function getUsers() {
        setError(null);
        axiosWithAuth("get", "/users")
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err);
                if (users) {
                    setUsers(null);
                }
                setError(err);
            });
    }

    function getCurrentUserData(email) {
        setError(null);
        console.log(email);
        axiosWithAuth("get", "/users/getUserData", email)
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err);
                if (users) {
                    setUsers(null);
                }
                setError(err);
            });
    }

    return (
        <>
            {currentUser && (
                <>
                    <h1>Get Users:</h1>
                    <button onClick={() => getCurrentUserData('alexandr.semco@ziplineinteractive.com')}>
                        Click to get users from server
                    </button>
                    {error && <h3>Error: {error.message}</h3>}
                    {users && <p>{JSON.stringify(users)}</p>}
                </>
            )}

        </>
    );
}
