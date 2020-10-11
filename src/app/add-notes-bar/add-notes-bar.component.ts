import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {RestfulService} from '../shared/restful.service';

@Component({
  selector: 'app-add-notes-bar',
  templateUrl: './add-notes-bar.component.html',
  styleUrls: ['./add-notes-bar.component.css']
})
export class AddNotesBarComponent implements OnInit {

  public title = 'Название заметки..';
  public content = 'Текст заметки..';

  constructor(private dataService: DataService,
              private restfulService: RestfulService
  ) { }

  ngOnInit(): void {
  }

  onChangeAddNewNote(): any {
    this.dataService.setCheckNewNote();
  }

  onCheckNewNote(): any {
    return this.dataService.getCheckNewNote();
  }

  addNewNote(): void {
    this.dataService.createNewNote(this.title, this.content);
    this.dataService.setCheckNewNote();
  }

  create(): any {
    const param = {
      firstName: 'username',
      lastName: 'password',
      email: '3'
    };
    this.restfulService.createNewEmployee(param);
  }

/*  getOne(): any {
    this.restfulService.getOneEmployeeById();
  }*/

  getAll(): any {
    this.restfulService.getAllEmployees();
  }

/*  update(): any {
    this.restfulService.updateEmployee();
  }

  delete(): any {
    this.restfulService.deleteEmployee();
  }*/
}
