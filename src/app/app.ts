import { Component, OnInit } from '@angular/core';
import { MessageData, MessageService } from './services/message';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ReceivedMessage } from './chat-service';
import { Navbar } from './ui/navbar/navbar';
import { MessageSection } from './message-section/message-section';
import { ChatSection } from "./ui/chat-section/chat-section";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, Navbar, MessageSection, ChatSection],
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
