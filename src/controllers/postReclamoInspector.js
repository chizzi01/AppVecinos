const postReclamoInspector = async (imagenes, legajoInspector, idSitio, idDesperfecto, descripcion, token) => {
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
        formData.append("legajoInspector", legajoInspector);
        formData.append("idSitio", idSitio);
        formData.append("idDesperfecto", idDesperfecto);
        formData.append("descripcion", descripcion);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
            mode: 'cors',
            headers: myHeaders
        };


        // Enviar la solicitud
        let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/reclamos/post", requestOptions);
        let result = await response.json();
        
        console.log("imagenes2",imagenes);

        if (response.ok) {
            console.log('Reclamo de inspector creado:', result);
            return result.idReclamo;
        } else {
            console.error('Error en la respuesta del servidor:', result);
            throw new Error(result.message || 'Error en la creación del reclamo del inspector');
        }
    } catch (error) {
        console.error('Error en postReclamoInspector:', error);
        throw error;
    }
};

export default postReclamoInspector;