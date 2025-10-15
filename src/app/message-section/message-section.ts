import { Component } from '@angular/core';
import { MessageCard } from '../shared/message-card/message-card';

@Component({
  selector: 'app-message-section',
  imports: [MessageCard],
  templateUrl: './message-section.html',
  styleUrl: './message-section.scss'
})
export class MessageSection {

}
