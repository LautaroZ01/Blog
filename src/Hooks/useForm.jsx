import { useState } from 'react'

export const useForm = (initalObj = {}) => {
    const [form, setForm] = useState(initalObj);

    const changed = ({target}) => {
        const {name, value} = target;

        setForm({
            ...form,
            [name]: value
        })
    }

    return {
        form,
        changed
    }
}
