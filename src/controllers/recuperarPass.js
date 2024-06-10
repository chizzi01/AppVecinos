const recuperarPass = async(documento, correo) => {
 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    var raw = JSON.stringify({
        "documento": documento,
        "correo": correo
      });
 
 
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode:'cors'
      };
     
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/userVecino/recuperarClave", requestOptions);
      if (response.status === 201) {
        return true
      }else {
        return false
      }
}
export default recuperarPass;