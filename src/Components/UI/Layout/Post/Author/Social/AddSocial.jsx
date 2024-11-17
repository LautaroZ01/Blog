import PropTypes from "prop-types";
import { useForm } from "../../../../../../Hooks/useForm";
import { Global } from "../../../../../../Helpers/Global";

export const AddSocial = ({ id, getAuthor, onClose }) => {
    const { form, changed } = useForm()

    const addSocial = async (e) => {
        e.preventDefault();
        if (form) {
            form.id_author = id

            const respones = await fetch(Global.url + 'author/social', {
                method: 'POST',
                body: JSON.stringify(form),
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
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition ease-in-out duration-300">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Agregar Nueva Red Social</h2>

                <form onSubmit={addSocial} className="space-y-6">

                    <div>
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Escoge tu red social
                        </label>
                        <select
                            name="type"
                            id="type"
                            onChange={changed}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                        >
                            <option value="" disabled selected>
                                Elige tu red social
                            </option>
                            <option value="Instagram">Instagram</option>
                            <option value="Facebook">Facebook</option>
                            <option value="X">X</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={changed}
                            placeholder="Escribe el nombre de usuario"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="link"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Enlace
                        </label>
                        <input
                            type="url"
                            name="link"
                            id="link"
                            onChange={changed}
                            placeholder="Escribe el enlace de la red social"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                            required
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-4">
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
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

AddSocial.propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    getAuthor: PropTypes.func.isRequired
};
