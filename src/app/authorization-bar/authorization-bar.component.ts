import {Component, OnInit} from '@angular/core';
import {AuthorizationBody, Employee, Method, Model, RestfulService} from '../shared/restful.service';
import {CurrentUserService} from '../shared/currentUser.service';

@Component({
  selector: 'app-authorization-bar',
  templateUrl: './authorization-bar.component.html',
  styleUrls: ['./authorization-bar.component.css']
})
export class AuthorizationBarComponent implements OnInit {

  employee: Employee;
  authorizationBody: AuthorizationBody;
  currentUser: Employee;
  isLogin: boolean;

  constructor(
    private restfulService: RestfulService,
    private currentUserService: CurrentUserService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.currentUserService.getCurrentUser();
    this.reloadAuthorizationBar();
    this.currentUserService.currentUserSub.subscribe(user => {
      this.currentUser = user;
      this.isLogin = this.currentUser !== null;
    });
  }

  reloadAuthorizationBar(): void {
    this.employee = this.setEmptyEmployee();
    this.authorizationBody = {
      firstName: '',
      lastName: '',
      password: ''
    };
  }

  private setEmptyEmployee(): Employee {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      employmentDate: new Date(),
      salary: 0,
      password: ''
    };
  }

  createEmployee(): any {
    this.restfulService.call(Method.Create, Model.Employee, this.employee).subscribe(res => {
      console.log('res', res);
      this.reloadAuthorizationBar();
    });
  }

  getAuthorizationEmployee(): any {
    this.restfulService.authorizationEmployee(this.authorizationBody).subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.currentUserService.setCurrentUser(res);
      }
    });
  }

}
