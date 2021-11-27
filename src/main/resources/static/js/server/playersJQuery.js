export class PlayersJQuery {
    signUp(username, password,confirmPassword, onSuccess){
        if (password==confirmPassword) {
            $.ajax({
                method: 'POST',
                dataType: 'json',
                url: 'http://localhost:8080/player',
                data: JSON.stringify({
                    "username": username,
                    "password": password,
                    "gameswon": 0
                }),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                },
                success: (user) => {
                        console.log("user registered: " + JSON.stringify(user))
                        
                    if (onSuccess!==undefined)
                        onSuccess(user)
                    
                },fail:()=>{console.log("Failed")},
                error:()=>{console.log("user with that username already registered")} // in case user is null, it launches

            })
        }
    }
    
    logIn(username, password,onSuccess){
        $.ajax({
            method: "GET",
            url:'http://localhost:8080/player/'+username+'/'+password,
            success:(user)=> {
                if (!user){
                 console.log("Null user -> an user with that id has already log in")   
                }else{
                    console.log("User connetced: " + JSON.stringify(user))
                    if (onSuccess !== undefined)
                        onSuccess(user)
                }
            },
            error:()=>{ console.log("User already logged in")}
        })
    }
}