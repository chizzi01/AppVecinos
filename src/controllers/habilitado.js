const habilitado = async(dni) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode:'cors'
      };
      
      let response = await fetch(`https://municipio-g8-servidor-production-dcd2.up.railway.app/api/userVecino/getHabilitado/${dni}`, requestOptions);
      if (response.status === 200) {
        return true
      }else {
        return false
      }
}
export default habilitado;