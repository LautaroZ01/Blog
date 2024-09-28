import { useEffect, useState } from "react"
import { Global } from "../../Helpers/Global";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        getProfile()
    })

    const getProfile = async () => {
        const request = await fetch(Global.url + 'user/profile', {
            method: 'GET',
            credentials: 'include'
        })

        const data = await request.json();

        if(data.status == 'success'){
            setUser(data.user)
        }else{
            console.log(data.error)
            navigate('/')
        }
    }

    return (
        <div>
            <h1>Hola {user.username}</h1>
        </div>
    )
}
