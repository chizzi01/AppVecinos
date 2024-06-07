const login = async(mail, contrasena) => {

    var raw = JSON.stringify({
      "documento": mail,
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
      console.log(response)
      return response
      //hjolahghg
}
export default login;