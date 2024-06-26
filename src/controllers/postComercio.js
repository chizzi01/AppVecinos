const postComercio = async (imagenes, documentoVecino, nombreComercio, descripcion, direccion, contacto) => {
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
        formData.append("documentoVecino", documentoVecino);
        formData.append("nombreComercio", nombreComercio);
        formData.append("descripcion", descripcion);
        formData.append("direccion", direccion);
        formData.append("contacto", contacto);
  
  
        var myHeaders = new Headers();
        
  
  
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
            mode: 'cors'
        };
  

        // Enviar la solicitud
        let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/comercios/post", requestOptions);
        let result = await response.json();
        
        console.log("imagenes2",imagenes);

        if (response.ok) {
            console.log('Comercio creado:', result);
            return result.idComercio;
        } else {
            console.error('Error en la respuesta del servidor:', result);
            throw new Error(result.message || 'Error en la creación del comercio');
        }
    } catch (error) {
        console.error('Error en postComercio:', error);
        throw error;
    }
};

export default postComercio;