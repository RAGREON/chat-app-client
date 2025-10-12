import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-message-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './message-card.html',
  styleUrl: './message-card.scss'
})
export class MessageCard {
  @Input() username: string = ''
  @Input() content: string = ''
  @Input() date: string = ''
  @Input() time: string = ''
}
