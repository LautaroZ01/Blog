import { MdEmail, MdPermPhoneMsg, MdLocationPin, MdFacebook } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { Button } from "../UI/Utils/Button";
import { useForm } from "../../Hooks/useForm";
import { Global } from "../../Helpers/Global";
import { useState } from "react";
import { BsFillSendCheckFill } from "react-icons/bs";

export const Contact = () => {
    const [send, setSend] = useState(false)
    const { form, changed, setForm } = useForm()

    const sendEmail = async (e) => {
        e.preventDefault()

        const text = `
        <h2> Hola Lautaro </h2>
        <p> ${form.name} quiere hablar contigo </p>
        <p> Puedes enviarle un correo por aqui ${form.email} </p>
        <h4> Aqui esta su mensaje </h4>
        <p> ${form.content} </p>
        `

        const response = await fetch(Global.url + 'user/send-email', {
            method: 'POST',
            body: JSON.stringify({ subject: form.subject, text }),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()

        if (data.status == 'success') {
            setForm({})
            setSend(true)
            setTimeout(() => {
                setSend(false)
            }, 1500)
        }
    }

    return (
        <section className="relative py-4" id="contact">
            <div className="absolute bottom-0 w-full min-h-[40%] fondo-contact -z-10"></div>
            <div className="w-full max-w-[80%] m-auto py-10 md:px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold text-2xl text-accent-500">Contactame</h2>
                    <p className="p-text text-balance text-base text-text-400">
                        ¡Gracias por visitar mi blog! Si tienes preguntas, ideas o deseas compartir tus pensamientos no dudes en comunicarte conmigo, ¡me encantaría saber de ti! Este es un espacio para explorar temas intrigantes y debatir perspectivas únicas. No dudes en escribirme, ya sea para colaborar, profundizar en algún tema o simplemente compartir tu opinión.
                    </p>
                    <div className="flex flex-col gap-6 border-b border-primary-100 py-2 lg:py-4">
                        <div className="flex items-center gap-4">
                            <MdEmail className="w-10 h-10 bg-accent-100 rounded-full p-2 text-accent-900" />
                            <div className="text-sm">
                                <strong>Correo electronico</strong>
                                <p className="text-text-500">lautarozule80@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <MdPermPhoneMsg className="w-10 h-10 bg-accent-100 rounded-full p-2 text-accent-900" />
                            <div className="text-sm">
                                <strong>Telefono</strong>
                                <p className="text-text-500">+54 <span>123 4 678901</span></p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <MdLocationPin className="w-10 h-10 bg-accent-100 rounded-full p-2 text-accent-900" />
                            <div className="text-sm">
                                <strong>Ubicacion</strong>
                                <p className="text-text-500">Cachi, Salta, Argentina</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="font-bold text-lg ">Sigueme</h4>
                        <div className="flex items-center gap-6">
                            <a href="https://facebook.com" target="_blank">
                                <MdFacebook className="w-10 h-10 bg-accent-100 rounded-full p-2 text-accent-900" />
                            </a>
                            <a href="https://instagram.com" target="_blank">
                                <IoLogoInstagram className="w-10 h-10 bg-accent-100 rounded-full p-2 text-accent-900" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 justify-between bg-white rounded-md shadow-2xl w-full md:max-w-[620px] mx-auto">
                    <h2 className="font-bold text-2xl p-4 bg-primary-500 rounded-t-md text-center text-white">Escribe algo</h2>
                    <form onSubmit={sendEmail} className="flex-1 flex flex-col gap-4 px-2 md:px-10 py-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="name">Asunto</label>
                                <input
                                    type="text"
                                    className="p-2 border-b border-primary-500 focus:outline-none"
                                    name="subject"
                                    id="subject"
                                    required
                                    onChange={changed}
                                    value={form.subject || ''}
                                    placeholder="Escribe el asunto" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    className="p-2 border-b border-primary-500 focus:outline-none"
                                    name="name"
                                    id="name"
                                    required
                                    onChange={changed}
                                    value={form.name || ''}
                                    placeholder="Escribe tu nombre" />
                            </div>
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="email">Correo electronico</label>
                            <input
                                type="email"
                                className="p-2 border-b border-primary-500 focus:outline-none"
                                name="email"
                                id="email"
                                required
                                onChange={changed}
                                value={form.email || ''}
                                placeholder="ejemplo@gmail.com" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="content"></label>
                            <textarea
                                name="content"
                                id="content"
                                cols="30"
                                rows="10"
                                className="w-full p-2 border-b border-primary-500 focus:outline-none"
                                placeholder="Escribe tu mensaje"
                                required
                                value={form.content || ''}
                                onChange={changed} />
                        </div>
                        <Button isButton={true} extraClass="w-full" >Enviar</Button>
                    </form>
                </div>
            </div>
            {send &&
                <div className="px-6 py-4 rounded-md bg-primary-100 text-primary-900 fixed bottom-10 right-10 flex items-center gap-2 item-animation">
                    <BsFillSendCheckFill />
                    <p>El mensaje fue enviado con exito !</p>
                </div>
            }
        </section>
    )
}
