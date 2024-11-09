import { useEffect, useState } from "react"

export const UploadFile = ({getInputProps, getRootProps, isDragActive, file, extraClass = '' }) => {
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            // Limpia el objeto URL cuando el componente se desmonte o el archivo cambie
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [file]);

    return (
        <div
            {...getRootProps()}
            className={`w-full rounded-md cursor-pointer border-dashed border-primary-600 border-2 min-h-96 flex items-center justify-center bg-primary-100 text-primary-900 shadow-inner transition-all duration-200 ${isDragActive ? "border-blue-500" : "border-gray-300"}`}
        >
            <input {...getInputProps()} />
            <div className="w-full flex flex-col items-center">
                {preview ? (
                    <img src={preview} alt="Preview" className={`h-full w-full object-cover ${extraClass}`} />
                ) : (
                    <p>Arrastra una imagen o haz clic para seleccionar</p>
                )}
            </div>

        </div>
    )
}
