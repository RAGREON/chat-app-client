import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './chat-message.html',
  styleUrls: ['./chat-message.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatMessage {
  @Input() messageContent: string = '';
  @Input() timeStamp: string = '';
  @Input() align: 'left' | 'right' = 'left';
}
