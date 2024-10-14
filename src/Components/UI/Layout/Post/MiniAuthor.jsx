import { FaUserAlt } from "react-icons/fa"

export const MiniAuthor = ({ name, photo, description = '' }) => {
    return (
        <article className='flex gap-2 items-center rounded-md shadow-md bg-accent-100 p-2 hover:bg-accent-200 transition-all duration-250'>
            <div className='w-8 h-8 rounded-full'>
                {photo !== 'https://user.svg' && photo !== null ? (
                    <img src={photo} alt={name} className="w-8 h-8 rounded-full" />
                ) : (
                    <FaUserAlt className="w-8 h-8 rounded-full" />
                )}
            </div>
            <div className='flex flex-col text-accent-900'>
                <small className='font-bold'>{name}</small>
                <small className=''>{description}</small>
            </div>
        </article>
    )
}
