import {PlayersDataManager} from "../server/PlayersDataManager.js";

export class UserRegistration {


    constructor() {
        this.playersJquery = new PlayersDataManager();
    }

    trySignUp(username,password,confirmPassword,onSuccess,onError){
       return this.playersJquery.signUp(username,password,confirmPassword,(user)=>onSuccess(user),onError);
    }
    logIn(username,password,onSuccess,onMisMatch,onAlreadyLogIn){
        this.playersJquery.logIn(username,password,(user)=>onSuccess(user),onMisMatch,onAlreadyLogIn);
    }
    updatePlayerIcon(username,iconIndex,onSuccess){
        this.playersJquery.updatePlayerIcon(username,iconIndex,onSuccess);
    }
    
}