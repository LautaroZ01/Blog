import PropTypes from "prop-types";
import { Global } from "../../../../../../../Helpers/Global";

export const DeleteContact = ({ contact, onClose, getAuthor }) => {

    const deleteContact = async () => {
        const respones = await fetch(Global.url + 'author/contact', {
            method: 'DELETE',
            body: JSON.stringify({ id: contact.id }),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await respones.json()

        if (data.status === 'success') {
            getAuthor()
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md transform transition-transform duration-300 scale-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Eliminar Rol de Usuario</h2>
                <p className="text-gray-600 mb-6 ">
                    ¿Estás seguro de que deseas eliminar este contacto <span className="font-semibold text-gray-800">{contact.name}</span>?<br />
                    <span className="text-sm text-gray-500">Esta acción no se puede deshacer.</span>
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition ease-in-out duration-200 shadow-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={deleteContact}
                        className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition ease-in-out duration-200 shadow-md"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

DeleteContact.propTypes = {
    contact: PropTypes.object,
    onClose: PropTypes.func,
    getAuthor: PropTypes.func
};
