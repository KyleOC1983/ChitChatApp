import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ready: boolean = false;
  user: Object
  constructor(private auth: AngularFireAuth, private userService: UserService){
    this.auth.user.subscribe(val =>{
        this.user = val;
        this.ready = true;
    });
  }

  logout(){
    this.userService.logout();
  }
}
