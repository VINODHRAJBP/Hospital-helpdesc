import { Injectable } from '@angular/core';
import { ValidateService } from './validate.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  messages: string[] = [];
  msg: string[] = []

  add(messages: string) {
    this.messages.unshift(messages)
  }

  Showlog() {
    // this.messages=[]
    for (let index = 0; index < 5; index++) {
      this.msg[index] = this.messages[index];

    }
  }

  clearLog() {
    this.msg = []
  }
}
