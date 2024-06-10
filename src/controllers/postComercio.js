const postComercio = async (imagen, documentoVecino, nombreComercio, descripcion, direccion, contacto) => {
  try {
      const formdata = new FormData();
      if (imagen) {
        formdata.append('imagenes', {
            uri: imagen,
            name: 'comercio_image.jpg',
            type: 'image/jpeg'
        });
    }
      formdata.append("documentoVecino", documentoVecino);
      formdata.append("nombreComercio", nombreComercio);
      formdata.append("descripcion", descripcion);
      formdata.append("direccion", direccion);
      formdata.append("contacto", contacto);


      var myHeaders = new Headers();
      


      var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
          mode: 'cors'
      };

      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/comercios/post", requestOptions);
      console.log(response);
      return response;
  } catch (error) {
      console.log("error");
      console.log(error);    
  }
}

export default postComercio;
