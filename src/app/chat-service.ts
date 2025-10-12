import { Injectable, ListenerOptions, makeStateKey } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

export interface ReceivedMessage {
  userId: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;

  private messageReceivedSubject = new Subject<ReceivedMessage>();
  public messageReceived$ = this.messageReceivedSubject.asObservable();

  private connectionReadySubject = new Subject<void>();
  public connectionReady$ = this.connectionReadySubject.asObservable();

  public startConnection(token: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5062/chathub', {
        accessTokenFactory: () => token,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('singlaR started');
        this.registerReceiveMessageListener();
        this.hubConnection.on('already-connected', () => {
          console.log('already connected');
        });

        this.connectionReadySubject.next();
      })
      .catch((err) => console.log('failed to start singlaR:', err));
  }

  private registerReceiveMessageListener() {
    this.hubConnection!.on('receive-message', (message) => {
      console.log(message);

      this.messageReceivedSubject.next({
        userId: message.userId,
        message: message.message
      });
    });
  }

  sendMessage(userId: string, message: string) {
    this.hubConnection
      .invoke('SendMessage', userId, message)
      .catch((err) => console.error('error sending message:', err));
  }

  getConnectedUsers(): Promise<string[]> {
    return this.hubConnection.invoke<string[]>('GetConnectedUsers');
  }
}
