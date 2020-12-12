import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  employmentDate: Date;
  salary: number;
  password: string;
}

export interface Client {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  carId: number;
  birthdayDate: Date;
  createClientDate: Date;
}

export interface Car {
  ownerId: number;
  name: string;
  model: string;
  number: string;
  color: string;
  productionDate: Date;
  purchaseDate: Date;
}

export interface Transaction {
  employeeId: number;
  clientId: number;
  carId: number;
  serviceName: string;
  serviceDescription: string;
  transactionSum: number;
  transactionDate: Date;
}

export interface AuthorizationBody {
  firstName: string;
  lastName: string;
  password: string;
}

export enum Model {
  Car,
  Client,
  Employee,
  Transaction
}

export enum Method {
  GetById,
  GetAll,
  Create ,
  UpdateById,
  DeleteById,
  GetAllByFilter
}

export interface ObjectElements {
  name: string;
  data: {
    restful: boolean;
    model: Model;
    data: any;
  };
  typeField: string;
  typeHtmlElement: string;
}

export interface NewObject {
  title: string;
  elements: ObjectElements[];
  model: Model;
  dataNewObject: Employee | Car | Client | Transaction;
}



export const URL_EMPLOYEES = 'http://localhost:8080/api/v1/employees';
export const URL_CLIENTS = 'http://localhost:8080/api/v1/clients';
export const URL_CARS = 'http://localhost:8080/api/v1/cars';
export const URL_TRANSACTION = 'http://localhost:8080/api/v1/transactions';

@Injectable({providedIn: 'root'})
export class RestfulService {

  constructor(private http: HttpClient) { }

  call(method: Method, model: Model, body = {}, id = 0, key = ''): Observable<any> {

    let url: string;
    switch (model) {
      case Model.Car:
        url = URL_CARS;
        break;
      case Model.Client:
        url = URL_CLIENTS;
        break;
      case Model.Employee:
        url = URL_EMPLOYEES;
        break;
      case Model.Transaction:
        url = URL_TRANSACTION;
        break;
    }

    switch (method) {
      case Method.GetById:
        return this.http.get(url + `/${id}`).pipe(
          map(res => {
            return res;
          })
        );
      case Method.GetAll:
        return this.http.get(url).pipe(
          map(res => {
            return res;
          })
        );
      case Method.GetAllByFilter:
        return this.http.get(url + `/filter/${key}`).pipe(
          map(res => {
            return res;
          })
        );
      case Method.Create:
        return this.http.post(url, body).pipe(
          map(res => {
            return res;
          })
        );
      case Method.UpdateById:
        return this.http.put(url + `/${id}`, body).pipe(
          map(res => {
            return res;
          })
        );
      case Method.DeleteById:
        return this.http.delete(url + `/${id}`).pipe(
          map(res => {
            return res;
          })
        );
    }
  }

  authorizationEmployee(body): Observable<any> {
    return this.http.post(URL_EMPLOYEES + '/login', body).pipe(
      map(res => {
        return res;
      })
    );
  }

}
