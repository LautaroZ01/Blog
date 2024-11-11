export const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="p-6 text-center bg-primary-500 text-white">
            © {year} | Todos los derchos reservados | Lautaro Zuleta
        </footer>
    )
}
