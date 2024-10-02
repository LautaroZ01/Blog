import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { useForm } from "../../Hooks/useForm";
import { Global } from "../../Helpers/Global";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

export const Login = () => {
    const { form, changed } = useForm({});

    const navegate = useNavigate();
    const [error, setError] = useState('');

    const { setAuth } = useAuth();

    const googleLogin = () => {
        window.open("http://localhost:3000/api/user/google", "_self");
    }

    const loginUser = async (e) => {
        e.preventDefault();

        let dataUser = form;
        const request = await fetch(Global.url + "user/login", {
            method: "POST",
            body: JSON.stringify(dataUser),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await request.json();
        if (data.status == 'success') {
            setAuth(data.user)
            navegate("/")
        } else {
            setError(data.error)
        }
    }

    return (
        <section className="w-screen md:w-[512px] m-3 md:px-0 shadow-lg rounded-b-md p-2">

            <h1 className="font-bold text-xl bg-primary-200 text-center py-2 md:p-6 text-white rounded-t-md">
                Inicio de sesion
            </h1>

            <form className="p-3 md:p-6 flex flex-col gap-4" onSubmit={loginUser}>
                <div>
                    <label htmlFor="email">Correo electronico</label>
                    <div className="flex items-center justify-center border-b border-primary-200 py-2">
                        <FaUser className="text-gray-500" />
                        <input type="text" name="email" required autoComplete="false" placeholder="Nombre o correo electronico" id="email" className="flex-1 focus:outline-none ml-2 bg-transparent rounded-md" onChange={changed} />
                    </div>
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <div className="flex items-center justify-center border-b border-primary-200 py-2">
                        <FaLock className="text-gray-500" />
                        <input type="password" name="password" required id="password" className="flex-1 focus:outline-none ml-2 bg-transparent rounded-md" onChange={changed} />
                    </div>
                </div>

                <Link className="text-center text-primary-200 mt-4">¿ Olvidaste tu contraseña ?</Link>
                {error != '' && <p className="p-2 text-center bg-red-500/10 text-red-500 rounded-md font-bold text-sm">{error}</p>}
                <button className="bg-primary-200 px-4 py-2 rounded-md text-white  border border-transparent hover:bg-transparent hover:border-primary-200 hover:text-black hover:shadow-md transition-all duration-[.25s]">Iniciar sesion</button>
                <Link to='/user/registro' className="text-center text-primary-200">¿ Aún no tienes una cuenta ?</Link>
            </form>

            <div className="flex flex-col items-center justify-between gap-6 px-3 pb-3 md:px-6 md:pb-6">
                <small className="font-bold">O</small>
                <button onClick={googleLogin} className="flex w-full p-2 items-center justify-center gap-6 rounded-md shadow-md hover:shadow-none transition-all duration-[.25s]">
                    <FcGoogle />
                    <p className="flex-1 text-center">
                        Continuar con Google
                    </p>
                </button>
                <button className="flex w-full p-2 items-center justify-center gap-6 rounded-md shadow-md hover:shadow-none transition-all duration-[.25s]">
                    <FaFacebook className="text-blue-500" />
                    <p className="flex-1 text-center">
                        Continuar con Facebook
                    </p>
                </button>
            </div>

        </section>
    )
}
