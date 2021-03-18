import { ElementRef, Renderer2 } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
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
  @ViewChild('profilePic') profilePic: ElementRef;
  @ViewChild('newChat') newChat: ElementRef;
  @ViewChild('signOut') signOut: ElementRef;

  reciverMessage:any;
  friendList: any;
  isLoadedFrndList = true;
  isName = false;
  isPassword = false;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  currentUser;

  constructor(private renderer: Renderer2, private appService: AppService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.reciverMessage = [{"text": "This is text from anywhere"}, {"text": "This"},{"text": "This"},{"text": "This"},{"text": "This"}];
    // this.friendList = [{name: 'Any name'}, {name: 'Any name'},{name: 'Any name'}]
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

  populateFriendList(){
    this.appService.allUsers().subscribe(res => {
      this.friendList = res.users;
      this.isLoadedFrndList = false;
      console.log(res)
    })
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'End now', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onSignin(){
    this.appService.signIn(this.signInForm.value).subscribe(res => {
      if(res.success){
        this.currentUser = this.signInForm.value.email;
        console.log(this.currentUser)
        this.newChat.nativeElement.classList.remove('disabled');
        this.signOut.nativeElement.classList.remove('disabled');
        this.openSnackBar(res.message)
        this.profilePic.nativeElement.src = `../assets/${res.user.photoURL}`;
      }else{
        this.openSnackBar(res.message)
      }
    })
  }

  onSignUp(){
    let value = this.signUpForm.value;
    this.appService.signUp(value).subscribe(res => {
    })
    this.signUpForm.reset();
  }

  onSignOut(){
    this.profilePic.nativeElement.src = '../assets/pp.png';
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
