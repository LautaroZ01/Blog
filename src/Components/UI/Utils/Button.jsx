import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Button = ({
  children = "",
  path = "/",
  isButton = false,
  type = 1,
  active = false,
  onClick = null,
  extraClass = "",
}) => {
  // Clases base comunes para ambos (Link o Button)
  const baseClasses =
    "py-2 px-4 rounded-md transition-all duration-[.25s] flex items-center justify-center gap-2 border";

  // Estilos por tipo
  const types = {
    1: "border-transparent shadow-md bg-primary-500 text-white hover:border-primary-500 hover:bg-transparent hover:text-black",
    2: "border-primary-500 text-primary-800 shadow-inner hover:border-transparent hover:bg-primary-500 hover:text-white",
    3: "border-transparent hover:bg-primary-500 hover:text-white",
  };

  // Estilos adicionales si el componente es un link activo
  const activeClasses = active
    ? "border-transparent bg-primary-500 text-white hover:border-primary-500 hover:bg-transparent hover:text-black"
    : "border-primary-500 hover:bg-primary-500 hover:text-black";

  // Clases combinadas
  const combinedClasses = `${baseClasses} ${types[type]} ${
    isButton ? "" : activeClasses
  } ${extraClass}`;

  return isButton ? (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  ) : (
    <Link to={path} className={combinedClasses}>
      {children}
    </Link>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string,
  isButton: PropTypes.bool,
  type: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  extraClass: PropTypes.string,
};
