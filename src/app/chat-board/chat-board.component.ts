import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../interfaces/message.interface';
import { ChatService } from '../services/chat.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.scss']
})
export class ChatBoardComponent implements OnInit {
  @ViewChild('output') private chatOutput: ElementRef;
  messages: Array<Message> = [];
  messageText: string = ''
  displayName: string = ''
  censorProfanity: boolean = true;
  constructor(private chatService: ChatService, private auth: AngularFireAuth) { }

  sendMessage(){
    if(this.messageText.length > 0 && this.messageText.length <= 280){
      let msg: Message = {
        username: this.displayName,
        body: this.messageText,
        userColor: this.chatService.color
      }
      this.chatService.sendChat(msg);
      this.messageText = '';
    }
  }

  chatScroll(): void {
    try {
        this.chatOutput.nativeElement.scrollTo(0, this.messages.length * 20);
    } catch(err) { }                 
}

  ngOnInit(): void {
    this.auth.user.subscribe(user => this.displayName = user ? user.displayName : '');
    this.chatService.chatMessage$.subscribe(msg => {
      this.messages.push(msg)
      setTimeout(this.chatScroll.bind(this), 50)
    });
  }

}
