import { FaUserAlt } from "react-icons/fa"
import { Avatar } from "../User/Avatar"

export const MiniAuthor = ({ name, photo, description = '' }) => {
    return (
        <article className='flex gap-2 items-center rounded-md shadow-md bg-accent-100 p-2 hover:bg-accent-200 transition-all duration-250'>
            <div className='w-8 h-8 rounded-full'>
                <Avatar photo={photo} alt={name} size={'8'} />
            </div>
            <div className='flex flex-col text-accent-900 min-w-20'>
                <small className='font-bold'>{name}</small>
                <small className=''>{description}</small>
            </div>
        </article>
    )
}
