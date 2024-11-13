import { Global } from "../../../../../Helpers/Global";
import { useForm } from "../../../../../Hooks/useForm";
import PropTypes from "prop-types";

export const CreatePopUp = ({ onClose, getCategories }) => {
    const { form, changed } = useForm()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(Global.url + 'category', {
            method: "POST",
            body: JSON.stringify(form),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if (data.status === "success") {
            getCategories(); // Obtener las categorías actualizadas
            onClose(); // Cerrar el pop-up
        } else {
            alert("Error al crear la categoría");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 transition ease-in-out duration-300">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Nueva Categoría</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={changed}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200"
                            placeholder="Escribe el nombre de la categoría"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-600 mb-2">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={changed}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200"
                            placeholder="Escribe una descripción"
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 transition ease-in-out duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition ease-in-out duration-200"
                        >
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

CreatePopUp.propTypes = {
    onClose: PropTypes.func,
    getCategories: PropTypes.func
};