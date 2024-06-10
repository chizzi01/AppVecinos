const recuperarPass = async(documento, correo) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(documento, correo)
    var raw = JSON.stringify({
        "documento": documento.toString(),
        "mail": correo
      });
 
      
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode:'cors'
      };
      console.log(raw)
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/userVecino/recuperarClave", requestOptions);
      console.log(response)
      if (response.status === 302) {
        return true
      }else {
        return false
      }
  } catch (error) {

  }
    
}
export default recuperarPass;