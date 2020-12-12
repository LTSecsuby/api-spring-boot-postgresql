import { Component, OnInit } from '@angular/core';
import {Car, Client, Employee, Model, NewObject, Transaction} from '../shared/restful.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  clientObject: NewObject;
  carObject: NewObject;
  transactionObject: NewObject;

  constructor() { }

  ngOnInit(): void {
    this.clientObject = {
      title: 'Создать нового клиента',
      elements: [
        {name: 'Имя', data: { restful: false, model: null, data: '' }, typeField: 'firstName', typeHtmlElement: 'input'},
        {name: 'Фамилия', data: { restful: false, model: null, data: '' }, typeField: 'lastName', typeHtmlElement: 'input'},
        {name: 'Электронная почта', data: { restful: false, model: null, data: '' }, typeField: 'email', typeHtmlElement: 'input'},
        {name: 'Телефон', data: { restful: false, model: null, data: '' }, typeField: 'phone', typeHtmlElement: 'input'},
        {name: 'Выберите машину', data: { restful: true, model: Model.Car, data: null }, typeField: 'carId', typeHtmlElement: 'select'},
        {name: 'Дата рождения', data: { restful: false, model: null, data: new Date() }, typeField: 'birthdayDate', typeHtmlElement: 'date'}
      ],
      model: Model.Client,
      dataNewObject: this.setEmptyClient()
    };
    this.carObject = {
      title: 'Добавить новую машину',
      elements: [
        {name: 'Название', data: { restful: false, model: null, data: '' }, typeField: 'name', typeHtmlElement: 'input'},
        {name: 'Модель', data: { restful: false, model: null, data: '' }, typeField: 'model', typeHtmlElement: 'input'},
        {name: 'Номер', data: { restful: false, model: null, data: '' }, typeField: 'number', typeHtmlElement: 'input'},
        {name: 'Цвет', data: { restful: false, model: null, data: '' }, typeField: 'color', typeHtmlElement: 'input'},
        {name: 'Выберите клиента', data: { restful: true, model: Model.Client, data: null }, typeField: 'ownerId', typeHtmlElement: 'select'},
        {name: 'Дата произвадства', data: { restful: false, model: null, data: new Date() }, typeField: 'productionDate', typeHtmlElement: 'date'},
        {name: 'Дата покупки', data: { restful: false, model: null, data: new Date() }, typeField: 'purchaseDate', typeHtmlElement: 'date'}
      ],
      model: Model.Car,
      dataNewObject: this.setEmptyCar()
    };
    this.transactionObject = {
      title: 'Добавить новую услугу',
      elements: [
        {name: 'Название', data: { restful: false, model: null, data: '' }, typeField: 'serviceName', typeHtmlElement: 'input'},
        {name: 'Описание', data: { restful: false, model: null, data: '' }, typeField: 'serviceDescription', typeHtmlElement: 'input'},
        {name: 'Сумма', data: { restful: false, model: null, data: 0 }, typeField: 'transactionSum', typeHtmlElement: 'input'},
        {name: 'Выберите клиента', data: { restful: true, model: Model.Client, data: null }, typeField: 'clientId', typeHtmlElement: 'select'},
        {name: 'Выберите сотрудника', data: { restful: true, model: Model.Employee, data: null }, typeField: 'employeeId', typeHtmlElement: 'select'},
        {name: 'Выберите машину', data: { restful: true, model: Model.Car, data: null }, typeField: 'carId', typeHtmlElement: 'select'}
      ],
      model: Model.Transaction,
      dataNewObject: this.setEmptyTransaction()
    };
  }

  private setEmptyClient(): Client {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      carId: null,
      birthdayDate: new Date(),
      createClientDate: new Date()
    };
  }

  private setEmptyTransaction(): Transaction {
    return {
      employeeId: null,
      clientId: null,
      carId: null,
      serviceName: '',
      serviceDescription: '',
      transactionSum: 0,
      transactionDate: new Date()
    };
  }

  private setEmptyCar(): Car {
    return {
      ownerId: null,
      name: '',
      model: '',
      number: '',
      color: '',
      productionDate: new Date(),
      purchaseDate: new Date()
    };
  }

}
