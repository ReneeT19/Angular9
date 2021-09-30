import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; //make it optional as signup doens't yield it
}

@Injectable({providedIn: 'root'})
export class AuthService {

    // user = new Subject<User>();
    //below gives an immediate access
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    //implement signup function
    signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
            email:email,
            password: password,
            returnSecureToken: true
        }
        )
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication (
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                )
            })
        );
    }

    //implement login function
    login(email: string, password: string) {
        //check Firebase API request; use that url; use the same API key though
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
            email:email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication (
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                )
            })
        );
    }

    //implment the logout function
    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        // localStorage.clear(); // this is to clear all data, not recommended here
    }

    //implment the auto login function
    autoLogin() {
        //to retrieve data from the local storage
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        } 
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token) {
            //emit the loadeduser as currently active user
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() =>{
            this.logout();
        }, expirationDuration);
    }

    //implement the shared handleAuthentication function
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }


    //implement the shared handleError function
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is invalid!';
                break;
        }
        return throwError(errorMessage);
    }
}