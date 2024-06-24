const postDenuncia = async (imagen, vecino, direccion,motivo) => {
    try {
        const formdata = new FormData();
        if (imagen) {
          formdata.append('imagenes', {
              uri: imagen,
              name: 'denuncia_image.jpg',
              type: 'image/jpeg'
          });
      }
        formdata.append("vecino", vecino);
        formdata.append("direccion", direccion);
        formdata.append("motivo", motivo);
  
        var myHeaders = new Headers();
        
  
  
        var requestOptions = {
            method: 'POST',
            body: formdata,
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
  
  export default postDenuncia;
  