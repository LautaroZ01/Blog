import { Button } from "../../Utils/Button"

export const Nav = () => {

    return (
        <nav>
            <ul className="flex flex-1 items-center justify-center gap-3 p-2">
                <li>
                    <Button path={"/user"} isButton={false} type={2}>Iniciar Sesion</Button>
                </li>
                <li>
                    <Button path={"/user/registro"} isButton={false} type={1}>Crear una Cuanta</Button>
                </li>
            </ul>
        </nav>
    )
}
