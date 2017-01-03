import { Injectable }     from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SandboxUser } from './sandbox-user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService{
   private appUrl = 'http://localhost:8084/MvnSpringHibernateSB/result/';   
    
    constructor(private http: Http){}
    
    getSandboxUsers(): Observable<SandboxUser[]>{
        let headers = new Headers({"Content-Type": "application/json", "Accept": "application/json"}); 
        let reqOp = new RequestOptions({
            headers: headers           
        });
        return this.http.get(this.appUrl, reqOp)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    insertSandboxUser(sandboxUser: SandboxUser): Observable<SandboxUser[]>{ 
        let headers = new Headers({"Content-Type": "application/json", "Accept": "application/json"});    
        let reqOp = new RequestOptions({
            headers: headers           
        });
        return this.http.post(this.appUrl, sandboxUser.username, reqOp)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }  
    
    deleteSandboxUser(id: string): Observable<SandboxUser[]>{   
        // http delete does not send body, so must send id in uri
        let uri = this.appUrl + id;
        return this.http.delete(uri)
                   .map((res:Response) => res.json())
                   .catch((error:any) => Observable.throw(error.json().error || alert("Sorry, Sandbox User with Id: " + id + " was not found.")));
    }
}