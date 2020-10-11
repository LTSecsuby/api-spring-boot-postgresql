import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-add-notes-bar',
  templateUrl: './add-notes-bar.component.html',
  styleUrls: ['./add-notes-bar.component.css']
})
export class AddNotesBarComponent implements OnInit {

  public title = 'Название заметки..';
  public content = 'Текст заметки..';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onChangeAddNewNote() {
    this.dataService.setCheckNewNote();
  }

  onCheckNewNote() {
    return this.dataService.getCheckNewNote();
  }

  addNewNote(): void {
    this.dataService.createNewNote(this.title, this.content);
    this.dataService.setCheckNewNote();
  }

}
