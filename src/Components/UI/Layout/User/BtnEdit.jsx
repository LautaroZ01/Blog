import { MdOutlineEdit } from "react-icons/md";

export const BtnEdit = ({onClick = null}) => {
    return (
        <button onClick={onClick} className="flex items-center justify-center gap-2 text-primary-900 border px-2 py-1 rounded-lg font-bold bg-primary-100 border-transparent hover:bg-transparent hover:border-primary-200 hover:text-primary-800 transition-all duration-[.25s]">
            Edit
            <MdOutlineEdit />
        </button>
    )
}
