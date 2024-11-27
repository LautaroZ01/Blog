import { useEffect, useState } from "react"
import { Global } from "../../../Helpers/Global";

import { FiEdit } from "react-icons/fi";
import { LuListPlus } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import { Pagination } from "../../UI/Utils/Pagination";
import { CreateTag } from "../../UI/Layout/Dashboard/Tags/CreateTag";
import { EditedTag } from "../../UI/Layout/Dashboard/Tags/EditedTag";
import { DeleteTag } from "../../UI/Layout/Dashboard/Tags/DeleteTag";
import { useParams } from "react-router-dom";

export const Tags = () => {
    const [tags, setTags] = useState([])
    const { isAuthor } = useParams()

    const [selectedTag, setSelectedTag] = useState(null);

    const [showNewTag, setShowNewTag] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        getTags()
    }, [])

    const getTags = async () => {
        const response = await fetch(Global.url + 'tag', {
            method: 'GET'
        })

        const data = await response.json()

        if (data.status == 'success') {
            if (isAuthor) {
                setShowNewTag(true)
            }

            setTags(data.tags)

        }
    }

    const handleNewTag = () => {
        setShowNewTag(true);
    }
    const handleEdit = (tag) => {
        setSelectedTag(tag);
        setShowEdit(true)
    }

    const handleDelete = (tag) => {
        setSelectedTag(tag);
        setShowDelete(true)
    }

    const closePopUp = () => {
        setSelectedTag(null);
        setShowNewTag(false)
        setShowEdit(false)
        setShowDelete(false)
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentRoles = tags.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(tags.length / postsPerPage);

    return (
        <section className="p-2">
            <h1 className="font-bold text-xl py-4">Lista de Tags</h1>
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <button
                        onClick={handleNewTag}
                        className="bg-primary-100 text-primary-900 flex items-center gap-2 p-2 mb-4 rounded-md hover:bg-primary-200 transition-colors duration-[.25s]"
                    >
                        <LuListPlus />
                        Nueva Tag
                    </button>
                    <div className="overflow-hidden rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-text-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">#</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Nombre</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs text-gray-500 uppercase font-bold">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRoles.length > 0 && currentRoles.map((tag) => (
                                    <tr className="odd:bg-white even:bg-text-100 hover:bg-text-100" key={tag.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{tag.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{tag.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex items-center justify-end gap-2">
                                            <button
                                                className="text-primary-900 inline-flex p-2 bg-primary-100 rounded-md"
                                                onClick={() => handleEdit(tag)}
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                className="text-red-900 inline-flex p-2 bg-red-100 rounded-md"
                                                onClick={() => handleDelete(tag)}
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
            {showNewTag && (
                <CreateTag
                    onClose={closePopUp}
                    getTags={getTags}
                    isAuthor={isAuthor}
                />
            )}

            {showEdit && selectedTag && (
                <EditedTag
                    tag={selectedTag}
                    onClose={closePopUp}
                    getTags={getTags}
                />
            )}

            {showDelete && selectedTag && (
                <DeleteTag
                    tag={selectedTag}
                    onClose={closePopUp}
                    getTags={getTags}
                />
            )}
        </section>
    )
}