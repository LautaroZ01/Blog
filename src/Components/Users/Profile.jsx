import { useEffect, useState } from "react";
import { Global } from "../../Helpers/Global";
import { useNavigate } from "react-router-dom";
import { BtnEdit } from "../UI/Layout/User/BtnEdit";
import { FiEdit } from "react-icons/fi";
import { FormUser } from "../UI/Layout/Private/User/FormUser";
import { Avatar } from "../UI/Layout/User/Avatar";
import { UploadAvatar } from "../UI/Layout/Private/User/UploadAvatar";
import { RxCross2 } from "react-icons/rx";

export const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState({});
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProfile();
    }, []);

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    const toggleUploadPopup = () => {
        setShowUploadPopup(!showUploadPopup);
    };

    const getProfile = async () => {
        const request = await fetch(Global.url + "user/profile", {
            method: "GET",
            credentials: "include",
        });

        const data = await request.json();

        if (data.status === "success") {
            setUser(data.user);
        } else {
            navigate("/");
        }
    };

    return (
        <section className="max-w-[80%] mx-auto p-3 text-base bg-fondo-perfil bg-center bg-no-repeat min-h-[85vh]">
            <h1 className="text-2xl font-bold p-4">Mi perfil</h1>
            <div className="flex flex-wrap items-start justify-center gap-4 p-4 rounded-lg shadow-md mb-3 item-animation">
                <span className="relative">
                    <Avatar photo={user.photo} alt={user.username} size={'24'} />
                    <button
                        className="absolute bottom-0 right-0 bg-accent-300 rounded-full p-2 hover:bg-accent-100 transition-all duration-[.25s]"
                        onClick={toggleUploadPopup}
                    >
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

            {showUploadPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center z-50 px-4 sm:px-6">
                    <div className="bg-white p-4 shadow-md max-w-md w-full space-y-4 relative border-t-4 border-primary-500">
                        <div className="flex gap-2">
                            <h2 className="flex-1 font-bold text-lg text-center">Sube aqui tu nueva foto de perfil</h2>
                        </div>
                        <UploadAvatar setUser={setUser} toggleUploadPopup={toggleUploadPopup} />
                    </div>
                </div>
            )}
        </section>
    );
};
