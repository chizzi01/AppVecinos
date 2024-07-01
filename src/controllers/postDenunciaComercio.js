const postDenunciaComercio = async (archivos, documentoVecino, idSitio, nombre, direccion, descripcion, aceptaResponsabilidad, token) => {
    try {
        const formData = new FormData();
        archivos.forEach((archivo, index) => {
            console.log("archivos", archivo);
            // Determinar el tipo de archivo basado en el MIME type o alguna otra propiedad
            const esImagen = archivo.tipoMIME && archivo.tipoMIME.startsWith('image/');
            const nombreArchivo = esImagen ? `imagen${index}.jpg` : archivo.name || `archivo${index}`;
            const tipoArchivo = esImagen ? 'image/jpeg' : archivo.tipoMIME || 'application/octet-stream';

            // Añadir archivo
            formData.append('archivos', {
                uri: archivo.assets[0].uri,
                name: nombreArchivo,
                type: tipoArchivo,
            });
            console.log('archivo', archivo.assets[0].uri, nombreArchivo, tipoArchivo);
        });

        formData.append('documentoVecino', documentoVecino);
        formData.append('idSitio', idSitio);
        formData.append('descripcion', descripcion);
        formData.append('aceptaResponsabilidad', aceptaResponsabilidad);
        formData.append('nombre', nombre);
        formData.append('direccion', direccion);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
            mode: 'cors',
            headers: myHeaders
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
