const apiKey = '811d7f21-5769-4d4f-bbf6-4adf57f19819';

export async function Query_api(queryUrl) {
    try {
        const respuesta = await fetch(queryUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!respuesta.ok) {
            throw new Error('Hubo un problema al conectar con la red ' + respuesta.statusText);
        }

        const datos =  respuesta.json();
        return datos;
    } catch (error) {
        console.error('Ha habido un problema con tu operación fetch:', error);
        throw error;
    }
}




