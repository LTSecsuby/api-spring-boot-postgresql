import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-notes-bar',
  templateUrl: './notes-bar.component.html',
  styleUrls: ['./notes-bar.component.css']
})
export class NotesBarComponent implements OnInit {

  array = [];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  getNotes() {
    this.array = this.dataService.getAllNote();
    return this.array;
  }

  onCheckedActiveNote(id: number) {
    this.dataService.setCheckedNote(id);
  }

}
