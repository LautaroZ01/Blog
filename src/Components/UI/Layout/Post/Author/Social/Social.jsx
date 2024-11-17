import PropTypes from "prop-types";
import { useState } from "react";
import { AddSocial } from "./AddSocial";
import { LinkSocial } from "./LinkSocial";

import { EditSocial } from "./EditSocial";
import { DeleteSocial } from "./DeleteSocial";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

export const Social = ({ socials, id, getAuthor }) => {
    const [selectedSocial, setSelectedSocial] = useState(null)

    const [newSocial, setNewSocial] = useState(false)
    const [editSocial, setEditSocial] = useState(false)
    const [deleteSocial, setDeleteSocial] = useState(false)

    const handleNewSocial = () => {
        setNewSocial(true);
    }

    const handleEditSocial = (social) => {
        setSelectedSocial(social)
        setEditSocial(true);
    }

    const handleDeleteSocial = (social) => {
        setSelectedSocial(social)
        setDeleteSocial(true);
    }

    const closePopUp = () => {
        setNewSocial(false);
        setEditSocial(false);
        setDeleteSocial(false)
    }

    return (
        <section className="rounded-lg p-4 bg-white">
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Tus redes sociales</h3>
                <button
                    className="flex items-center gap-2 p-2 bg-primary-100 text-primary-900 rounded-md shadow-md border border-transparent hover:bg-transparent hover:border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                    onClick={handleNewSocial}
                >
                    <strong>Agregar</strong>
                    <IoAddCircle />
                </button>
            </div>

            {/* Redes sociales */}
            {socials.length > 0 ? (
                socials.map((social) => (
                    <article
                        key={social.id}
                        className="flex items-center justify-between p-2 gap-4 rounded-lg mb-4 shadow-sm transition hover:shadow-md"
                    >
                        <LinkSocial social={social} />

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleEditSocial(social)}
                                className="p-2 bg-primary-100 text-primary-900 rounded-lg hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-700 transition"
                            >
                                <MdModeEdit />
                            </button>

                            <button
                                onClick={() => handleDeleteSocial(social)}
                                className="p-2 bg-red-100 text-red-900 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                            >
                                <MdDelete />
                            </button>
                        </div>
                    </article>
                ))
            ) : (
                <p className="text-gray-600 text-center">No tienes redes sociales configuradas.</p>
            )}

            {/* Modales */}
            {newSocial && (
                <AddSocial id={id} getAuthor={getAuthor} onClose={closePopUp} />
            )}
            {editSocial && selectedSocial && (
                <EditSocial social={selectedSocial} onClose={closePopUp} getAuthor={getAuthor} />
            )}
            {deleteSocial && selectedSocial && (
                <DeleteSocial social={selectedSocial} onClose={closePopUp} getAuthor={getAuthor} />
            )}
        </section>

    )
}

Social.propTypes = {
    socials: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    getAuthor: PropTypes.func.isRequired
};