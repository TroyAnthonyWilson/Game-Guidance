import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private username$ = new BehaviorSubject<string>('');

  constructor() { }

  public getUserName() {
    return this.username$.asObservable();
  }

  public setUserName(username: string) {
    this.username$.next(username);
  }
}
