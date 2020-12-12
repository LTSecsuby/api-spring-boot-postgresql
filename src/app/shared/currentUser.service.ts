import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Employee} from './restful.service';

@Injectable({providedIn: 'root'})
export class CurrentUserService {

  currentUserSub = new Subject<Employee>();
  currentUser: Employee;

  constructor() {
    this.currentUser = null;
  }

  setCurrentUser(user: Employee): void {
    this.currentUser = user;
    this.currentUserSub.next(this.currentUser);
  }

  getCurrentUser(): Employee {
    return this.currentUser;
  }

}
