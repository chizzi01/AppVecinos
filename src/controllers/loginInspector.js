const login = async(legajo, contrasena) => {

    var raw = JSON.stringify({
      "legajo": legajo,
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
    
      
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/userInspector/login", requestOptions);
      let data = await response.json()
      console.log(data)
      return {status: response.status, data: data}
      //hjolahghg
}
export default login;