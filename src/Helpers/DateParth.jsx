export function formatearFecha(fechaStr) {
    // Crear un objeto Date a partir de la cadena en formato YYYY-MM-DD
    const fecha = new Date(fechaStr);

    // Array con los nombres de los meses en español
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Obtener día, mes y año
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    // Formatear la fecha como "19 de Diciembre de 2023"
    return `${dia} de ${mes} de ${año}`;
}