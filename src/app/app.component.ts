import { ElementRef, Renderer2 } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppService } from './app.service';


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
  @ViewChild('dismisModal') dismisModal: ElementRef;

  reciverMessage:any;
  isName = false;
  isPassword = false;
  dismis
  signUpForm: FormGroup;
  signInForm: FormGroup;


  constructor(private renderer: Renderer2, private appService: AppService) {

  }

  ngOnInit() {
    this.reciverMessage = [{"text": "This is text from anywhere"}, {"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"}, {"text": "This"},{"text": "This"}, {"text": "This"}, {"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"}];
    this.signInForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, Validators.required)
    })

    this.signUpForm = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, Validators.required)
    })
  }

  onSignin(){
    console.log('Sign In1')
    // console.log(this.signInForm)
    this.appService.signIn(this.signInForm.value).subscribe(res => {
      console.log(res.success)
      console.log(res.message)

    })
  }

  onSignUp(){
    let value = this.signUpForm.value;
    // let name = this.signUpForm.value.name;
    this.appService.signUp(value).subscribe(res => {
      console.log(res.success)
      console.log(res.message)

    })
      // let email = this.signUpForm.value.email;
      // let password = this.signUpForm.value.password;
      // this.appService.signUp(name, email, password)
      // console.log(name)
      // console.log(email)
      // console.log(password)
      this.signUpForm.reset();
      // this.dismisModal.nativeElement.removeAttribute('data-dismiss');
    
    // console.log(this.signUpForm)
    // if(this.signUpForm.value.name || this.signUpForm.value.name == ""){
    //   this.isName = true
    // }
    // if(this.signUpForm.value.password || this.signUpForm.value.password == ""){
    //   this.isPassword = true
    // }
    // console.log(this.signUpForm.value.email)
    
    // this.signUpForm.value.name = null;
    // this.signUpForm.value.email = null;
    // this.signUpForm.value.password = null;

  }



  signIn(){
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
