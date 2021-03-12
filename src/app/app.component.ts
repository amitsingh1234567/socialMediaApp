import { ElementRef } from '@angular/core';
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
  @ViewChild('messages') messages: ElementRef;



  // msg;
  constructor() {

  }

  ngOnInit() {

  }

  starCthat() {
    this.chatPanel.nativeElement.removeAttribute('style')
    this.divStart.nativeElement.setAttribute('style', 'display:none');
    this.hideChatList();
  }

  showChatList() {
    this.side1.nativeElement.classList.remove('d-none', 'd-md-block')
    this.side2.nativeElement.classList.add('d-none');
  }

  hideChatList() {
    this.side1.nativeElement.classList.add('d-none', 'd-md-block')
    this.side2.nativeElement.classList.remove('d-none');
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      // console.log(event.target.value);
      this.sendMessage(event.target.value);
    }
  }

  sendMessage(value) {
    // this.messages = message;
    console.log(value)
    let msg = `
            <div class="row justify-content-end">
            <div class="col-6 col-sm-7 col-md-7">
              <p class="sent float-right">
                This is text from anywhere
              <span class="time float-right">1:28 PM</span>
              </p>
            </div>
            <div class="col-2 col-sm-1 col-md-1">
              <img src="../assets/pp.png" class="chat-pic" alt="..">
            </div>
          </div>
    `

    // this.messages.nativeElement.innerHTML = message
    document.getElementById('messages').innerHTML += msg

  }

  // onKeyDowns(){
  //   document.addEventListener('keydown', key => {
  //     if(key.which === 13){

  //     }
  //   }) 
  // }
}
