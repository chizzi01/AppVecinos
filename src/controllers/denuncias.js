const getDenuncias = async(setDenuncias) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode:'cors'
      };
      
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/denuncias/getDenuncias", requestOptions);
      let jsonData = await response.json();
      console.log(jsonData)
      setDenuncias(jsonData);
      //hjolahghg
}
export default getDenuncias;