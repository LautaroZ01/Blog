import PropTypes from "prop-types";

export const Container = ({ children }) => {
    return (
        <section className="bg-bg-100">
            {children}
        </section>
    )
}

Container.propTypes = {
    children: PropTypes.node.isRequired
};
