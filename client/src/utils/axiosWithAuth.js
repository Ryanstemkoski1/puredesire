import axios from "axios";
import { getIdToken } from "./cognitoAuth";

export async function axiosWithAuth(method, path) {
    try {
        const idToken = await getIdToken();
        return await axios
            .create({
                baseURL:
                    process.env.REACT_APP_API_URL,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
            })
            [method](path);
    } catch (err) {
        throw err;
    }
}
