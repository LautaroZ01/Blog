import PropTypes from "prop-types";

export const Status = ({ state = null }) => {
    let status;

    switch (state) {
        case 'Publico':
            status = 'bg-primary-100 text-primary-900';
            break;
        case 'Borrador':
            status = 'bg-bg-200 text-bg-900';
            break;
        case 'Privado':
            status = 'bg-red-100 text-red-900';
            break;
        default:
            status = 'bg-text-100 text-text-900';
    }

    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status}`}>{state}</span>
    );
};

Status.propTypes = {
    state: PropTypes.string
  };