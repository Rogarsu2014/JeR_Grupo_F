let connected=false;
let checkConnectionTimeOut;
let updateConnectionTimeOut;
let getClientsCountTimeOut;

let terminated=false;


export class ServerConnectionManager {
    static clientId= '_'+Math.random().toString(36).substr(2,9);
    static setClientId(id){
        this.clientId=id;
    }
    
    // static windowHref=window.location.href
    // static host=window.location.host
    
    //AWS
    // static windowHref="dualinterest.eu-west-3.elasticbeanstalk.com"
    // static host="dualinterest.eu-west-3.elasticbeanstalk.com"
    
    //Heroku
    static windowHref="https://dual-interest.herokuapp.com/"
    static host="dual-interest.herokuapp.com/"
    
    static CheckNetworkConnection(onSuccess,onError){
        $.ajax({
            url: this.windowHref+'/ping',
            timeout:3000,
            success: () => {
                if (terminated) return;
                // console.log("Hay conexion: entra en success")
                checkConnectionTimeOut=setTimeout(()=>this.CheckNetworkConnection(onSuccess,onError),1000);
                onSuccess();
            },
            error:  (XMLHttpRequest, textStatus,errorThrown)=>{
                
                console.log("Server not available")
                onError();
                checkConnectionTimeOut=setTimeout(()=>this.CheckNetworkConnection(onSuccess,onError),1000);

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
                if (terminated) return;
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
                if (terminated) return;
                // if (connected===false) {
                //     this.ConnectUser()
                // }
                updateConnectionTimeOut=setTimeout(() => this.UpdateConnection(), 2000)
            },
            error:()=>{
                this.ConnectUser()
                // connected=false;
                updateConnectionTimeOut=setTimeout(()=>this.UpdateConnection(),2000)
            }
        })
    }
    
    static GetClientsCount(onSuccess){
        $.ajax({
            url: this.windowHref+'/ping/clientsCount',
            success: (clientsCount)=> {
                if (terminated) return;
                onSuccess(clientsCount);
                // console.log("Clientes conectados: " + clientsCount);
                getClientsCountTimeOut=setTimeout(()=>this.GetClientsCount(onSuccess),2000)
            },error:()=>{
                getClientsCountTimeOut=setTimeout(()=>this.GetClientsCount(onSuccess),2000)
            }
        })
    }
    
    static stopAll(){
        terminated=true;
        clearTimeout(getClientsCountTimeOut)
        clearTimeout(updateConnectionTimeOut)
        clearTimeout(checkConnectionTimeOut)
    }

    static enableRequests(){
        terminated=false;
    }
}