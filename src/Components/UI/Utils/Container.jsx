export const Container = ({ children, active = true }) => {
    return (
        <section className={active ? 'bg-bg-100' : ''}>
            {children}
        </section>
    )
}
