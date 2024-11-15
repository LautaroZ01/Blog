import { useState } from "react";
import { Global } from "../../../../../Helpers/Global";
import PropTypes from "prop-types";

export const DeletePopUp = ({ category, onClose, getCategories }) => {
    const [error, setError] = useState('')

    const deleteCategory = async () => {
        const response = await fetch(Global.url + 'category', {
            method: "DELETE",
            body: JSON.stringify({ id: category.id }),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if (data.status === "success") {
            getCategories();
            onClose();
        } else {
            setError('Esa categoria no se puede eliminar debido a que se esta utilzando')
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md transform transition-transform duration-300 scale-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Eliminar Categoría</h2>
                <p className="text-gray-600 mb-6 ">
                    ¿Estás seguro de que deseas eliminar la categoría <span className="font-semibold text-gray-800">{category.name}</span>?<br />
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
                        onClick={deleteCategory}
                        className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition ease-in-out duration-200 shadow-md"
                    >
                        Eliminar
                    </button>
                </div>
                {error &&
                    <div className="text-red-900 bg-red-100 p-2 rounded-md">
                        {<p>{error}</p>}
                    </div>
                }
            </div>
        </div>

    );
};

DeletePopUp.propTypes = {
    category: PropTypes.object,
    onClose: PropTypes.func,
    getCategories: PropTypes.func
};
