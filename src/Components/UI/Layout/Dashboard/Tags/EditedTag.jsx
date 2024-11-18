import PropTypes from "prop-types";
import { useForm } from "../../../../../Hooks/useForm";
import { useEffect, useState } from "react";
import { Global } from "../../../../../Helpers/Global";

export const EditedTag = ({ tag, onClose, getTags }) => {
    const { form, changed } = useForm()
    const [editTag, setEditTag] = useState({
        id: tag.id,
        name: tag.name || ''
    })

    useEffect(() => {
        setEditTag({
            id: tag.id,
            name: tag.name || ''
        })
    }, [tag]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(Global.url + 'tag/' + editTag.id, {
            method: 'PATCH',
            body: JSON.stringify(form),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()

        if (data.status == 'success') {
            onClose()
            getTags()
        }

    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-95">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Editar Tag</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
                        <div className="flex items-center gap-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200">
                            <strong className="text-text-600">#</strong>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={changed}
                                defaultValue={editTag.name}
                                required
                                className="w-full p-2 outline-none"
                                placeholder="Escribe el nombre del tag"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none transition ease-in-out duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition ease-in-out duration-200"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

EditedTag.propTypes = {
    tag: PropTypes.object,
    onClose: PropTypes.func,
    getTags: PropTypes.func
};
