import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Message } from '../interfaces/message.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  color: string = ''
  socket: any;
  constructor() {
    this.socket = io.connect();
    this.userColor$.subscribe(val=> {
      this.color = val
    });
   }

  private get userColor$(){
    return Observable.create((observer) => {
      this.socket.on('user-color', (message) => {
          observer.next(message);
      });
});
  }
public get chatMessage$(){
  return Observable.create((observer) => {
    this.socket.on('new-message', (message) => {
        observer.next(message);
    });
});
  }


   sendChat(msg: Message){
     this.socket.emit('new-message', msg);
   }
}
