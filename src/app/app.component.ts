




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
  @ViewChild('scrollMe') scrollMe!: ElementRef;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  public socketId: string = '';
  scrollTop = 200;
  newMessage!: string;
  messageList: any[] = [];
  showDivChat = false
  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
    this.scrollToBottom();
    this.chatService.getNewMessage().subscribe((message: any) => {
      this.socketId = this.chatService.reciverID;
      if (message) {
        this.messageList.push({ message: message, senderId: this.socketId });
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
    } catch (err) { }
  }
}

