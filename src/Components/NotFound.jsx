import { LinkUi } from "./UI/Utils/LinkUi"


export const NotFound = () => {
    return (
        <section className="h-screen bg-primary-200 grid place-content-center gap-2">
            <h1>Error 404 not found :(</h1>
            <LinkUi active={true}>Volver al inicio</LinkUi>
        </section>
    )
}
