import React from "react";
import { signOut } from "../../utils/cognitoAuth";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function SignOut() {
    return (
        <>
            <button className="logoutButton"
                onClick={() => {
                    signOut();

                    window.location.href = '/';
                }}
            >
                <ExitToAppIcon sx={{ mr: 1 }} style={{fill: '#1C94A8'}} />

                Logout
            </button>
        </>
    );
}
