import { useEffect, useState } from "react";
import { Global } from "../../../../../Helpers/Global";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Tags = ({ form, listTags = null }) => {
    const [tags, setTags] = useState([]);
    const [list, setList] = useState(form.list || []);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const response = await fetch(Global.url + "tag", {
            method: "GET",
        });

        const data = await response.json();

        if (data.status === "success") {
            setTags(data.tags);
            if (listTags) {
                setList(listTags)
            }
        }
    };

    const toggleTag = (id) => {
        const updatedList = list.some((item) => item.id === id)
            ? list.filter((item) => item.id !== id)
            : [...list, { id }];

        setList(updatedList);
        form.list = updatedList;
    };

    return (
        <div className="p-2 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h3 className=" text-gray-800">Selecciona Tags</h3>
                <Link to={'/dashboard/tags/true'} className="px-2 rounded-md border border-primary-100 hover:shadow transition-shadow duration-[.25s]">Nueva</Link>
            </div>

            {tags.length > 0 ? (
                <div className="flex items-center flex-wrap gap-4">
                    {tags.map((tag) => (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => toggleTag(tag.id)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition 
                ${list.some((item) => item.id === tag.id)
                                    ? "bg-accent-100 text-accent-900 border border-transparent hover:bg-accent-200 transition-colors duration-[.25s]"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            # {tag.name}
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No hay tags disponibles.</p>
            )}
        </div>
    );
};

Tags.propTypes = {
    form: PropTypes.shape({
        list: PropTypes.array, // Debe ser un array de objetos
    }).isRequired,
    listTags: PropTypes.array
};
