import { useEffect, useState } from "react"
import { Global } from "../../../../../Helpers/Global"

export const States = ({ changed }) => {
    const [states, setStates] = useState([])

    useEffect(() => {
        getStates()
    }, [])

    const getStates = async () => {
        const response = await fetch(Global.url + 'post/estados', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await response.json();

        if (data.status == 'success') {
            setStates(data.states)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="id_state">Estado del articulo</label>
            <select
                name="id_state"
                id="id_state"
                onChange={changed}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition"
            >
                <option value='' disabled selected className="text-gray-400">
                    Seleccione un estado
                </option>
                {states &&
                    states.map(state => (
                        <option key={state.id} value={state.id}>
                            {state.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}
