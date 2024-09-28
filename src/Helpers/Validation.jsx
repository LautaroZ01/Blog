export const validation = (formData = {}) => {
    const newErrors = []


    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.push({message:'El correo no es valido'})
    }

    if (formData.password.length < 6) {
        newErrors.push({message:'La contraseña debe tener al menos 6 caracteres'});
    }

    if (formData.password !== formData.confirmPassword) {
        newErrors.push({message:'Las contraseñas no coinciden'});
    }

    return newErrors
}