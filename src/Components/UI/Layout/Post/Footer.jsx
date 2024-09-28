export const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="p-6 text-center">
            © {year} | Todos los derchos reservados | Lautaro Zuleta
        </footer>
    )
}
