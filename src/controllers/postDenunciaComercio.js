const postDenunciaComercio = async (archivos, documentoVecino, idSitio, descripcion, aceptaResponsabilidad, nombre, direccion, ubicacionHecho) => {
    try {
        const formData = new FormData();
        archivos.forEach((archivo, index) => {
            // Determinar el tipo de archivo basado en el MIME type o alguna otra propiedad
            const esImagen = archivo.type.startsWith('image/');
            const nombreArchivo = esImagen ? `imagen${index}.jpg` : archivo.name || `archivo${index}`;
            const tipoArchivo = esImagen ? 'image/jpeg' : archivo.tipoMIME || 'application/octet-stream';

            // Añadir archivo
            formData.append('archivos', {
                uri: archivo.uri,
                name: nombreArchivo,
                type: tipoArchivo,
            });
        });

        formData.append('documentoVecino', documentoVecino);
        formData.append('idSitio', idSitio);
        formData.append('descripcion', descripcion);
        formData.append('aceptaResponsabilidad', aceptaResponsabilidad);
        formData.append('nombre', nombre);
        formData.append('direccion', direccion);
        formData.append('ubicacionHecho', ubicacionHecho);
  
        var myHeaders = new Headers();
        
  
  
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
            mode: 'cors'
        };
  
        let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/denuncias/post", requestOptions);
        console.log(response);
        return response;
    } catch (error) {
        console.log("error");
        console.log(error);    
    }
  }
  
  export default postDenunciaComercio;
  