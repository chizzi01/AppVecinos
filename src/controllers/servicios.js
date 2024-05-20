const getServicios = async(setServicios) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode:'cors'
      };
      
      let response = await fetch("https://municipio-g8-servidor-production.up.railway.app/api/servicios/getServicios", requestOptions);
      let jsonData = await response.json();
      console.log(jsonData)
      setServicios(jsonData);
      //hjolahghg
}
export default getServicios;