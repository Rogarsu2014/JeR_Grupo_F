import {PlayersJQuery} from "../server/playersJQuery.js";

export class UserRegistration {


    constructor() {
        this.playersJquery = new PlayersJQuery();
    }

    trySignUp(username,password,confirmPassword,onSuccess){
       return this.playersJquery.signUp(username,password,confirmPassword,(user)=>onSuccess(user));
    }
    logIn(username,password,onSuccess){
        this.playersJquery.logIn(username,password,(user)=>onSuccess(user));
    }
    
    
}