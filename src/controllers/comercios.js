const getComercios = async(setComercios) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode:'cors'
      };
      
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/comercios/getComercios", requestOptions);
      let jsonData = await response.json();
      console.log(jsonData)
      setComercios(jsonData);
      //hjolahghg
}
export default getComercios;