const solicitarClave = async(dni, mail) => {

    var raw = JSON.stringify({
        "documento": dni,
        "mail": mail
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
      
      let response = await fetch("https://municipio-g8-servidor-production-dcd2.up.railway.app/api/userVecino/solicitarClave", requestOptions);
      return response
}
export default solicitarClave;