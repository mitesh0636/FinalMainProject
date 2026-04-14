import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";
import { LoginData, resetPassword, UserData } from "../Modals/Register.modal";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root' 
})

export class AuthService {
    constructor(private http: HttpClient, private router : Router) {
        this.refresh();
    }

    private readonly API_URL = '/api/auth';

    currentUser = new BehaviorSubject<UserData | null>(null); 

    loggedIn$ = this.currentUser.asObservable();
   
    isAdminView = new BehaviorSubject<boolean>(localStorage.getItem('type') === 'admin');
    maiAdmin = new BehaviorSubject<string>('user');
    isAdmin$ = this.isAdminView.asObservable();


    otp = "";
    email = "";
    verifyresult = false;
    

    toggleAdminview(){
    this.isAdminView.next(!this.isAdminView.value);
    if(this.isAdminView.value === true){
        localStorage.setItem('type', 'admin');
        this.router.navigate(['/admin/createtype'])
    }
    if(this.isAdminView.value == false){
        localStorage.setItem('type', 'user');
        this.router.navigate(['/general']);     
    }
}


    refresh(){
    this.getUser().subscribe({
     next: (data) => {
       this.currentUser.next(data);
     },
     error: (err) => {
     this.currentUser.next(null)
     }
    })
    }


register(userData: UserData): Observable<any> {
    return this.http.post(`${this.API_URL}/Register`, userData);
}

login(credentials: LoginData): Observable<any> {
  return this.http.post(`${this.API_URL}/Login`, credentials).pipe(
    switchMap(() => this.getUser()), 
    tap((userData) => {
      this.currentUser.next(userData);
    })
  );
}

getprofile(): Observable<any>{
return this.http.get(`${this.API_URL}/getusercheck`);
}

isLoggedIn(){
return this.currentUser.value;
}


requestOTP(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/requestotp`, {email});
}

getUser(): Observable<any>{
    return this.http.get(`${this.API_URL}/getusercheck`)
}

verifyOTP(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.API_URL}/verifyotp`, {email, otp});
}

resetPassword(email: string, otp: string, newPassword: string, confirmPassword: string): Observable<any>{
    return this.http.post(`${this.API_URL}/resetPassword`, {email, otp, newPassword, confirmPassword});
};

isAdmin(){
    return this.currentUser.value?.role === 'admin';
}

getRole(){
    return this.currentUser.value?.role;
}


updateProfile(updateData: Partial<UserData>): Observable<any> {
    return this.http.post(`${this.API_URL}/update`, updateData);
}

getLiveSessions(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/viewsessions/${userId}`);
}

logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/Logout`, {})
};

logoutAll(): Observable<any> {
return this.http.post(`${this.API_URL}/LogoutAll`, {})
}

}



