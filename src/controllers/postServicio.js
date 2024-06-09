const postServicios = async(token, titulo, direccion, telefono, horaApertura, minutoApertura, horaCierre, minutoCierre, rubro, descripcion ) => {
 
    const formdata = new FormData();
    // formdata.append("imagenes", fileInput.files[0], "[PROXY]");
    formdata.append("tituloServicio", titulo);
    formdata.append("direccion", direccion);
    formdata.append("telefono", telefono);
    formdata.append("horaApertura", horaApertura);
    formdata.append("minutoApertura", minutoApertura);
    formdata.append("horaCierre", horaCierre);
    formdata.append("minutoCierre", minutoCierre);
    formdata.append("rubro", rubro);
    formdata.append("descripcion", descripcion);
 
 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
 
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
        mode:'cors'
      };
   
     
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/servicios/post", requestOptions);
      console.log(response)
      return response
}
export default postServicios;