import { useEffect, useState } from "react"
import { Global } from "../../Helpers/Global";
import { useNavigate } from "react-router-dom";
import { BtnEdit } from "../UI/Layout/User/BtnEdit";
import { FaUserAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FormUser } from "../UI/Layout/Private/User/FormUser";

export const Profile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [user, setUser] = useState({});
    const navigate = useNavigate()


    useEffect(() => {
        getProfile()
    })

    const toggleEdit = () =>{
        setIsEdit(!isEdit)
    }

    const getProfile = async () => {
        const request = await fetch(Global.url + 'user/profile', {
            method: 'GET',
            credentials: 'include'
        })

        const data = await request.json();

        if (data.status == 'success') {
            setUser(data.user)
        } else {
            console.log(data.error)
            navigate('/')
        }
    }

    return (
        <section className="max-w-[80%] mx-auto p-3 text-base bg-fondo-perfil bg-center bg-no-repeat min-h-[85vh]">
            <h1 className="text-2xl font-bold p-4">Mi perfil</h1>
            <div className="flex flex-wrap items-start justify-center gap-4 p-4 rounded-lg shadow-md mb-3 item-animation">
                <span className="relative">
                    {user.photo !== 'https://user.svg' ? (
                        <img src={user.photo} alt={user.username} className="w-24 h-24 rounded-full" />
                    ) : (
                        <FaUserAlt className="w-24 h-24 rounded-full" />
                    )}
                    <button className="absolute bottom-0 right-0 bg-bg-200/50 rounded-full p-2 hover:bg-bg-200 transition-all duration-[.25s]">
                        <FiEdit />
                    </button>
                </span>
                <div className="flex flex-col gap-2 flex-1">
                    <strong>
                        {user.username} {user.surname}
                    </strong>
                    <span>{user.email}</span>
                    <span>{user.rol}</span>
                </div>
            </div>
            <div className="flex flex-wrap-reverse md:flex-wrap items-start justify-center gap-4 p-4 rounded-lg shadow-md item-animation">
                <div className="md:flex-1">
                    <h2 className="text-xl font-bold p-4">Informacion personal</h2>
                    <FormUser user={user} isEdit={isEdit} setUser={setUser} setIsEdit={setIsEdit} />
                </div>

                <BtnEdit onClick={toggleEdit} />

            </div>
        </section>
    )
}
