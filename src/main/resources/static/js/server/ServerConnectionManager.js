let connected=false;
export class ServerConnectionManager {
    static clientId= '_'+Math.random().toString(36).substr(2,9);
    static setClientId(id){
        this.clientId=id;
    }
    static windowHref=window.location.href
    static host=window.location.host
    static CheckNetworkConnection(onSuccess,onError){
        $.ajax({
            url: this.windowHref+'/ping',
            timeout:3000,
            success: () => {
                // console.log("Hay conexion: entra en success")
                setTimeout(()=>this.CheckNetworkConnection(onSuccess,onError),1000);
                onSuccess();
            },
            error:  (XMLHttpRequest, textStatus,errorThrown)=>{

                console.log("Server not available")
                onError();
                setTimeout(()=>this.CheckNetworkConnection(onSuccess,onError),1000);

            }

        })
    }

    static ConnectUser(onSuccess,onError){
        $.ajax({
            url: this.windowHref+'/ping/connect',
            data:{
                'id':this.clientId
            },
            success: () => {
                console.log("User connected to server")
                if (connected===false){
                    connected=true;
                }
                this.UpdateConnection();
            }
        })
    }

    static UpdateConnection(onSuccess,onError){
        $.ajax({
            url: this.windowHref+'/ping/clientConnection',
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
    
    static GetClientsCount(onSuccess){
        $.ajax({
            url: this.windowHref+'/ping/clientsCount',
            success: (clientsCount)=> {
                onSuccess(clientsCount);
                // console.log("Clientes conectados: " + clientsCount);
                setTimeout(()=>this.GetClientsCount(onSuccess),2000)
            },error:()=>{
                setTimeout(()=>this.GetClientsCount(onSuccess),2000)
            }
        })
    }
}