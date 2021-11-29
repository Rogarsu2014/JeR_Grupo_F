export class PlayersDataManager {
    signUp(username, password,confirmPassword, onSuccess,onError){
        if (password==confirmPassword) {
            $.ajax({
                method: 'POST',
                dataType: 'json',
                url: 'http://localhost:8080/player',
                data: JSON.stringify({
                    "username": username,
                    "password": password,
                    "gameswon": 0,
                    "iconIndex":0
                }),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                },
                success: (user) => {
                        // console.log("user registered: " + JSON.stringify(user))
                        
                    if (onSuccess!==undefined)
                        onSuccess(user)
                    
                },fail:()=>{console.log("Failed")},
                error:()=>{console.log("user with that username already registered")
                    if (onError!==null) {
                        onError()
                    }
                } // in case user is null, it launches

            })
        }
    }
    
    logIn(username, password,onSuccess,onMisMatch,onAlreadyLogIn){
        $.ajax({
            method: "GET",
            url:'http://localhost:8080/player/'+username+'/'+password,
            success:(user)=> {
                if (!user){
                    if (onAlreadyLogIn!==null){
                        onAlreadyLogIn();
                    }
                 // console.log("Null user -> an user with that id has already log in")   
                }else{
                    // console.log("User connetced: " + JSON.stringify(user))
                    if (onSuccess !== undefined)
                        onSuccess(user)
                }
            },
            error:(xhr,status,error)=>{
                var err = xhr.responseText.toString();
                // console.log("Error: "+err)
                if (onMisMatch!==null) {
                    onMisMatch()
                }
            }
        })
    }
    
    updatePlayerIcon(username,iconIndex,onSuccess){
        $.ajax({
            method: 'POST',
            url:'http://localhost:8080/player/'+username+'/'+iconIndex,
            success:(user)=> {
                if (onSuccess!==null){
                    onSuccess();
                }
            },
            error:(xhr,status,error)=>{
                var err = xhr.responseText.toString();
                // console.log("Error: "+err)
            }
        })
    }
}