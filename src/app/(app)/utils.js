import config from "@/resources/config";
import axios from "axios";

export function signOut(router) {
    console.log('Signing out...')
    const token = sessionStorage.getItem('token')
    axios.post(config.server.concat('/logout'), null, {
        headers: {
            'Authorization': token
        }
    }).then(() => {})
        .catch(() => {})

    sessionStorage.removeItem('token')
    router.replace('/login')
}
