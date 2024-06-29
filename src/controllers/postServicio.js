const postServicios = async (imagenes, token, tituloServicio, direccion, telefono, horaInicio, minutoInicio, horaCierre, minutoCierre, rubro, descripcion) => {
    
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
        formData.append("tituloServicio", tituloServicio);
        formData.append("direccion", direccion);
        formData.append("telefono", telefono);
        formData.append("horaApertura", horaInicio);
        formData.append("minutoApertura", minutoInicio);
        formData.append("horaCierre", horaCierre);
        formData.append("minutoCierre", minutoCierre);
        formData.append("rubro", rubro);
        formData.append("descripcion", descripcion);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);


        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
            mode: 'cors',
            headers: myHeaders,
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
