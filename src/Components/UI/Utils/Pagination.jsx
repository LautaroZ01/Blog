import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import PropTypes from "prop-types";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center mt-6 space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400' : 'text-primary-700 hover:bg-primary-100'} transition-colors`}
            >
                <FiArrowLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                        currentPage === index + 1
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                    }`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400' : 'text-primary-700 hover:bg-primary-100'} transition-colors`}
            >
                <FiArrowRight size={20} />
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };
