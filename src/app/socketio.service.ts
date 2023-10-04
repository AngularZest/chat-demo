import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io/dist/typed-events';


@Injectable({
  providedIn: 'root',
})

export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  public socketID: string = ''
  senderID: any
  reciverID:any

  constructor() {

    this.socket = io('http://localhost:3000');
    this.socket.on('myId', (id) => {
      this.socketID = id;
    });

  }

  public sendMessage(message: any) {
    this.senderID = this.socket.id;
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
      this.reciverID = this.socket.id
     
    });
    return this.message$.asObservable();
  };
}