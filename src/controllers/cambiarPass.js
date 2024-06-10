const cambiarPass = async(dni, passactual, passnueva) => {
  console.log(dni, passactual, passnueva)
  var raw = JSON.stringify({
    "documento": dni,
    "contraseniaActual": passactual,
    "contraseniaNueva": passnueva,
  });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode:'cors'
      };
     
      let response = await fetch(`https://municipio-g8-servidor-production-dcd2.up.railway.app/api/userVecino/cambiarClave`, requestOptions);
      console.log(response)
      if (response.status === 200) {
        return true
      }else {
        return false
      }
      
}
export default cambiarPass;