const postServicio = async (imagenes, storedValue, nombreServicio, direccion, telefono, horaInicio, minutoInicio, horaCierre, minutoCierre, rubro, descripcion) => {
    try {
        const formData = new FormData();

        // Adjuntar imágenes si están presentes
        if (imagenes && imagenes.length > 0) {
            imagenes.forEach((imagen, index) => {
                formData.append('imagenes', {
                    uri: imagen.uri,
                    name: `imagen${index}.jpg`,
                    type: 'image/jpeg',
                });
            });
        }

        // Adjuntar otros datos
        formData.append("storedValue", storedValue);
        formData.append("nombreServicio", nombreServicio);
        formData.append("direccion", direccion);
        formData.append("telefono", telefono);
        formData.append("horaInicio", `${horaInicio}:${minutoInicio}`);
        formData.append("horaCierre", `${horaCierre}:${minutoCierre}`);
        formData.append("rubro", rubro);
        formData.append("descripcion", descripcion);

        const requestOptions = {
            method: 'POST',
            body: formData,
            headers: {
                // No establecer 'Content-Type' aquí, dejar que el navegador lo haga automáticamente
            },
        };

        // Enviar la solicitud
        const response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/servicios/post", requestOptions);

        if (!response.ok) {
            let errorText = await response.text();
            try {
                const errorJson = JSON.parse(errorText);
                console.error('Error en la respuesta del servidor:', errorJson);
                throw new Error(errorJson.message || 'Error en la creación del servicio');
            } catch (e) {
                console.error('Error en la respuesta del servidor:', errorText);
                throw new Error('Error en la creación del servicio');
            }
        }

        const result = await response.json();
        console.log('Servicio creado:', result);
        return result.idServicio;
    } catch (error) {
        console.error('Error en postServicio:', error);
        throw error;
    }
};

export default postServicio;
