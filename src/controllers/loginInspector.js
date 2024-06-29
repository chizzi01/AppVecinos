const login = async(legajo, contrasena) => {
  try {
    var raw = JSON.stringify({
      "legajo": parseInt(legajo),
      "password": contrasena
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    
      
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/userInspector/login", requestOptions);
      let data = await response.json()
      return {status: response.status, data: data}
  } catch (error) {
    console.log(error)
  }
}
export default login;