export class ServerPing {
    static CheckNetworkConnection(onSuccess,onError){
        $.ajax({
            url: 'http://localhost:8080/message',
            timeout:3000,
            success: () => {
                console.log("Hay conexion: entra en success")
                setTimeout(()=>this.CheckNetworkConnection(onSuccess,onError),1000);
                onSuccess();
            },
            error:  (XMLHttpRequest, textStatus,errorThrown)=>{
                console.log("NO hay conexion: entra en error")
                console.log("XMLHttpRequest: " +XMLHttpRequest)
                console.log("textStatus: " +textStatus)
                console.log("errorThrown: " +errorThrown)
                onError();
                setTimeout(()=>this.CheckNetworkConnection(onSuccess,onError),1000);
                // this.checkIfOnline();
                // setTimeout(()=>this.getLastMessages(),1000);
            }

        })
    }
}