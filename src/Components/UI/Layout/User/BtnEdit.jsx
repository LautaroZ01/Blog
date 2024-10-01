import { MdOutlineEdit } from "react-icons/md";

export const BtnEdit = ({onClick = null}) => {
    return (
        <button onClick={onClick} className="flex items-center justify-center gap-2 text-gray-200 border px-2 py-1 rounded-lg bg-primary-200 border-transparent hover:bg-transparent hover:border-primary-200 hover:text-black transition-all duration-[.25s]">
            Edit
            <MdOutlineEdit />
        </button>
    )
}
