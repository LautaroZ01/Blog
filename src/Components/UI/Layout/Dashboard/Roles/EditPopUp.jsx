import { useState, useEffect } from "react";
import { useForm } from "../../../../../Hooks/useForm";
import PropTypes from "prop-types";
import { Global } from "../../../../../Helpers/Global";

export const EditPopUp = ({ rol, onClose, getRoles }) => {
    const { form, changed } = useForm()
    const [editRol, setEditRol] = useState({
        id: rol.id,
        name: rol.name || '',
        description: rol.description || ''
    })

    useEffect(() => {
        setEditRol({
            id: rol.id,
            name: rol.name || '',
            description: rol.description || ''
        })
    }, [rol]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(Global.url + 'rol/' + editRol.id, {
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
            getRoles()
        }

    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-95">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Editar Categoría</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
                        <input
                            name="name"
                            type="text"
                            defaultValue={editRol.name}
                            onChange={changed}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 shadow-sm transition ease-in-out"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Descripción</label>
                        <textarea
                            name="description"
                            defaultValue={editRol.description}
                            onChange={changed}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 shadow-sm transition ease-in-out"
                            rows="4"
                        />
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
    );
};

EditPopUp.propTypes = {
    rol: PropTypes.object,
    onClose: PropTypes.func,
    getRoles: PropTypes.func
};
