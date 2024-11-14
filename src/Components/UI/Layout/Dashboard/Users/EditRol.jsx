import { useEffect, useState } from "react";
import { Global } from "../../../../../Helpers/Global";
import { Button } from "../../../Utils/Button";
import { useForm } from "../../../../../Hooks/useForm";
import useAuth from "../../../../../Hooks/useAuth";

export const EditRol = ({ id = 0, toggleEdit = null, getUsers = null }) => {
    const [roles, setRoles] = useState([]);
    const { form, changed } = useForm();
    const {auth, setAuth} = useAuth();

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        const response = await fetch(Global.url + 'rol', {
            method: 'GET',
            credentials: 'include'
        });

        const fetchData = await response.json();

        if (fetchData.status == 'success') {
            setRoles(fetchData.roles);
            
        }
    };

    const editRole = async (e) => {
        e.preventDefault();

        form.id_user = id;

        const response = await fetch(Global.url + 'user/rol', {
            method: 'PATCH',
            body: JSON.stringify(form),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            getUsers()
            if(auth.id == id){
                setAuth((prevAuth) => ({ ...prevAuth, rol: data.rol.name }));
            }
        }
        toggleEdit(id);
    };

    return (
        <form className="flex items-center gap-2" onSubmit={editRole}>
            <select name="id_rol"
                id="id_rol"
                onChange={changed}
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition"
            >
                <option defaultValue="" disabled selected className="text-gray-400">
                    Seleccione un rol
                </option>
                {roles && roles.map(rol => (
                    <option key={rol.id} value={rol.id} >
                        {rol.name}
                    </option>
                ))}
            </select>

            <Button isButton={true}>Enviar</Button>
        </form>
    );
};
