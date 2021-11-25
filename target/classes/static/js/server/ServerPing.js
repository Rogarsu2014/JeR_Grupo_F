let connected=false;
export class ServerPing {
    static clientId= '_'+Math.random().toString(36).substr(2,9);
    
    static CheckNetworkConnection(onSuccess,onError){
        $.ajax({
            url: 'http://localhost:8080/ping',
            timeout:3000,
            success: () => {
                // console.log("Hay conexion: entra en success")
                setTimeout(()=>this.CheckNetworkConnection(onSuccess,onError),1000);
                onSuccess();
            },
            error:  (XMLHttpRequest, textStatus,errorThrown)=>{
                // console.log("NO hay conexion: entra en error")
                // console.log("XMLHttpRequest: " +XMLHttpRequest)
                // console.log("textStatus: " +textStatus)
                // console.log("errorThrown: " +errorThrown)
                onError();
                setTimeout(()=>this.CheckNetworkConnection(onSuccess,onError),1000);
                // this.checkIfOnline();
                // setTimeout(()=>this.getLastMessages(),1000);
            }

        })
    }

    static ConnectUser(onSuccess,onError){
        $.ajax({
            url: 'http://localhost:8080/ping/connect',
            data:{
                'id':this.clientId
            },
            success: () => {
                if (connected===false){
                    connected=true;
                }
                this.UpdateConnection();
            }
        })
    }

    static UpdateConnection(onSuccess,onError){
        $.ajax({
            url: 'http://localhost:8080/ping/clientConnection',
            data:{
                'id':this.clientId
            },
            success:()=>{
                // if (connected===false) {
                //     this.ConnectUser()
                // }
                setTimeout(() => this.UpdateConnection(), 2000)
            },
            error:()=>{
                this.ConnectUser()
                // connected=false;
                setTimeout(()=>this.UpdateConnection(),2000)
            }
        })
    }
    
    static GetClientsCount(){
        $.ajax({
            url: 'http://localhost:8080/ping/clientsCount',
            success: (clientsCount)=> {
                // console.log("Clientes conectados: " + clientsCount);
                setTimeout(()=>this.GetClientsCount(),2000)
            },error:()=>{
                setTimeout(()=>this.GetClientsCount(),2000)
            }
        })
    }
}