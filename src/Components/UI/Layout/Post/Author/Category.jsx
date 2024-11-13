import { useEffect, useState } from "react";
import { Global } from "../../../../../Helpers/Global";

export const Category = ({ changed, name = null }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const response = await fetch(Global.url + 'post/categories', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            setCategories(data.categories);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="id_category">Categoría</label>
            <select
                name="id_category"
                id="id_category"
                onChange={changed}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition"
            >
                <option value="" disabled selected className="text-gray-400">
                    Seleccione una categoría
                </option>
                {categories && categories.map(category => (

                    name && category.name === name ?
                        <option key={category.id} value={category.id} selected>
                            {category.name}
                        </option>
                        :
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>

                ))}
            </select>
        </div >
    );
};
