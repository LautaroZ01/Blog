import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "../../../../../../Hooks/useForm";
import { Global } from "../../../../../../Helpers/Global";

export const EditSocial = ({ social, onClose, getAuthor }) => {
    const { form, changed } = useForm()
    const [editSocial, setEditSocial] = useState({
        id: social.id,
        type: social.type,
        name: social.name || '',
        link: social.link || ''
    })

    useEffect(() => {
        setEditSocial({
            id: social.id,
            type: social.type,
            name: social.name || '',
            link: social.link || ''
        })
    }, [social])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(Global.url + 'author/social/' + editSocial.id, {
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
            getAuthor()
        }

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md transform transition-transform duration-300 scale-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Editar Red Social</h2>
                <form onSubmit={handleSubmit}>
                    {/* Selector de red social */}
                    <div className="mb-5">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            htmlFor="type"
                        >
                            Elige tu red social
                        </label>
                        <select
                            name="type"
                            id="type"
                            onChange={changed}
                            required
                            value={editSocial.type}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 shadow-sm transition duration-200"
                        >
                            <option value="" disabled>
                                Elige tu red social
                            </option>
                            <option value="Instagram" selected={editSocial?.type === 'Instagram'}>
                                Instagram
                            </option>
                            <option value="Facebook" selected={editSocial?.type === 'Facebook'}>
                                Facebook
                            </option>
                            <option value="X" selected={editSocial?.type === 'X'}>
                                X
                            </option>
                        </select>
                    </div>

                    {/* Campo de nombre */}
                    <div className="mb-5">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            htmlFor="name"
                        >
                            Nombre
                        </label>
                        <input
                            name="name"
                            type="text"
                            defaultValue={editSocial.name}
                            onChange={changed}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 shadow-sm transition duration-200"
                            required
                        />
                    </div>

                    {/* Campo de enlace */}
                    <div className="mb-5">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            htmlFor="link"
                        >
                            Enlace
                        </label>
                        <input
                            type="url"
                            name="link"
                            id="link"
                            defaultValue={editSocial.link}
                            onChange={changed}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 shadow-sm transition duration-200"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none shadow-sm transition duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-200"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

EditSocial.propTypes = {
    social: PropTypes.object,
    onClose: PropTypes.func,
    getAuthor: PropTypes.func
};

