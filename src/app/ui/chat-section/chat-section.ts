import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ChatMessage } from './chat-message/chat-message';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [FontAwesomeModule, ChatMessage, FormsModule, NgFor],
  templateUrl: './chat-section.html',
  styleUrl: './chat-section.scss',
})
export class ChatSection {
  paperClipIcon = faPaperclip;

  newMessage: string = '';
  messages: { content: string; timeStamp: string; align: 'left' | 'right' }[] = [];

  @ViewChild('chatMessages') chatMessages!: ElementRef<HTMLDivElement>;

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.messages.push({
      content: this.newMessage,
      timeStamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      align: 'right',
    });

    this.newMessage = '';

    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }

  private scrollToBottom() {
    const element = this.chatMessages.nativeElement;
    element.scrollTo({
      top: element.scrollHeight,
    });
  }
}
