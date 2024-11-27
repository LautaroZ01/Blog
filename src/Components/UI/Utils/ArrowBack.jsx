import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export const ArrowBack = () => {
    const navigate = useNavigate();

    return (
        <button type='button' onClick={() => navigate(-1)} className="p-2 rounded-full bg-text-100 hover:bg-text-300 transition-colors duration-[.25s]">
            <IoIosArrowBack />
        </button>
    )
}
