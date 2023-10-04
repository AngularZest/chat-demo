




import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from './socketio.service';


export interface MessageModel {
  message?: string;
  senderId?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild('scrollMe')
  scrollMe!: ElementRef;
  scrollTop = 200;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  public socketId: string = '';
  newMessage!: string;
  messageList: any[] = [];
  showDivChat = false
  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
    this.scrollToBottom();

    // this.socketId = this.chatService.senderID;



    this.chatService.getNewMessage().subscribe((message: any) => {

      this.socketId = this.chatService.reciverID;
      console.log(this.socketId, 'this.socketIdthis.socketIdthis.socketId')
      if (message) {
        this.messageList.push({ message: message, senderId: this.socketId });
        console.log(this.messageList, 'this.messageListthis.messageList')
      }
    })
  }

  sendMessage() {


   
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
   
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
}

