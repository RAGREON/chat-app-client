import { Component } from '@angular/core';
import { Auth } from './auth/auth';
@Component({
  selector: 'app-root',
  imports: [Auth],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'default'
}