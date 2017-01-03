import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  template: '<h1>My {{name}}</h1><sandbox-user-comp></sandbox-user-comp>',
  providers: [AppService]
})
export class AppComponent  { 
    name = 'Sandbox';
    buttonName = 'Submit';
}
