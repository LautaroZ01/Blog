import { Button } from "./UI/Utils/Button"


export const NotFound = () => {
    return (
        <section className="h-screen bg-primary-200 grid place-content-center gap-2">
            <h1>Error 404 not found :(</h1>
            <Button>Volver al inicio</Button>
        </section>
    )
}
