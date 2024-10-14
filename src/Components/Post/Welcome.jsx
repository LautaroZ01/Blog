import portada from '/Resources/Portada.png'
import { Button } from '../UI/Utils/Button'
import { Badge } from '../UI/Utils/Badge'
import { IoLogoInstagram } from "react-icons/io5";
import { BiLogoGmail } from "react-icons/bi";
import { FaFacebookSquare } from "react-icons/fa";

export const Welcome = () => {
    return (
        <main>
            <section className='grid place-items-center gap-8 max-w-[80%] m-auto py-10 px-2'>
                <div className=''>
                    <img src={portada} alt="Portada" className='w-96 h-96 rounded-full object-cover' />
                </div>
                <div className='flex flex-col gap-4 items-center'>
                    <h1 className='text-3xl font-bold text-accent-500'>Alienígenas ancestrales</h1>
                    <p className='text-balance max-w-[45em] text-center text-text-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores sunt fuga impedit aut eius minus optio inventore beatae provident. In accusamus, perferendis iste impedit quos officiis explicabo voluptas corrupti autem.</p>
                </div>
                <div className='flex flex-wrap gap-2 items-center justify-center md:justify-between'>
                    <Badge isButton={false} type={2}>
                        <IoLogoInstagram />
                        pepitodetucasa
                    </Badge>
                    <Badge isButton={false} type={2}>
                        <BiLogoGmail />
                        pepito@gmail.com
                    </Badge>
                    <Badge isButton={false} type={2}>
                        <FaFacebookSquare />
                        pepitored
                    </Badge>
                </div>
                <div className='flex gap-4'>
                    <Button>Ver articulos</Button>
                    <Button type={2}>Contactar</Button>
                </div>
            </section>
        </main>
    )
}
