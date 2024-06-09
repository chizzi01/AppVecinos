const generarClave = async(documento, password) => {
 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    var raw = JSON.stringify({
        "documento": documento,
        "password": password
      });
 
 
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode:'cors'
      };
     
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/userVecino/generarClave", requestOptions);
      if (response.status === 201) {
        return true
      }else {
        return false
      }
}
export default generarClave;