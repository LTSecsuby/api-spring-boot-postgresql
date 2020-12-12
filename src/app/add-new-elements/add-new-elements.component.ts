import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Car, Client, Employee, Method, Model, RestfulService, NewObject} from '../shared/restful.service';
import {CurrentUserService} from '../shared/currentUser.service';

@Component({
  selector: 'app-add-new-elements',
  templateUrl: './add-new-elements.component.html',
  styleUrls: ['./add-new-elements.component.css']
})
export class AddNewElementsComponent implements OnInit, OnChanges {

  currentUser: Employee;
  isLogin: boolean;

  isChangeAddMenu = false;
  @Input() currentObject: NewObject;

  constructor(
    private restfulService: RestfulService,
    private currentUserService: CurrentUserService
  ) { }

  ngOnInit(): void {
    this.reloadAddBar();
  }

  ngOnChanges(): void { }

  reloadAddBar(): void {
    this.currentUserService.currentUserSub.subscribe(user => {
      this.currentUser = user;
      this.isLogin = this.currentUser !== null;
      this.setElement(this.currentObject);
    });
  }

  createElement(currentObject: NewObject): any {
    this.currentObject.elements.forEach(elem => {
      if (elem.data.restful) { return; }
      currentObject.dataNewObject[elem.typeField] = elem.data.data;
    });
    this.restfulService.call(Method.Create, currentObject.model, currentObject.dataNewObject).subscribe(res => {
      console.log('res', res);
      this.reloadAddBar();
      this.onChangeAddMenu();
    });
  }

  private setElement(currentObject: NewObject): void {
    currentObject.elements.forEach(elem => {
      if (elem.data.restful) {
        this.restfulService.call(Method.GetAll, elem.data.model).subscribe(res => {
          elem.data.data = res;
        });
      }
    });
  }

  onChangeAddMenu(): void {
    this.isChangeAddMenu = !this.isChangeAddMenu;
    if (this.isChangeAddMenu) {
      this.setElement(this.currentObject);
    }
  }

  selectValue(id, field): void {
    this.currentObject.dataNewObject[field] = id;
  }

}
