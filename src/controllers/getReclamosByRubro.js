const getReclamosByRubro = async(setReclamos, rubro) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode:'cors'
      };
      
      let response = await fetch(`https://municipio-g8-servidor-production-dcd2.up.railway.app/api/reclamos/getReclamosByRubro/${rubro}`, requestOptions);
      let jsonData = await response.json();
      console.log("reclamossssss",jsonData)
      console.log(response)
      setReclamos(jsonData);
      //hjolahghg
}
export default getReclamosByRubro;