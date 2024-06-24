const postReclamo = async (imagen, instalacion, desperfecto, descripcion, rubro, direccion) => {
    try {
        const formdata = new FormData();
        if (imagen) {
          formdata.append('imagenes', {
              uri: imagen,
              name: 'reclamo_image.jpg',
              type: 'image/jpeg'
          });
      }
        formdata.append("instalacion", instalacion);
        formdata.append("desperfecto", desperfecto);
        formdata.append("descripcion", descripcion);
        formdata.append("rubro", rubro);
        formdata.append("direccion", direccion);

  
        var myHeaders = new Headers();
        
  
  
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            mode: 'cors'
        };
  
        let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/reclamos/post", requestOptions);
        console.log(response);
        return response;
    } catch (error) {
        console.log("error");
        console.log(error);    
    }
  }
  
  export default postReclamo;
  