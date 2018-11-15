import { User } from "../models/user.model";

export class UserService{

    currentUserName: String='Max';

    userList: User[];

    getUsers(){
        //http
    }

    getCurrentUser(){
        this.getUsers();
        let ret = null;
        for( let usr  of this.userList){
            if(usr && usr.name === this.currentUserName){
                ret = usr;
            }
        }
        return ret;
    }

}