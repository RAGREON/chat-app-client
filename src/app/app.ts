import { Component, OnInit } from '@angular/core';
import { Login } from './login/login';
import { Register } from './register/register';
import { MessageCard } from './shared/message-card/message-card';
import { MessageData, MessageService } from './services/message';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ReceivedMessage } from './chat-service';

@Component({
  selector: 'app-root',
  imports: [Login, Register, MessageCard, NgFor, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  title = 'default';

  messages: MessageData[] = [];

  userId: string = '';
  message: string = '';

  draftMessages: { [userId: string]: string } = {};
  receivedMessages: ReceivedMessage[] = [];

  constructor(private messageService: MessageService, private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.connectionReady$.subscribe(() => {
      console.log('connection ready: chat service online');

      this.chatService.messageReceived$.subscribe((message: ReceivedMessage) => {
        this.receivedMessages.push(message);
      });
    });
  }

  loadMessages() {
    this.messageService.getMessageAll().subscribe({
      next: (data) => {
        console.log(data);
        this.messages = data;
      },
      error: (err) => {
        console.log('error loading messages:', err);
      },
    });
  }

  connectedUsers: string[] = [];

  getConnectedUsers() {
    this.messageService
      .getConnectedUsers()
      .then((users) => (this.connectedUsers = users))
      .catch((err) => console.error('error:', err));
  }

  sendMessage(userId: string) {
    this.messageService.sendMessageHub(userId, this.draftMessages[userId]);
  }
}
