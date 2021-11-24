export class PlayersJQuery {
    signUp(username, password,confirmPassword){
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
                    
                    if (!user) {
                        console.log("user with that username already registered")
                    } else {
                        console.log("user registered: " + JSON.stringify(user))
                    }
                },fail:()=>{console.log("Failed")},
                error:()=>{console.log("user with that username already registered")} // in case user is null, it launches

            })
        }
    }
    
    logIn(username, password){
        $.ajax({
            method: "GET",
            url:'http://localhost:8080/player/'+username+'/'+password,
            success:(user)=>console.log("User connetced: "+ JSON.stringify(user))
        })
    }
}