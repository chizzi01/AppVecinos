const getNotificacionesInspector = async(legajo) => {
    try {
        console.log("legajoo", legajo)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            mode:'cors'
        };
        
        let response = await fetch (`https://municipio-g8-servidor-production-dcd2.up.railway.app/api/notificaciones/inspector/${legajo}`, requestOptions);
        let jsonData = await response.json();
        console.log(jsonData.notificaciones)
        return(jsonData.notificaciones);
    } catch (error) {
        console.log(error)
    }
    
}
export default getNotificacionesInspector;