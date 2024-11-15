import { useEffect, useState } from "react";
import { Global } from "../../../Helpers/Global";
import { FiEdit } from "react-icons/fi";
import { LuListPlus } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import { EditPopUp } from "../../UI/Layout/Dashboard/Categories/EditPopUp";
import { DeletePopUp } from "../../UI/Layout/Dashboard/Categories/DeletePopUp";
import { CreatePopUp } from "../../UI/Layout/Dashboard/Categories/CreatePopUp";
import { Pagination } from "../../UI/Utils/Pagination";

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showNewCategoryPopup, setShowNewCategoryPopup] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const response = await fetch(Global.url + "category", {
            method: "GET",
        });

        const data = await response.json();

        if (data.status === "success") {
            setCategories(data.categories);
        }
    };

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setShowEditPopup(true);
    };

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setShowDeleteWarning(true);
    };

    const handleNewCategoryClick = () => {
        setShowNewCategoryPopup(true); // Mostrar el pop-up de nueva categoría
    };

    const closePopup = () => {
        setSelectedCategory(null);
        setShowEditPopup(false);
        setShowDeleteWarning(false);
        setShowNewCategoryPopup(false); // Cerrar el pop-up de nueva categoría
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentCategories = categories.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(categories.length / postsPerPage);

    return (
        <section className="flex flex-col p-2">
            <h1 className="font-bold text-xl py-4">Lista de Categorias</h1>
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <button
                        onClick={handleNewCategoryClick} // Manejar clic para abrir el pop-up
                        className="bg-primary-100 text-primary-900 flex items-center gap-2 p-2 mb-4 rounded-md hover:bg-primary-200 transition-colors duration-[.25s]"
                    >
                        <LuListPlus />
                        Nueva categoría
                    </button>
                    <div className="overflow-hidden rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-text-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">#</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Nombre</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Descripción</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs text-gray-500 uppercase font-bold">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCategories.length > 0 && currentCategories.map((category) => (
                                    <tr className="odd:bg-white even:bg-text-100 hover:bg-text-100" key={category.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{category.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{category.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{category.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex items-center justify-end gap-2">
                                            <button
                                                className="text-primary-900 inline-flex p-2 bg-primary-100 rounded-md"
                                                onClick={() => handleEditClick(category)}
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                className="text-red-900 inline-flex p-2 bg-red-100 rounded-md"
                                                onClick={() => handleDeleteClick(category)}
                                            >
                                                <MdDeleteSweep />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>

            {showEditPopup && selectedCategory && (
                <EditPopUp
                    category={selectedCategory}
                    onClose={closePopup}
                    getCategories={getCategories}
                />
            )}

            {showDeleteWarning && selectedCategory && (
                <DeletePopUp
                    category={selectedCategory}
                    onClose={closePopup}
                    getCategories={getCategories}
                />
            )}

            {showNewCategoryPopup && (
                <CreatePopUp
                    onClose={closePopup}
                    getCategories={getCategories}
                />
            )}
        </section>
    );
};
