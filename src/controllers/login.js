const getLogin = async(setLogin) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode:'cors'
      };
      
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/login/getLogin", requestOptions);
      let jsonData = await response.json();
      console.log(jsonData)
      setLogin(jsonData);
      //hjolahghg
}
export default getLogin;