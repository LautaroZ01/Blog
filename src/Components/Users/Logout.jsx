import { useEffect } from "react";
import useAuth from "../../Hooks/useAuth"
import { Global } from "../../Helpers/Global";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate()

    const logout = async () => {
        const request = await fetch(Global.url + 'user/logout', {
            method: 'GET',
            credentials: 'include'
        })

        const data = await request.json()

        if(data.status == 'success'){
            setAuth(null)
            navigate('/')
        }
    }

    useEffect(() => {
        logout()
    })

    return (
        <div>Logout</div>
    )
}
