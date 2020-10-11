import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
}

export const URL_EMPLOYEES = 'http://localhost:8080/api/v1/';

@Injectable({providedIn: 'root'})
export class RestfulService {

  constructor(private http: HttpClient) { }

  createNewEmployee(param: any): void {
    const url = URL_EMPLOYEES + 'employees';
    const body: Employee = {
      firstName: param.firstName,
      lastName: param.lastName,
      email: param.email
    };

    this.http.post(url, body).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

  }

  getAllEmployees(): void {
    const url = URL_EMPLOYEES + 'employees';
    const employeesList = [];
    this.http.get(url).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

/*  getOneEmployeeById(id: number) {

    return employee;
  }

  updateEmployee(id: number) {

    return employee;
  }

  deleteEmployee(id: number) {

  }*/

}
