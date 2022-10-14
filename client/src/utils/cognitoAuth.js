import cognitoConfig from "../config/cognitoConfig.json";
import Amplify, { Auth } from "aws-amplify";
import axios from "axios";
import { Navigate } from "react-router-dom";
import React, { Component }  from 'react';
// import {CustomChromeStorage} from '../utils/customChromeStorage'

Amplify.configure({
    Auth: {
        userPoolId: cognitoConfig.userPool,
        userPoolWebClientId: cognitoConfig.clientId,
        region: cognitoConfig.region,
        oauth: {
            domain: cognitoConfig.userPoolUri,
            scope: cognitoConfig.tokenScopes,
            redirectSignIn: cognitoConfig.callbackUri,
            redirectSignOut: cognitoConfig.signoutUri,
            responseType: "code",
        },
        // storage: CustomChromeStorage
    },
});

async function signUp(email, password, name='', role='user') {
    var temp_user = await Auth.signUp({
        username: email,
        password,
    }).then((data) => {
        console.log(email);
        console.log(role);
        try {
            const registerData = {
                email: email,
                role: role,
                name: name
            };
            axios.post(process.env.REACT_APP_API_URL + "/auth/", registerData);
        }
        catch (err) {
            console.log(err);
            return err;
        }
    });
    return temp_user;
    // try {
    //     const temp_user = await Auth.signUp({
    //         username: email,
    //         password,
    //     });
    //     const registerData = {
    //         email: email,
    //         role: 'user'
    //     };
    //     await axios.post("http://localhost:5000/auth/", registerData);
    //
    //     // return await Auth.signIn(email, password);
    //
    //     // return temp_user;
    //     return(
    //         <Navigate to={{
    //             pathname: '/',
    //             state: { id: '123' }
    //         }}
    //         />
    //     )
    // } catch (err) {
    //     console.log(err);
    //     return err;
    // }
    // return await Auth.signUp({
    //     username: email,
    //     password,
    // });
}

async function signIn(email, password) {
    var temp_varibale = await Auth.signIn(email, password);
    return temp_varibale;
}

async function confirmSignUp(email, code) {
    return await Auth.confirmSignUp(email, code);
}

async function resendConfirmationCode(username) {
    return await Auth.resendSignUp(username);
}

// pass in true to sign out from all devices
async function signOut(global = false) {
    return await Auth.signOut({ global });
}

async function federatedSignIn(provider) {
    return await Auth.federatedSignIn({ provider });
}

async function forgotPassword(email) {
    return await Auth.forgotPassword(email);
}

async function forgotPasswordSubmit(email, code, newPassword) {
    try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
        return "Password was changed successfully.";
    } catch (err) {
        throw err;
    }
}

async function changePassword(oldPassword, newPassword) {
    try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, oldPassword, newPassword);
        return "Password was changed successfully.";
    } catch (err) {
        throw err;
    }
}

function getIdToken() {
    return new Promise((resolve, reject) => {
        Auth.currentSession()
            .then((data) => {
                const idToken = data.getIdToken();
                resolve(idToken.jwtToken);
            })
            .catch(() => {
                reject(Error("Not signed in."));
            });
    });
}

function getCurrentUser() {
    return new Promise((resolve, reject) => {
        Auth.currentSession()
            .then((data) => {
                const idToken = data.getIdToken();
                const user = idToken.payload;
                resolve(user);
            })
            .catch(() => {
                reject(Error("Not signed in."));
            });
    });
}

export {
    signUp,
    signIn,
    confirmSignUp,
    resendConfirmationCode,
    signOut,
    federatedSignIn,
    forgotPassword,
    forgotPasswordSubmit,
    getIdToken,
    changePassword,
    getCurrentUser,
};
