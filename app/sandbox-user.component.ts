import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs/Rx';
import { SandboxUser } from './sandbox-user';

@Component({
  selector: 'sandbox-user-comp',
  templateUrl: 'app/sandbox-user.component.html',
  providers: [AppService, SandboxUser]
})
export class SandboxUserComponent{
    
    private response: Observable<SandboxUser[]>;
    public sandboxUsers: SandboxUser[];
    
    constructor(private appService: AppService, private sandboxUser: SandboxUser){
        this.refreshSandboxUsers();
    }
    
    clicked(usernameInput: HTMLInputElement){
        this.sandboxUser.username = usernameInput.value;
        this.response = this.appService.insertSandboxUser(this.sandboxUser);
        this.response.subscribe(
            body => {this.sandboxUser.userId = body[0].userId; 
                     this.refreshSandboxUsers();
                     usernameInput.value = '';}
        );
    }
    
    deleteUser(sandboxUser: SandboxUser){
        console.log("Deleting " + sandboxUser.username);
        this.response = this.appService.deleteSandboxUser(sandboxUser.userId);
        this.response.subscribe(
            res => this.refreshSandboxUsers()
        );        
    }
    
    private refreshSandboxUsers(){
        this.response = this.appService.getSandboxUsers();
        this.response.subscribe(
            body => this.sandboxUsers = body
        ); 
    }
}


