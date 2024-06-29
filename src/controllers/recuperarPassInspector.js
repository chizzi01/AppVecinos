const recuperarPassInspector = async(legajo, correo) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "legajo": parseInt(legajo),
        "mail": correo
      });
 
      
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log(raw)
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/userInspector/recuperarClave", requestOptions);
      console.log(response)
      if (response.status === 302) {
        return true
      }else {
        return false
      }
  } catch (error) {
    console.log(error)
  }
    
}
export default recuperarPassInspector;