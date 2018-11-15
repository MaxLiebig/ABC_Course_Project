import { User } from "../models/user.model";

export class UserService{

    currentUserName: string='Max';

    userList: User[] = [];

    getUsers(){
        //http
    }

    getCurrentUser(){
        this.getUsers();
        debugger;
        let ret = new User(this.currentUserName);
        for( let usr  of this.userList){
            if(usr && usr.name === this.currentUserName){
                ret = usr;
            }
        }
        return ret;
    }

}