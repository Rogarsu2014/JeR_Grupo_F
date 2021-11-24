import {PlayersJQuery} from "../server/playersJQuery.js";

export class UserRegistration {


    constructor() {
        this.playersJquery = new PlayersJQuery();
    }

    trySignUp(username,password,confirmPassword){
        this.playersJquery.signUp(username,password,confirmPassword);
    }
    logIn(username,password){
        this.playersJquery.logIn(username,password);
    }
    
    
}