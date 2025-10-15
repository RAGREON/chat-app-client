import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './message-card.html',
  styleUrls: ['./message-card.scss']
})
export class MessageCard {
  @Input() username: string = ''
  @Input() content: string = ''
  @Input() date: string = ''
  @Input() time: string = ''
}
