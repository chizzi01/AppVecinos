const postReclamoVecino = async (imagenes, documentoVecino, idSitio, idDesperfecto, descripcion) => {
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
    

        // Adjuntar otros campos
        console.log("imagenes",imagenes);
        console.log("documentoVecino",documentoVecino);
        console.log("idSitio",idSitio);
        console.log("idDesperfecto",idDesperfecto);
        console.log("descripcion",descripcion);
        formData.append("documentoVecino", documentoVecino);
        formData.append("idSitio", idSitio);
        formData.append("idDesperfecto", idDesperfecto);
        formData.append("descripcion", descripcion);

        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
            mode: 'cors'
        };

        // Enviar la solicitud
        let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/reclamos/post", requestOptions);
        let result = await response.json();
        
        console.log("imagenes2",imagenes);

        if (response.ok) {
            console.log('Reclamo de vecino creado:', result);
            return result.idComercio;
        } else {
            console.error('Error en la respuesta del servidor:', result);
            throw new Error(result.message || 'Error en la creación del reclamo del vecino');
        }
    } catch (error) {
        console.error('Error en postReclamoVecino:', error);
        throw error;
    }
};

export default postReclamoVecino;