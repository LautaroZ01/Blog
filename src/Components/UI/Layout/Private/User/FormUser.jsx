import { useEffect, useState } from "react";
import { useForm } from "../../../../../Hooks/useForm";
import { Global } from "../../../../../Helpers/Global";
import useAuth from "../../../../../Hooks/useAuth";


export const FormUser = ({ user = {}, setUser = null, isEdit = false, setIsEdit = null }) => {
    const { form, changed } = useForm({});
    const [error, setError] = useState('')
    const { setAuth } = useAuth()

    const [isEnable, setIsEnable] = useState(false); // El botón comienza deshabilitado
    const [isFormChanged, setIsFormChanged] = useState(false); // Nuevo estado para verificar cambios en el formulario

    useEffect(() => {
        // Verifica si ha habido cambios en el formulario
        if (Object.keys(form).length !== 0) {
            setIsFormChanged(true);
        } else {
            setIsFormChanged(false);
        }
    }, [form]);

    useEffect(() => {
        // Habilita el botón solo si hay cambios y está en modo edición
        setIsEnable(isFormChanged && isEdit);
    }, [isFormChanged, isEdit]);

    const editUser = async (e) => {
        e.preventDefault();

        let userEdited = form;

        const request = await fetch(Global.url + 'user/edit', {
            method: "PATCH",
            body: JSON.stringify(userEdited),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await request.json()

        if (data.status == 'success') {
            setIsEdit(!isEdit)
            setUser(data.user)
            setAuth(data.user)
            setError('')
        } else {
            setError(data.error)
        }
    }
    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-[800px]" onSubmit={editUser}>
            <div className="flex flex-col gap-2">
                <strong className="text-gray-400">
                    Nombre
                </strong>
                {isEdit ?
                    <input onChange={changed} name="username" className="bg-transparent p-2 rounded-md focus:outline-gray-300" type="text" defaultValue={user.username} />
                    :
                    <p className="bg-transparent p-2 rounded-md">
                        {user.username}
                    </p>
                }
            </div>
            <div className="flex flex-col gap-2">
                <strong className="text-gray-400">
                    Apellido
                </strong>
                {isEdit ?
                    <input onChange={changed} name="surname" className="bg-transparent p-2 rounded-md focus:outline-gray-300" type="text" defaultValue={user.surname} />

                    :
                    <p className="bg-transparent p-2 rounded-md">
                        {user.surname}
                    </p>
                }
            </div>
            <div className="flex flex-col gap-2">
                <strong className="text-gray-400">
                    Direccion de correo electronico
                </strong>

                <p className="bg-transparent p-2 rounded-md">
                    {user.email}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <strong className="text-gray-400">
                    Fecha de nacimiento
                </strong>
                {isEdit ?
                    <input onChange={changed} name="birthdate" className="bg-transparent p-2 rounded-md focus:outline-gray-300" type="date" defaultValue={user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : ''} />
                    :
                    <p className="bg-transparent p-2 rounded-md">
                        {user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : ''}
                    </p>
                }
            </div>
            <div className="flex flex-col gap-2">
                <strong className="text-gray-400">Ubicación</strong>
                {isEdit ?
                    <select
                        name="address"
                        id="country"
                        className="bg-transparent p-2 rounded-md focus:outline-gray-300"
                        onChange={changed}
                        defaultValue={user.address || ''}
                    >
                        <option value="">Añade tu país</option>
                        <option value="argentina">Argentina</option>
                        <option value="brasil">Brasil</option>
                        <option value="colombia">Colombia</option>
                        <option value="españa">España</option>
                        <option value={user.address}>{user.address}</option>
                    </select>
                    :
                    <p className="bg-transparent p-2 rounded-md capitalize">
                        {user.address || ''}
                    </p>
                }
            </div>
            {error &&
                <div className="col-span-2 p-2 bg-red-500/10 text-red-500 rounded-md font-bold text-center">
                    {error}
                </div>
            }
            {isEdit &&
                <button
                    disabled={!isEnable}
                    className={`col-span-2 p-2 px-4 menu-nav flex items-center justify-center gap-2 shadow-md rounded-md transition-all duration-[.25s] border border-transparent  ${!isEnable ? ' text-gray-400' : 'bg-primary-500 text-white hover:bg-transparent hover:border-primary-200 hover:text-black'
                        }`}
                >
                    Guardar cambios
                </button>
            }
        </form>
    )
}
