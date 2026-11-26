export function registrarEvento(nombre, parametros = {}) {
    const evento = {
        event: nombre,
        ...parametros,
    };

    // Seguimiento local para QA.
    // No se envían datos al Backend ni a servicios externos.
    if (
        import.meta.env.DEV) {
        console.info("[NovaMarket Tracking DEMO]", evento);
    }
}