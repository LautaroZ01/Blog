import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { MdOutlineCalendarToday } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm } from "../../Hooks/useForm";
import { Global } from "../../Helpers/Global";
import { validation } from "../../Helpers/Validation";
import { useState } from "react";

export const Register = () => {
    const [error, setError] = useState([]);
    const [error2, setError2] = useState('');
    const navegate = useNavigate()
    const { form, changed } = useForm({});

    const saveUser = async (e) => {
        e.preventDefault();
        setError([])
        setError2('')

        let newUser = form;
        let validationFrom = validation(newUser)

        if (validationFrom.length === 0) {

            const request = await fetch(Global.url + "user/registro", {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await request.json();

            if (data.status == 'success') {
                navegate('/user')
            } else {
                if (Array.isArray(data.error)) {
                    setError(data.error)
                } else {
                    setError2(data.error)
                }
            }

            console.log(data)
        } else {
            setError(validationFrom)
        }


    }

    return (
        <section className="w-screen md:w-[512px] lg:w-[640px] shadow-lg rounded-b-md md:mt-4 m-6 p-2">

            <h1 className="font-bold text-xl bg-primary-200 text-center p-2 md:py-6 text-white rounded-t-md">
                Crear una cuenta
            </h1>

            <form className="p-3 md:p-6 flex flex-col gap-2" onSubmit={saveUser}>
                <div className="flex flex-col w-full md:flex-row md:gap-2 items-center">
                    <div className="w-full flex-1">
                        <label htmlFor="name">Nombre</label>
                        <div className="flex items-center justify-center border-b border-primary-200 py-2">
                            <FaUser className="text-gray-500" />
                            <input type="text" required name="username" autoComplete="false" placeholder="Nombre de usuario" id="name" className="flex-1 focus:outline-none ml-2 bg-transparent" onChange={changed} />
                        </div>
                    </div>

                    <div className="w-full flex-1">
                        <label htmlFor="surname">Apellido</label>
                        <div className="flex items-center justify-center border-b border-primary-200 py-2">
                            <input type="text" required name="surname" autoComplete="false" id="surname" className="flex-1 focus:outline-none ml-2 bg-transparent" onChange={changed} />
                        </div>
                    </div>
                </div>

                <label htmlFor="email">Correo electronico</label>
                <div className="flex items-center justify-center border-b border-primary-200 py-2">
                    <MdEmail className="text-gray-500" />
                    <input type="email" required name="email" autoComplete="false" placeholder="ejemplo@gmail.com" id="email" className="flex-1 focus:outline-none ml-4 bg-transparent" onChange={changed} />
                </div>

                <label htmlFor="password">Contraseña</label>
                <div className="flex items-center justify-center border-b border-primary-200 py-2">
                    <FaLock className="text-gray-500" />
                    <input type="password" required name="password" id="password" className="flex-1 focus:outline-none ml-2 bg-transparent" onChange={changed} />
                </div>
                <label htmlFor="confirmPassword">Confirme constraseña</label>
                <div className="flex items-center justify-center border-b border-primary-200 py-2">
                    <RiLockPasswordLine className="text-gray-500" />
                    <input type="password" required name="confirmPassword" id="confirmPassword" className="flex-1 focus:outline-none ml-2 bg-transparent" onChange={changed} />
                </div>

                <div className="flex flex-col items-center md:flex-row md:gap-3">
                    <div className="w-full flex-1">
                        <label htmlFor="birthdate">Fecha de nacimiento</label>
                        <div className="flex items-center justify-center border-b border-primary-200 py-2">
                            <MdOutlineCalendarToday className="text-gray-500" />
                            <input type="date" name="birthdate" id="birthdate" className="flex-1 focus:outline-none ml-2 bg-transparent" onChange={changed} />
                        </div>
                    </div>

                    <div className="w-full flex-1">
                        <label htmlFor="country">País</label>
                        <div className="flex items-center justify-center border-b border-primary-200 py-2">
                            <FaUser className="text-gray-500" />
                            <select name="address" id="country" className="w-full bg-transparent ml-4 focus:outline-none" onChange={changed}>
                                <option value="">Seleccione un pais</option>
                                <option value="argentina">Argentina</option>
                                <option value="brasil">Brasil</option>
                                <option value="colombia">Colombia</option>
                                <option value="españa">España</option>
                            </select>
                        </div>
                    </div>
                </div>

                {error.length !== 0 || error2 !== '' &&
                    <ul className="p-2 bg-red-500/10 text-red-500 rounded-md font-bold text-sm">
                        {error.length !== 0 && error.map((err, index) => (
                            <li key={index} className="mb-2 list-disc list-inside">{err.message}</li>
                        ))}
                        {error2 !== '' && <li className="mb-2 list-disc list-inside">{error2}</li>}
                    </ul>
                }

                <button className="bg-primary-200 px-4 py-2 rounded-md text-white mt-4 border border-transparent hover:bg-transparent hover:border-primary-200 hover:text-black hover:shadow-md transition-all duration-[.25s]">Registrarse</button>
                <Link to='/user' className="text-center text-primary-200">¿ Ya tienes una cuenta ?</Link>
            </form>
        </section>
    )
}
