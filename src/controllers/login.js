const login = async(documento, contrasena) => {

    var raw = JSON.stringify({
      "documento": documento,
      "password": contrasena
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode:'cors'
      };
    
      
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/userVecino/login", requestOptions);
      let data = await response.json()
      console.log(data)
      return {status: response.status, data: data}
      //hjolahghg
}
export default login;