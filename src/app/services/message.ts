import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService, ReceivedMessage } from '../chat-service';

export interface MessageData {
  id: number;
  senderId: number;
  receieverId: number;
  messageContent: string;
}

export interface SendMessageRequest {
  senderId: number;
  receiverId: number;
  messageContent: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = 'http://localhost:5062/api/message';

  constructor(private http: HttpClient, private chatService: ChatService) {}


  sendMessage(request: SendMessageRequest): Observable<MessageData> {
    return this.http.post<MessageData>(`${this.baseUrl}/send`, {
      request,
    });
  }

  getMessageAll(): Observable<MessageData[]> {
    return this.http.get<MessageData[]>(`${this.baseUrl}/all`, {});
  }

  sendMessageHub(userId: string, message: string) {
    this.chatService.sendMessage(userId, message);
  }

  getConnectedUsers(): Promise<string[]> {
    return this.chatService.getConnectedUsers();
  }
}
