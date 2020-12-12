import {Component, OnInit} from '@angular/core';
import {Employee, Method, Model, NewObject, RestfulService} from '../shared/restful.service';
import {CurrentUserService} from '../shared/currentUser.service';
import {MatDialog} from '@angular/material/dialog';
import {ContentsDialogOpenComponent} from '../content-dialog-open/contents-dialog-open.component';

export interface FilterObject {
  name: string;
  model: Model;
  value: any[];
  selected: boolean;
}

export interface DialogData {
  value: any;
  res: any;
}

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {

  currentUser: Employee;
  isLogin: boolean;
  filterList: FilterObject[] = [];
  textFilter: string;

  constructor(
    private restfulService: RestfulService,
    private currentUserService: CurrentUserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUserService.currentUserSub.subscribe(user => {
      this.currentUser = user;
      this.isLogin = this.currentUser !== null;
      this.reloadContent();
    });
  }

  openDialog(item, model: Model): void {
    const dialogRef = this.dialog.open(ContentsDialogOpenComponent, {
      width: '450px',
      data: { value: this.getInputObject(item, model) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) { return; }
      result.elements.forEach(elem => {
        if (elem.data.restful) { return; }
        result.dataNewObject[elem.typeField] = elem.data.data;
      });
      this.updateElement(result);
    });
  }

  reloadContent(): void {
    this.filterList = this.createFilterList();
    this.textFilter = '*';
    this.getElements();
  }

  unselectElement(): void {
    this.filterList.forEach(item => {
      this.selectElement(item.model, false);
    });
  }

  selectElement(model: Model, select = true): void {
    this.filterList.forEach(item => {
      if (item.model === model) {
        if (select) {
          item.selected = true;
        }
      } else {
        item.selected = false;
      }
    });
  }

  getElements(): void {
    this.filterList.forEach(item => {
      if (item.selected) {
        if (!this.textFilter) {
          this.restfulService.call(Method.GetAllByFilter, item.model, {}, 0, '*').subscribe(res => {
            item.value = res;
          });
        } else {
          this.restfulService.call(Method.GetAllByFilter, item.model, {}, 0, this.textFilter.toLocaleLowerCase()).subscribe(res => {
            item.value = res;
          });
        }
      }
    });
  }

  createFilterList(): FilterObject[] {
    return [
      { name: 'Машины', model: Model.Car, value: null, selected: false },
      { name: 'Клиенты', model: Model.Client, value: null, selected: false },
      { name: 'Услуги', model: Model.Transaction, value: null, selected: false },
    ];
  }

  onClickDeleteItem(item, model: Model): any {
    this.restfulService.call(Method.DeleteById, model, {}, item.id).subscribe(res => {
      let currentArray = [];
      this.filterList.forEach(i => {
        if (i.selected) {
          currentArray = i.value;
        }
      });
      currentArray = currentArray.filter(f => f.id !== res.id);
      this.filterList.forEach(i => {
        if (i.selected) {
          i.value = currentArray;
        }
      });
    });
  }

  updateElement(currentObject: NewObject): any {
    this.restfulService.call(Method.Create, currentObject.model, currentObject.dataNewObject).subscribe(res => {
      let currentArray = [];
      this.filterList.forEach(i => {
        if (i.selected) {
          currentArray = i.value;
        }
      });
      currentArray = currentArray.filter(f => {
        if (f.id === res.id) {
          return res;
        }
        return f.id;
      });
      this.filterList.forEach(i => {
        if (i.selected) {
          i.value = currentArray;
        }
      });
    });
  }

  getInputObject(item, model: Model): NewObject {
    switch (model) {
      case Model.Car:
        return {
          title: 'Редактировать машину',
          elements: [
            {name: 'Название', data: { restful: false, model: null, data: item.name }, typeField: 'name', typeHtmlElement: 'input'},
            {name: 'Модель', data: { restful: false, model: null, data: item.model }, typeField: 'model', typeHtmlElement: 'input'},
            {name: 'Номер', data: { restful: false, model: null, data: item.number }, typeField: 'number', typeHtmlElement: 'input'},
            {name: 'Цвет', data: { restful: false, model: null, data: item.color }, typeField: 'color', typeHtmlElement: 'input'},
            {name: 'Выберите клиента', data: { restful: true, model: Model.Client, data: null }, typeField: 'ownerId', typeHtmlElement: 'select'},
            {name: 'Дата произвадства', data: { restful: false, model: null, data: item.productionDate }, typeField: 'productionDate', typeHtmlElement: 'date'},
            {name: 'Дата покупки', data: { restful: false, model: null, data: item.purchaseDate }, typeField: 'purchaseDate', typeHtmlElement: 'date'}
          ],
          model: Model.Car,
          dataNewObject: item
        };
    case Model.Client:
      return {
        title: 'Редактировать клиента',
        elements: [
          {name: 'Имя', data: { restful: false, model: null, data: item.firstName }, typeField: 'firstName', typeHtmlElement: 'input'},
          {name: 'Фамилия', data: { restful: false, model: null, data: item.lastName }, typeField: 'lastName', typeHtmlElement: 'input'},
          {name: 'Электронная почта', data: { restful: false, model: null, data: item.email }, typeField: 'email', typeHtmlElement: 'input'},
          {name: 'Телефон', data: { restful: false, model: null, data: item.phone }, typeField: 'phone', typeHtmlElement: 'input'},
          {name: 'Выберите машину', data: { restful: true, model: Model.Car, data: null }, typeField: 'carId', typeHtmlElement: 'select'},
          {name: 'Дата рождения', data: { restful: false, model: null, data: item.birthdayDate }, typeField: 'birthdayDate', typeHtmlElement: 'date'}
        ],
        model: Model.Client,
        dataNewObject: item
      };
    case Model.Transaction:
      return {
        title: 'Редактировать услугу',
        elements: [
          {name: 'Название', data: { restful: false, model: null, data: item.serviceName }, typeField: 'serviceName', typeHtmlElement: 'input'},
          {name: 'Описание', data: { restful: false, model: null, data: item.serviceDescription }, typeField: 'serviceDescription', typeHtmlElement: 'input'},
          {name: 'Сумма', data: { restful: false, model: null, data: item.transactionSum }, typeField: 'transactionSum', typeHtmlElement: 'input'},
          {name: 'Выберите клиента', data: { restful: true, model: Model.Client, data: null }, typeField: 'clientId', typeHtmlElement: 'select'},
          {name: 'Выберите сотрудника', data: { restful: true, model: Model.Employee, data: null }, typeField: 'employeeId', typeHtmlElement: 'select'},
          {name: 'Выберите машину', data: { restful: true, model: Model.Car, data: null }, typeField: 'carId', typeHtmlElement: 'select'}
        ],
        model: Model.Transaction,
        dataNewObject: item
      };
    }
  }

}
