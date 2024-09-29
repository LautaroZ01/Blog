import { Buttom } from "../../Utils/Buttom"

export const Nav = () => {

    return (
        <nav>
            <ul className="flex flex-1 items-center justify-center gap-3 p-2">
                <li>
                    <Buttom path={"/user"} isButton={false} type={2}>Iniciar Sesion</Buttom>
                </li>
                <li>
                    <Buttom path={"/user/registro"} isButton={false} type={1}>Crear una Cuanta</Buttom>
                </li>
            </ul>
        </nav>
    )
}
