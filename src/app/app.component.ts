import { ElementRef, Renderer2 } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('chatPanel') chatPanel: ElementRef;
  @ViewChild('divStart') divStart: ElementRef;
  @ViewChild('side1') side1: ElementRef;
  @ViewChild('side2') side2: ElementRef;
  @ViewChild('inputField') inputField: ElementRef;
  @ViewChild('scrollMe') scrollDown: ElementRef;

  reciverMessage:any;

  constructor(private renderer: Renderer2) {

  }

  ngOnInit() {
    this.reciverMessage = [{"text": "This is text from anywhere"}, {"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"}, {"text": "This"},{"text": "This"}, {"text": "This"}, {"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"}];
    // console.log(this.messages)
  }

  starCthat() {
    this.chatPanel.nativeElement.removeAttribute('style')
    this.divStart.nativeElement.setAttribute('style', 'display:none');
    this.hideChatList();
  }

  showChatList() {
    this.side1.nativeElement.classList.remove('d-none', 'd-md-block');
    this.side2.nativeElement.classList.add('d-none');
  }

  hideChatList() {
    this.side1.nativeElement.classList.add('d-none', 'd-md-block');
    this.side2.nativeElement.classList.remove('d-none');
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.sendMessage(event.target.value);
    }
  }

  sendMessage(value) {
   this.reciverMessage.push({text: value});
   this.inputField.nativeElement.value = '';
   this.inputField.nativeElement.focus();
  }
}
