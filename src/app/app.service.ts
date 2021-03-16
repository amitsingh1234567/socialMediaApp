
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AppService {


    constructor(private http: HttpClient, private router: Router) { }
    // BaseURL = 'http://localhost:3000/api/v1/user/login';
    signIn(value){
        return this.http.post<{ token: string,success: boolean, expiresIn: number, message: string }>('http://localhost:3000/api/v1/user/signIn', value )
    }

    signUp(value){
        return this.http.post<{success: boolean,  message: string }>('http://localhost:3000/api/v1/user/signup', value);
    }

}