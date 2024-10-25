import { Global } from "../../../../../Helpers/Global";
import { MdOutlineEdit } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import PropTypes from "prop-types";

export const MenuComent = ({ toggleForm = null, id = 0, onDelete }) => {
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

    return (
        <div className="menu-nav absolute top-full mt-2 right-0 bg-bg-100 shadow-lg rounded-md p-2 z-50 menu-coment text-bg-900">

            <button onClick={toggleForm} className="p-2 hover:bg-bg-200 w-full rounded-md transition-colors duration-[.15s] flex items-center justify-between gap-2">
                Editar
                <MdOutlineEdit />
            </button>

            <button onClick={deleteComment} className="p-2 hover:bg-bg-200 w-full rounded-md transition-colors duration-[.15s] flex items-center justify-between gap-2">
                Eliminar
                <FaDeleteLeft />
            </button>

        </div>
    );
};

MenuComent.propTypes = {
    toggleForm: PropTypes.func,
    onDelete: PropTypes.func,
    id: PropTypes.number
  };

