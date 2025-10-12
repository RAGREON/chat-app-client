import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgIf],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class Message {
  @Input() username: string = '';
  @Input() content: string = '';
  @Input() timestamp: string = '';
}
