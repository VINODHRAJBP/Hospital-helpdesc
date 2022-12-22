import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { ValidateService } from '../validate.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public valid: ValidateService) { }

  ngOnInit(): void {
  }


  show=true
}
