import { Global } from "../../../../../Helpers/Global";
import { MdOutlineEdit } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import PropTypes from "prop-types";
import useAuth from "../../../../../Hooks/useAuth";
import { MdCommentsDisabled } from "react-icons/md";
import { useState } from "react";

export const MenuComent = ({ toggleForm = null, id = 0, onDelete, idUser, status, setStatusComment }) => {
    const { auth } = useAuth()
    const [disable, setDisable] = useState(status === 'H' ? false : true)

    const deleteComment = async () => {
        const id_comment = { id_comment: id };

        const response = await fetch(Global.url + 'comment/', {
            method: 'DELETE',
            body: JSON.stringify(id_comment),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            onDelete(id);
        }
    };

    const desableComment = async () => {
        let form
        if (disable) {
            form = { id, status: 'H' }

        } else {
            form = { id, status: 'D' }
        }

        const response = await fetch(Global.url + 'comment/private', {
            method: 'PATCH',
            body: JSON.stringify(form),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()

        if (data.status == 'success') {
            setDisable(!disable)
            setStatusComment()
        }
    }

    return (
        <div className="menu-nav absolute top-full mt-2 right-0 bg-bg-100 shadow-lg rounded-md p-2 z-50 menu-coment text-bg-900">
            {auth && auth.rol == 'Administrador' ? (
                <>
                    <button onClick={desableComment} className="p-2 hover:bg-bg-200 w-full rounded-md transition-colors duration-[.15s] flex items-center justify-between gap-2">
                        {disable ? 'Habilitar' : 'Deshabiliar'}
                        <MdCommentsDisabled />
                    </button>
                    {auth.id == idUser &&
                        <>
                            <button onClick={toggleForm} className="p-2 hover:bg-bg-200 w-full rounded-md transition-colors duration-[.15s] flex items-center justify-between gap-2">
                                Editar
                                <MdOutlineEdit />
                            </button>

                            <button onClick={deleteComment} className="p-2 hover:bg-bg-200 w-full rounded-md transition-colors duration-[.15s] flex items-center justify-between gap-2">
                                Eliminar
                                <FaDeleteLeft />
                            </button>
                        </>
                    }
                </>
            ) : (
                <>
                    <button onClick={toggleForm} className="p-2 hover:bg-bg-200 w-full rounded-md transition-colors duration-[.15s] flex items-center justify-between gap-2">
                        Editar
                        <MdOutlineEdit />
                    </button>

                    <button onClick={deleteComment} className="p-2 hover:bg-bg-200 w-full rounded-md transition-colors duration-[.15s] flex items-center justify-between gap-2">
                        Eliminar
                        <FaDeleteLeft />
                    </button>
                </>
            )}


        </div >
    );
};

MenuComent.propTypes = {
    toggleForm: PropTypes.func,
    onDelete: PropTypes.func,
    id: PropTypes.number,
    idUser: PropTypes.number,
    status: PropTypes.string,
    setStatusComment: PropTypes.func
};

