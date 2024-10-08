const addError = (error) =>{
    const errors = []
    // Si el error es un string, lo agregamos directamente
    if (typeof error === 'string') {
        errors.push(error)
    }
    // Si el error es una lista, lo agregamos a la lista de errores actual
    else if (Array.isArray(error)) {
        error.map((err) => {
            errors.push(err.message)
        })
    }
    return errors
}

export {
    addError
}