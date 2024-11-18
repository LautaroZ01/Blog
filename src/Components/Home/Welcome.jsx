import portada from '/Resources/Portada.png'
import { Button } from '../UI/Utils/Button'
import { Badge } from '../UI/Utils/Badge'
import { IoLogoInstagram } from "react-icons/io5";
import { BiLogoGmail } from "react-icons/bi";
import { FaFacebookSquare } from "react-icons/fa";

export const Welcome = () => {
    return (
        <main className='p-2 mb-10'>
            <section className='grid place-items-center gap-8 max-w-[80%] m-auto px-2'>
                <div className=''>
                    <img src={portada} alt="Portada" className='w-96 h-96 rounded-full object-cover' />
                </div>
                <div className='flex flex-col gap-4 items-center'>
                    <h1 className='text-3xl font-bold text-accent-500'>Alienígenas Anceztrales</h1>
                    <p className='text-balance max-w-[75em] text-center text-text-500'>
                        Desde los enigmas de los alienígenas y los secretos de antiguos pueblos hasta las dinámicas de la política actual y las maravillas de las curaciones naturales. Un espacio para descubrir, aprender y reflexionar sobre los diversos temas que moldean nuestra existencia.
                    </p>
                </div>
                <div className='flex flex-wrap gap-2 items-center justify-center md:justify-between'>
                    <Badge isButton={false} type={2}>
                        <IoLogoInstagram />
                        lautarozuleta
                    </Badge>
                    <Badge isButton={false} type={2}>
                        <BiLogoGmail />
                        lautarozule80@gmail.com
                    </Badge>
                    <Badge isButton={false} type={2}>
                        <FaFacebookSquare />
                        lautaroz
                    </Badge>
                </div>
                <div className='flex gap-4'>
                    <Button path={'/post'}>Ver articulos</Button>
                    <a href='#contact' className='py-2 px-4 rounded-md transition-all duration-[.25s] flex items-center justify-center gap-2 border border-primary-500 text-primary-800 shadow-inner hover:border-transparent hover:bg-primary-500 hover:text-white'>Contactar</a>
                </div>
            </section>
        </main>
    )
}
